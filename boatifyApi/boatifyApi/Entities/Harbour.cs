namespace boatifyApi.Entities
{
    public class Harbour
    {
        public int Id { get; set; }
        public required string? Name { get; set; }
        public string? ContactEmail { get; set; }
        public string? ContactNumber { get; set; }
        public int AddressId { get; set; }
        public virtual required Address Address { get; set; }

        public virtual List<Boat>? Boats { get; set; }

    }
}
