using NasaSpaceInfo.Model;

namespace NasaSpaceInfo.Service
{
    public interface IWeather
    {
        Weather GetLiveWeather(string location);
    }
}
