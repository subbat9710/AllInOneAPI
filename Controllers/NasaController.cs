using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NasaSpaceInfo.DAO;
using NasaSpaceInfo.DTO;
using NasaSpaceInfo.Model;
using NasaSpaceInfo.Service;
using System.Collections.Generic;
using System.Linq;

namespace NasaSpaceInfo.Controllers
{
    [Route("api/nasa/")]
    [ApiController]
    public class NasaController : ControllerBase
    {
        private IApod apod;
        private IQuote quote;
        private ICatPic catPic;
        private ICatFact catFact;
        private IChuckJokes chuckJokes;
        private ICatFactDao catFactDao;
        private IWeather weather;
        private IHealth health;
        private IDrinks drinks;
        private ICreateImage createImage;

        public NasaController(IApod _apod, IQuote _quote, ICatPic _catPic, ICatFact _catFact, IChuckJokes _chuckJokes, ICatFactDao _catFactDao, IWeather _weather, IHealth _health, IDrinks _drinks, ICreateImage _createImage)
        {
            this.apod = _apod;
            this.quote = _quote;
            this.catPic = _catPic;
            this.catFact = _catFact;
            this.chuckJokes = _chuckJokes;
            this.catFactDao = _catFactDao;
            this.weather = _weather;
            this.health = _health;
            this.drinks = _drinks;
            this.createImage = _createImage;
        }

        [HttpGet]
        public ActionResult<NasaDaily> GetApod()
        {
            QuoteOfTheDay newQuote = quote.GetQuote();
            Apod newApod = apod.GetApod();
            CatPic newCatPic = catPic.GetPic();
            CatFact newCatFact = catFact.GetFact();
            ChuckJoke newChuckJoke = chuckJokes.GetJoke();
            Drinks newDrinks = drinks.RandomCocktail();

            NasaDaily nasaDaily = new NasaDaily()
            {
                QuoteBody = newQuote.Quote.Body,
                Author = newQuote.Quote.Author,           
                TodayDate = newApod.TodayDate,
                Explanation = newApod.Explanation,
                Title = newApod.Title,
                ImgUrl = newApod.Url,
                CatPicImg = newCatPic.File,
                CatFact = newCatFact.Text,
                ChuckJokes = newChuckJoke.Value,
                strDrinkThumb = newDrinks.strDrinkThumb,
                strInstructions = newDrinks.strInstructions          
            };
            return nasaDaily;
        }
        [HttpGet("{location}")]
        public ActionResult<WeatherDto> GetLiveWeather(string location)
        {
            Weather weathers = weather.GetLiveWeather(location);

            WeatherDto basicWeatherInfo = new WeatherDto()
            {
                locationName = weathers.Location.Name,
                region = weathers.Location.Region,
                country = weathers.Location.Country,
                localTime = weathers.Location.Localtime,
                text = weathers.Current.Condition.Text,
                icon = weathers.Current.Condition.Icon,
                temp_c = weathers.Current.Temp_c,
                temp_f = weathers.Current.Temp_f,
                humidity = weathers.Current.Humidity,
                cloud = weathers.Current.Cloud
            };
            if (basicWeatherInfo != null)
            {
                return Ok(basicWeatherInfo);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{amount:int}/coins")]
        public ActionResult<IDictionary<string, int>> GetCoins(int amount)
        {
            Dictionary<string, int> change = new Dictionary<string, int>();
            Dictionary<string, int> coins = new Dictionary<string, int>()
            {
                {"Quarter", 25 },
                {"Dime", 10 },
                {"Nickel", 5 },
                {"Penny", 1 }
            };

            foreach (KeyValuePair<string, int> coin in coins)
            {
                if (amount >= coin.Value)
                {
                    int countCoins = amount / coin.Value;
                    change[coin.Key] = countCoins;
                    amount -= coin.Value * countCoins;
                }
            }

            return Ok(change);
        }
        [HttpPost]
        public ActionResult<CreateImageResponse> CreateImage(CreateImageRequest createImageRequest)
        {
            ImageApiService imageApiService = new ImageApiService();
            CreateImageResponse createImageResponse = imageApiService.PostImage(createImageRequest);
            return createImageResponse;
        }
        //[HttpGet("{ingr}")]
        //public ActionResult<Nutrient> GetHealthTips(string ingr)
        //{
        //    if (string.IsNullOrEmpty(ingr))
        //    {
        //        return BadRequest("Please provide an ingredient to search for.");
        //    }

        //    Nutrient nutrients = health.GetNutrient(ingr);

        //    if (nutrients == null)
        //    {
        //        return NotFound($"Nutrient information not found for ingredient: {ingr}");
        //    }

        //    return Ok(nutrients);
        //}
    }
}

