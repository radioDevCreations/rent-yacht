using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace boatifyApi.Migrations
{
    /// <inheritdoc />
    public partial class passengersfield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Passengers",
                table: "Boats",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passengers",
                table: "Boats");
        }
    }
}
