using System.Diagnostics.Metrics;
using System.IO;
using System.Reflection.Emit;

namespace boatifyApi.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string ApartmentNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

        public virtual Harbour Harbour { get; set; }

        public virtual User User { get; set; }
    }
}
