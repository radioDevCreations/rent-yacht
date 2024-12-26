namespace boatifyApi.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Username { get; set; }
        public string? Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public int? AddressId { get; set; }
        public virtual Address? Address { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; }


    }
}
