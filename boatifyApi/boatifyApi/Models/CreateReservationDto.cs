namespace boatifyApi.Models
{
    public class CreateReservationDto
    {
        public int UserId { get; set; }
        public int BoatId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double TotalPrice { get; set; }
        public string Status { get; set; }
    }
}
