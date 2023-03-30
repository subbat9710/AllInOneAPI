using NasaSpaceInfo.Model;
using RestSharp;

namespace NasaSpaceInfo.Service
{
    public class ApodApiService : IApod
    {
        private const string API_URL = "https://api.nasa.gov/planetary/";
        private const string API_KEY = "";
        private readonly RestClient client = new RestClient();

        public Apod GetApod()
        {
            RestRequest request = new RestRequest(API_URL + "apod?api_key=" + API_KEY);
            IRestResponse<Apod> response = client.Get<Apod>(request);
            if(response.ResponseStatus == ResponseStatus.Completed && response.IsSuccessful)
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
