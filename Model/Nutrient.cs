using System.Collections.Generic;

namespace NasaSpaceInfo.Model
{
    public class Nutrient
    {
        public string url { get; set; } 
        public int calories { get; set; }
        public double totalWeight { get; set; }

        //public double ENERC_KCAL { get; set; }
        //public double FAT { get; set; }
        //public double FASAT { get; set; }
        //public double FATRN { get; set; }
        //public double FAMS { get; set; }
        //public double FAPU { get; set; }
        //public double CHOCDF { get; set; }
        //public double FIBTG { get; set; }
        //public double SUGAR { get; set; }
        //public double PROCNT { get; set; }
        //public double CHOLE { get; set; }
        //public double NA { get; set; }
        //public double CA { get; set; }
        //public double MG { get; set; }
        //public double K { get; set; }
        //public double FE { get; set; }
        //public double ZN { get; set; }
        //public double P { get; set; }
        //public double VITA_RAE { get; set; }
        //public double VITC { get; set; }
        //public double THIA { get; set; }
        //public double RIBF { get; set; }
        //public double NIA { get; set; }
        //public double VITB6A { get; set; }
        //public double FOLDFE { get; set; }
        //public double VITB12 { get; set; }
        //public double VITD { get; set; }
        //public double TOCPHA { get; set; }
        //public double VITK1 { get; set; }
        //public string Label { get; set; }
        //public double Quantity { get; set; }
        //public string Unit { get; set; }

        //public class ParsedFood
        //{
        //    public double Quantity { get; set; }
        //    public string FoodMatch { get; set; }
        //    public string Food { get; set; }
        //    public string FoodId { get; set; }
        //    public double Weight { get; set; }
        //    public double RetainedWeight { get; set; }
        //    public Dictionary<string, Nutrient> Nutrients { get; set; }
        //}

        //public class Ingredient
        //{
        //    public string Text { get; set; }
        //    public List<ParsedFood> Parsed { get; set; }
        //}

        //public class Recipe
        //{
        //    public string Uri { get; set; }
        //    public int Calories { get; set; }
        //    public double TotalWeight { get; set; }
        //    public List<string> DietLabels { get; set; }
        //    public List<string> HealthLabels { get; set; }
        //    public List<string> Cautions { get; set; }
        //    public Dictionary<string, Nutrient> TotalNutrients { get; set; }
        //    public Dictionary<string, Nutrient> TotalDaily { get; set; }
        //    public List<Ingredient> Ingredients { get; set; }
        //}
    }
}
