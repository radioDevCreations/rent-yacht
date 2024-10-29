namespace boatifyApi.Entities
{
    public class Harbour
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longtitude { get; set; }

        public string ContactEmail { get; set; }
        public string ContactNumber { get; set; }
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }

        public virtual List<Boat> Boats { get; set; }

    }
}
