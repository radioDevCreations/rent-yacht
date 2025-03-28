namespace boatifyApi.Models
{
    public class CreateSelfReservationDto
    {
        public int? UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
