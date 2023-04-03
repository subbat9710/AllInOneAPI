using NasaSpaceInfo.Model;
using System.Data.SqlClient;
using System;

namespace NasaSpaceInfo.DAO
{
    public class SubscribeSqlDao : ISubscribe
    {
        private readonly string connectString;

        public SubscribeSqlDao(string dbconnectString) 
        {
            connectString = dbconnectString;
        }

        public Subscribe Subscribed(Subscribe subs)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectString))
                {
                    connection.Open();

                    SqlCommand cmd = new SqlCommand();
                    string sql = "SELECT COUNT(*) FROM subscribe WHERE email = @email;";
                    cmd.CommandText = sql;
                    cmd.Parameters.AddWithValue("@email", subs.Email);
                    cmd.Connection = connection;

                    int count = 0;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            count = reader.GetInt32(0);
                        }
                    }

                    if (count > 0)
                    {
                        Console.WriteLine($"Email: '{subs.Email} already exist!");
                        return null;
                    }

                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = "INSERT INTO subscribe (name, email) VALUES (@name, @email)";
                    command.Parameters.AddWithValue("@name", subs.Name);
                    command.Parameters.AddWithValue("@email", subs.Email);

                    command.Connection = connection;

                    command.ExecuteNonQuery();
                    command = new SqlCommand("SELECT @@IDENTITY", connection);
                    int newId = Convert.ToInt32(cmd.ExecuteScalar());

                    subs.Id = newId;
                    return subs;

                }
            }
            catch (SqlException)
            {
                throw;
            }
        }
    }
}
