using System.ComponentModel.DataAnnotations;

namespace boatifyApi.Models
{
    public class CreateBoatDto
    {
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        public string Description { get; set; } = "";
        [Required]
        public required string Model { get; set; }
        [Required]
        public required string Type { get; set; }
        [Required]
        public required double PricePerDay { get; set; }
        [Required]
        public required IFormFile MainImage { get; set; }


        public int HarbourId { get; set; }
    }
}
