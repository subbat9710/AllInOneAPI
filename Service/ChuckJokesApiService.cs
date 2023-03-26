using NasaSpaceInfo.Model;
using RestSharp;

namespace NasaSpaceInfo.Service
{
    public class ChuckJokesApiService : IChuckJokes
    {
        private const string API_URL = "https://api.chucknorris.io/jokes/random";
        private readonly RestClient client = new RestClient();
        public ChuckJoke GetJoke()
        {
            RestRequest request = new RestRequest(API_URL);
            IRestResponse<ChuckJoke> response = client.Get<ChuckJoke>(request);
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
