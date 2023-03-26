using Microsoft.VisualBasic;
using System.Security.Permissions;

namespace NasaSpaceInfo.Model
{
    public class Weather
    {
        public Location Location { get; set; }
        public Current Current { get; set; }
    }

    public class Location
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string Tz_id { get; set; }
        public long Localtime_epoch { get; set; }
        public string Localtime { get; set; }
    }

    public class Current
    {
        public long Last_updated_epoch { get; set; }
        public string Last_updated { get; set; }
        public double Temp_c { get; set; }
        public double Temp_f { get; set; }
        public int Is_day { get; set; }
        public Condition Condition { get; set; }
        public double Wind_mph { get; set; }
        public double Wind_kph { get; set; }
        public int Wind_degree { get; set; }
        public string Wind_dir { get; set; }
        public double Pressure_mb { get; set; }
        public double Pressure_in { get; set; }
        public double Precip_mm { get; set; }
        public double Precip_in { get; set; }
        public int Humidity { get; set; }
        public int Cloud { get; set; }
        public double Feelslike_c { get; set; }
        public double Feelslike_f { get; set; }
        public double Vis_km { get; set; }
        public double Vis_miles { get; set; }
        public double Uv { get; set; }
        public double Gust_mph { get; set; }
        public double Gust_kph { get; set; }
    }

    public class Condition
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public int Code { get; set; }
    }
}
