using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace boatifyApi.Migrations
{
    /// <inheritdoc />
    public partial class boatimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MainImage",
                table: "Boats",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainImage",
                table: "Boats");
        }
    }
}
