using System.Collections.Generic;

namespace NasaSpaceInfo.Model
{
    public class Quote
    {
        public int Id { get; set; }
        public bool Dialogue { get; set; }
        public bool Private { get; set; }
        public List<string> Tags { get; set; }
        public string Url { get; set; }
        public int FavoritesCount { get; set; }
        public int UpvotesCount { get; set; }
        public int DownvotesCount { get; set; }
        public string Author { get; set; }
        public string AuthorPermalink { get; set; }
        public string Body { get; set; }
    }
}
