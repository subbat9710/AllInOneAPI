using NasaSpaceInfo.Model;
using RestSharp;

namespace NasaSpaceInfo.Service
{
    public class HealthApiService : IHealth
    {
        private static readonly string API_URL = "https://api.edamam.com/api/nutrition-data";
        private static readonly string APP_ID = "";
        private static readonly string APP_KEY = "";

        private readonly RestClient client = new RestClient();

        public Nutrient GetNutrient(string ingr)
        {
            RestRequest request = new RestRequest(API_URL);
            request.AddParameter("app_id", APP_ID);
            request.AddParameter("app_key", APP_KEY);
            request.AddParameter("nutrition-type", "cooking");
            request.AddParameter("ingr", ingr);
            IRestResponse<Nutrient> response = client.Get<Nutrient>(request);
            if (response.ResponseStatus == ResponseStatus.Completed && response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                return null;
            }
        }

    }
}
