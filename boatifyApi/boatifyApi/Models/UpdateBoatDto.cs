using System.ComponentModel.DataAnnotations;

namespace boatifyApi.Models
{
    public class UpdateBoatDto
    {
            [Required]
            public required double PricePerDay { get; set; }

            [Required]
            public int HarbourId { get; set; }
    }
}
