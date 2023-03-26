using NasaSpaceInfo.Model;
using RestSharp;

namespace NasaSpaceInfo.Service
{
    public class CatFactApiService : ICatFact
    {
        private static readonly string API_URL = "https://cat-data.netlify.app/api/facts/random";
        private readonly RestClient client = new RestClient();

        public CatFact GetFact()
        {
            RestRequest request = new RestRequest(API_URL);
            IRestResponse<CatFact> response = client.Get<CatFact>(request);
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
