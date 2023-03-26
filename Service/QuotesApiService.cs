using NasaSpaceInfo.Model;
using RestSharp;

namespace NasaSpaceInfo.Service
{
    public class QuotesApiService : IQuote
    {
        private const string API_URL = "https://favqs.com/api/qotd";
        private readonly RestClient client = new RestClient();

        public QuoteOfTheDay GetQuote() 
        {
            RestRequest request = new RestRequest(API_URL);
            IRestResponse<QuoteOfTheDay> response = client.Get<QuoteOfTheDay>(request);
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
