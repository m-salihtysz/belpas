using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Belpas.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddOzgecmisAndGorevlerToCalisanlar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Gorevler",
                table: "Calisanlar",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ozgecmis",
                table: "Calisanlar",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gorevler",
                table: "Calisanlar");

            migrationBuilder.DropColumn(
                name: "Ozgecmis",
                table: "Calisanlar");
        }
    }
}
