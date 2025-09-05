using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class NameChangedInEventAttendees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventAttendee_AspNetUsers_UserId",
                table: "EventAttendee");

            migrationBuilder.DropForeignKey(
                name: "FK_EventAttendee_Event_EventId",
                table: "EventAttendee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventAttendee",
                table: "EventAttendee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Event",
                table: "Event");

            migrationBuilder.RenameTable(
                name: "EventAttendee",
                newName: "EventAttendees");

            migrationBuilder.RenameTable(
                name: "Event",
                newName: "Events");

            migrationBuilder.RenameIndex(
                name: "IX_EventAttendee_UserId",
                table: "EventAttendees",
                newName: "IX_EventAttendees_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventAttendees",
                table: "EventAttendees",
                columns: new[] { "EventId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Events",
                table: "Events",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventAttendees_AspNetUsers_UserId",
                table: "EventAttendees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventAttendees_Events_EventId",
                table: "EventAttendees",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventAttendees_AspNetUsers_UserId",
                table: "EventAttendees");

            migrationBuilder.DropForeignKey(
                name: "FK_EventAttendees_Events_EventId",
                table: "EventAttendees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Events",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventAttendees",
                table: "EventAttendees");

            migrationBuilder.RenameTable(
                name: "Events",
                newName: "Event");

            migrationBuilder.RenameTable(
                name: "EventAttendees",
                newName: "EventAttendee");

            migrationBuilder.RenameIndex(
                name: "IX_EventAttendees_UserId",
                table: "EventAttendee",
                newName: "IX_EventAttendee_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Event",
                table: "Event",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventAttendee",
                table: "EventAttendee",
                columns: new[] { "EventId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_EventAttendee_AspNetUsers_UserId",
                table: "EventAttendee",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventAttendee_Event_EventId",
                table: "EventAttendee",
                column: "EventId",
                principalTable: "Event",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
