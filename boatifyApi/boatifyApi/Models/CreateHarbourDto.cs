using boatifyApi.Entities;
using System.ComponentModel.DataAnnotations;

namespace boatifyApi.Models
{
    public class CreateHarbourDto
    {
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }
        [EmailAddress]
        public string? ContactEmail { get; set; }
        [Phone]
        public string? ContactNumber { get; set; }
        public string? ApartmentNumber { get; set; }
        public string? Street { get; set; }
        [Required]
        public required string City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public double? Latitude { get; set; }
        public double? Longtitude { get; set; }


        public virtual List<CreateBoatDto>? Boats { get; set; }

    }
}
