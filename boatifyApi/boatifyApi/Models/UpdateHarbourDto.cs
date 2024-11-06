using System.ComponentModel.DataAnnotations;

namespace boatifyApi.Models
{
    public class UpdateHarbourDto
    {
        [Required]
        [MaxLength(50)]
        public string? Name { get; set; }
        [EmailAddress]
        public string? ContactEmail { get; set; }
        [Phone]
        public string? ContactNumber { get; set; }
    }
}
