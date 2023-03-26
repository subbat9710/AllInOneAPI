using NasaSpaceInfo.Model;
using RestSharp;

namespace NasaSpaceInfo.Service
{
    public class CatPicApiService : ICatPic
    {
        private static readonly string API_URL = "https://cat-data.netlify.app/api/pictures/random";
        private readonly RestClient client = new RestClient();

        public CatPic GetPic()
        {
            RestRequest request = new RestRequest(API_URL);
            IRestResponse<CatPic> response = client.Get<CatPic>(request);
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
