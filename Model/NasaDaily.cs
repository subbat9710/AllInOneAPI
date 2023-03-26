using System;
using System.Collections.Generic;

namespace NasaSpaceInfo.Model
{
    public class NasaDaily
    {
        public DateTime TodayDate { get; set; }
        public string Explanation { get; set; }  
        public string ImgUrl { get; set; }  
        public string Title { get; set; }
        public string Author { get; set; }
        public string QuoteBody { get; set; }  
        public string CatPicImg { get; set; }
        public string CatFact { get; set; }
        public string ChuckJokes { get; set; }
        public string strInstructions { get; set; }
        public string strDrinkThumb { get; set; }
    }
}
