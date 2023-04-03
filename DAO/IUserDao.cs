using NasaSpaceInfo.Model;

namespace NasaSpaceInfo.DAO
{
    public interface IUserDao
    {
        bool IsUsernameAndPasswordValid(string username, string password);
        User SaveUser(string username, string password, string role);
        User SelectUserRole(string username, string password);
    }
}
