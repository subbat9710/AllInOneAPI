using NasaSpaceInfo.Model;

namespace NasaSpaceInfo.Service
{
    public interface IHealth
    {
        public Nutrient GetNutrient(string ingr);
    }
}
