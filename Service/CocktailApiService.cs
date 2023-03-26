using NasaSpaceInfo.Model;
using RestSharp;
using System.Linq;

namespace NasaSpaceInfo.Service
{
    public class CocktailApiService : IDrinks
    {
        private const string API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        private readonly RestClient client = new RestClient();

        public Drinks RandomCocktail()
        {
            RestRequest request = new RestRequest(API_URL);
            IRestResponse<RootObject> response = client.Get<RootObject>(request);
            if (response.ResponseStatus == ResponseStatus.Completed && response.IsSuccessful)
            {
                return response.Data.drinks.FirstOrDefault();
            }
            else
            {
                return null;
            }
        }
    }
}
