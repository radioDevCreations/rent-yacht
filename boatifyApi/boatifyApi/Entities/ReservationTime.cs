namespace boatifyApi.Entities
{
    public class ReservationTime
    {
        public int Id { get; set; }

        public required DateTime StartTime { get; set; }
        public required DateTime EndTime { get; set; }
        public virtual Reservation? Reservation { get; set; }
    }
}
