using System;

namespace NasaSpaceInfo.Model
{
    public class Apod
    {
        public DateTime TodayDate { get; set; }
        public string Explanation { get; set; }
        public string Url { get; set; } 
        public string HdUrl { get; set; }
        public string Title { get; set; }
        public string MediaType { get; set; }
    }
}
