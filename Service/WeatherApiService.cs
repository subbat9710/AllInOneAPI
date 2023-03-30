using NasaSpaceInfo.Model;
using RestSharp;
using System;

namespace NasaSpaceInfo.Service
{
    public class WeatherApiService : IWeather
    {
        private const string API_URL = "http://api.weatherapi.com/v1/current.json";
        private const string API_KEY = "";
        private readonly RestClient client = new RestClient();


        public Weather GetLiveWeather(string location)
        {
            RestRequest request = new RestRequest(API_URL + "?key=" + API_KEY);
            request.AddParameter("q", location);
            request.AddParameter("aqi", "no");
            Console.WriteLine(request.Resource); // Print the URL

            IRestResponse<Weather> response = client.Get<Weather>(request);
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
