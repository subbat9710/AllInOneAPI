using Microsoft.AspNetCore.Identity;
using System.Data.SqlClient;
using System;
using Microsoft.AspNet.Identity;

namespace NasaSpaceInfo.DAO
{
    public class UserSqlDao
    {
        private readonly string _connectionString;
        private readonly IPasswordHasher _passwordHasher;

        public UserSqlDao()
        {
        }

        public UserSqlDao(string connectionString, IPasswordHasher passwordHasher)
        {
            _connectionString = connectionString;
            _passwordHasher = passwordHasher;
        }

        public bool IsUsernameAndPasswordValid(string username, string password)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                SqlCommand cmd = connection.CreateCommand();
                cmd.CommandText = "SELECT password, salt FROM users_sms WHERE username = '" + username + "'";

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    string storedPassword = (string)reader["password"];
                    string storedSalt = (string)reader["salt"];
                  //  string computedHash = _passwordHasher.ComputeHash(password, Convert.FromBase64String(storedSalt));

                  //  return computedHash.Equals(storedPassword);
                }

                return false;
            }
        }
    }
}
