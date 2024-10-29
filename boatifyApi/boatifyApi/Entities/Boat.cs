namespace boatifyApi.Entities
{
    public class Boat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string PricePerDay { get; set; }


        public virtual int HarbourId { get; set; }
        public virtual Harbour Harbour { get; set; }
    }
}
