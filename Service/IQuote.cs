using NasaSpaceInfo.Model;

namespace NasaSpaceInfo.Service
{
    public interface IQuote
    {
        QuoteOfTheDay GetQuote();
    }
}
