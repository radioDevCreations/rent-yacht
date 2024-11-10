namespace boatifyApi.Entities
{
    public class Boat
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = "";
        public required string Model { get; set; }
        public required string Type { get; set; }
        public required double PricePerDay { get; set; }

        public int? CreatedById { get; set; }
        public virtual User CreatedBy { get; set; }

        public int HarbourId { get; set; }
        public virtual Harbour? Harbour { get; set; }
    }
}
