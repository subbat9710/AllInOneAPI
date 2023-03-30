using System.Collections.Generic;

namespace NasaSpaceInfo.Model
{
    public class CreateImageResponse
    {
        public List<ImageData> Data { get; set; }
        public long Created { get; set; }
    }

    public class ImageData
    {
        public string Url { get; set; }
    }
}
