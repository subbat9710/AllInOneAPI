using NasaSpaceInfo.Model;
using System.Collections.Generic;

namespace NasaSpaceInfo.DAO
{
    public interface ICatFactDao
    {
        CatFactPic SaveCard(CatFactPic catSave);
        List<CatFactPic> GetAllCatFact();
        CatFactPic GetCard(int id);
        bool RemoveCard(int id);

    }
}
