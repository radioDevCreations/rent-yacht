using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace boatifyApi.Migrations
{
    /// <inheritdoc />
    public partial class AddResrvation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Boats_BoatId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_ReservationStatuses_ReservationStatusId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_ReservationTime_ReservationTimeId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Users_UserId",
                table: "Reservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservationTime",
                table: "ReservationTime");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reservation",
                table: "Reservation");

            migrationBuilder.RenameTable(
                name: "ReservationTime",
                newName: "ReservationTimes");

            migrationBuilder.RenameTable(
                name: "Reservation",
                newName: "Reservations");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_UserId",
                table: "Reservations",
                newName: "IX_Reservations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservationTimeId",
                table: "Reservations",
                newName: "IX_Reservations_ReservationTimeId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_ReservationStatusId",
                table: "Reservations",
                newName: "IX_Reservations_ReservationStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservation_BoatId",
                table: "Reservations",
                newName: "IX_Reservations_BoatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservationTimes",
                table: "ReservationTimes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reservations",
                table: "Reservations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Boats_BoatId",
                table: "Reservations",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationStatuses_ReservationStatusId",
                table: "Reservations",
                column: "ReservationStatusId",
                principalTable: "ReservationStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationTimes_ReservationTimeId",
                table: "Reservations",
                column: "ReservationTimeId",
                principalTable: "ReservationTimes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_UserId",
                table: "Reservations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Boats_BoatId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationStatuses_ReservationStatusId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationTimes_ReservationTimeId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_UserId",
                table: "Reservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservationTimes",
                table: "ReservationTimes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reservations",
                table: "Reservations");

            migrationBuilder.RenameTable(
                name: "ReservationTimes",
                newName: "ReservationTime");

            migrationBuilder.RenameTable(
                name: "Reservations",
                newName: "Reservation");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_UserId",
                table: "Reservation",
                newName: "IX_Reservation_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_ReservationTimeId",
                table: "Reservation",
                newName: "IX_Reservation_ReservationTimeId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_ReservationStatusId",
                table: "Reservation",
                newName: "IX_Reservation_ReservationStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_BoatId",
                table: "Reservation",
                newName: "IX_Reservation_BoatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservationTime",
                table: "ReservationTime",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reservation",
                table: "Reservation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Boats_BoatId",
                table: "Reservation",
                column: "BoatId",
                principalTable: "Boats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_ReservationStatuses_ReservationStatusId",
                table: "Reservation",
                column: "ReservationStatusId",
                principalTable: "ReservationStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_ReservationTime_ReservationTimeId",
                table: "Reservation",
                column: "ReservationTimeId",
                principalTable: "ReservationTime",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Users_UserId",
                table: "Reservation",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
