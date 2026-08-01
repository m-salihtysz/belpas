using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Belpas.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddLogoUrlToTesis : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "Tesisler",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MenuGorselUrl",
                table: "Tesisler",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MenuPdfUrl",
                table: "Tesisler",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "MenuGorselUrl",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "MenuPdfUrl",
                table: "Tesisler");
        }
    }
}
