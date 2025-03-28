namespace boatifyApi.Models
{
    public class SelfReservationDto
    {
        public int Id { get; set; }
        public int BoatId { get; set; }
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
