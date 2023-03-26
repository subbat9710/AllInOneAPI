namespace NasaSpaceInfo.DTO
{
    public class WeatherDto
    {
        public string locationName { get; set; }
        public string region { get; set; }
        public string country { get; set; }
        public string localTime { get; set; }
        public string text { get; set; }
        public string icon { get; set; }
        public double temp_c { get; set; }
        public double temp_f { get; set; }
        public double humidity { get; set; }
        public double cloud { get; set; } 
    }
}
