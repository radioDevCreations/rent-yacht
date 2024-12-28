namespace boatifyApi.Entities
{
    public class SelfReservation
    {
        public int Id { get; set; }
        public int BoatId { get; set; }
        public virtual required Boat Boat { get; set; }
        public int UserId { get; set; }
        public virtual required User User { get; set; }
        public int ReservationTimeId { get; set; }
        public virtual required ReservationTime ReservationTime { get; set; }
    }
}
