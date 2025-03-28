namespace boatifyApi.Models
{
    public class ReservationQuery
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? SortBy { get; set; }
        public SortDirection SortDirection { get; set; }

    }
}
