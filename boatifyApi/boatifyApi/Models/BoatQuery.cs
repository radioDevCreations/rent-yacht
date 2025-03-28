using Microsoft.AspNetCore.Mvc;

namespace boatifyApi.Models
{
    public class BoatQuery
    {
        public string SearchPhrase { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? SortBy { get; set; }
        public SortDirection SortDirection { get; set; }

    }
}
