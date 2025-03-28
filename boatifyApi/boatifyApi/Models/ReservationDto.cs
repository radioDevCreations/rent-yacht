using boatifyApi.Entities;

namespace boatifyApi.Models
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int BoatId { get; set; }
        public int UserId { get; set; }
        public double TotalPrice { get; set; }
        public int ReservationStatusId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual string ReservationStatusName { get; set; }
    }
}
