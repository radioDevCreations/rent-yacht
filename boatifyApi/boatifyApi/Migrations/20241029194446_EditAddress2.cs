using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace boatifyApi.Migrations
{
    /// <inheritdoc />
    public partial class EditAddress2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Addresses",
                newName: "LocationName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LocationName",
                table: "Addresses",
                newName: "Name");
        }
    }
}
