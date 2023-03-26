using Newtonsoft.Json;
using System.Collections.Generic;

namespace NasaSpaceInfo.Model
{
    public class Nutrient
    {
        public Dictionary<string, NutrientDetails> TotalNutrients { get; set; } = new Dictionary<string, NutrientDetails>();

    }

    public class NutrientDetails
    {
        [JsonProperty("label")]
        public string Label { get; set; }

        public double Quantity { get; set; }

        public string Unit { get; set; }
    }



    //    public string uri { get; set; }
    //    public int calories { get; set; }
    //    public double totalWeight { get; set; }
    //    public List<string> dietLabels { get; set; }
    //    public List<string> healthLabels { get; set; }
    //    public List<string> cautions { get; set; }
    //    public Dictionary<string, NutrientDetails> totalNutrients { get; set; } = new Dictionary<string, NutrientDetails>();

    //    public class NutrientDetails
    //    {
    //        public string label { get; set; }
    //        public double quantity { get; set; }
    //        public string unit { get; set; }
    //    }
}
