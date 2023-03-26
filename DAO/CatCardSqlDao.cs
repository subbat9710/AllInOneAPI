using NasaSpaceInfo.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace NasaSpaceInfo.DAO
{
    public class CatCardSqlDao : ICatFactDao
    {
        private readonly string connectString;

        public CatCardSqlDao(string dbconnectString)
        {
            connectString = dbconnectString;
        }

        public CatFactPic SaveCard(CatFactPic catSave)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectString))
                {
                    connection.Open();
                    SqlCommand cmd = new SqlCommand();
                    string sql = "INSERT INTO catcards (img_url, fact) VALUES (@img_url, @fact)";
                    cmd.CommandText = sql;
                    cmd.Parameters.AddWithValue("@img_url", catSave.CatImgUrl);
                    cmd.Parameters.AddWithValue("@fact", catSave.CatFact);

                    cmd.Connection = connection;

                    cmd.ExecuteNonQuery();
                    cmd = new SqlCommand("SELECT @@IDENTITY", connection);
                    int newId = Convert.ToInt32(cmd.ExecuteScalar());

                    catSave.Id = newId;
                    return catSave;

                }
            }
            catch (SqlException)
            {
                throw;
            }
        }
        public List<CatFactPic> GetAllCatFact()
        {
            List<CatFactPic> cards = new List<CatFactPic>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectString))
                {
                    connection.Open();
                    SqlCommand cmd = new SqlCommand();
                    string sql = "SELECT * FROM catcards";
                    cmd.CommandText = sql;
                    cmd.Connection = connection;

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        CatFactPic card = new CatFactPic();
                        card.Id = reader.GetInt32(0);
                        card.CatImgUrl = reader.GetString(1);
                        card.CatFact = reader.GetString(2);

                        cards.Add(card);
                    }
                }
            }
            catch (SqlException)
            {
                throw;
            }
            return cards;
        }
        public CatFactPic GetCard(int CatCardId)
        {
            CatFactPic returnCard = null;

            try
            {
                using (SqlConnection conn = new SqlConnection(connectString))
                {
                    conn.Open();

                    SqlCommand cmd = new SqlCommand("SELECT id, img_url, fact FROM catcards WHERE id = @card_id", conn);
                    cmd.Parameters.AddWithValue("@card_id", CatCardId);
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        returnCard = GetCatCardFromReader(reader);
                    }
                }
            }
            catch (SqlException)
            {
                throw;
            }

            return returnCard;
        }

        public bool RemoveCard(int id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectString))
                {
                    conn.Open();

                    SqlCommand cmd = new SqlCommand("DELETE FROM catcards WHERE id = @card_id", conn);
                    cmd.Parameters.AddWithValue("@card_id", id);

                    int rowsAffected = cmd.ExecuteNonQuery();

                    return (rowsAffected > 0);
                }
            }
            catch (SqlException)
            {
                throw;
            }
        }
        private CatFactPic GetCatCardFromReader(SqlDataReader reader)
        {
            CatFactPic c = new CatFactPic()
            {
                Id = Convert.ToInt32(reader["CatCardId"]),
                CatImgUrl = Convert.ToString(reader["img_url"]),
                CatFact = Convert.ToString(reader["fact"])
            };

            return c;
        }
    }
}
