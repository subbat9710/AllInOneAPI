using NasaSpaceInfo.Model;
using RestSharp;
using System.Collections.Generic;

namespace NasaSpaceInfo.Service
{
    public class ImageApiService : ICreateImage
    {
        private const string API_URL = "https://api.openai.com/v1/images/generations";
        private const string API_KEY = "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";
        private readonly RestClient client;

        public ImageApiService()
        {
            if (client == null)
            {
                client = new RestClient(API_URL);
                client.AddDefaultHeader("Authorization", $"Bearer {API_KEY}");
            }
        }

        public CreateImageResponse PostImage(CreateImageRequest createImageRequest)
        {
            RestRequest request = new RestRequest();
            request.AddHeader("Authorization", $"Bearer {API_KEY}");
            request.AddJsonBody(createImageRequest);

            IRestResponse<CreateImageResponse> response = client.Post<CreateImageResponse>(request);
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
