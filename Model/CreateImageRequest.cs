using System.Collections.Generic;

namespace NasaSpaceInfo.Model
{
    public class CreateImageRequest
    {
        public string prompt { get; set; }
        public int n { get; set; } = 1;
        public string size { get; set; } = "1024x1024";
    }

}
