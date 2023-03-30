using NasaSpaceInfo.Model;

namespace NasaSpaceInfo.Service
{
    public interface ICreateImage
    {
        CreateImageResponse PostImage(CreateImageRequest createImageRequest);
    }
}
