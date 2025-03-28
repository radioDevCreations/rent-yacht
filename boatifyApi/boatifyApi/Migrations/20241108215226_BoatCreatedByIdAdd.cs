using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace boatifyApi.Migrations
{
    /// <inheritdoc />
    public partial class BoatCreatedByIdAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Boats",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Boats_CreatedById",
                table: "Boats",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Boats_Users_CreatedById",
                table: "Boats",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boats_Users_CreatedById",
                table: "Boats");

            migrationBuilder.DropIndex(
                name: "IX_Boats_CreatedById",
                table: "Boats");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Boats");
        }
    }
}
