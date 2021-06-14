using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace YourDiary.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    Email = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    Password = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DiaryEntry",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: true),
                    Tags = table.Column<List<string>>(type: "text[]", nullable: true),
                    CreationTime = table.Column<long>(type: "bigint", nullable: false),
                    LastEditTime = table.Column<long>(type: "bigint", nullable: false),
                    PublishTime = table.Column<long>(type: "bigint", nullable: false),
                    Draft = table.Column<bool>(type: "boolean", nullable: false),
                    OwnerId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaryEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiaryEntry_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DiaryEntry_OwnerId",
                table: "DiaryEntry",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DiaryEntry");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
