using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Belpas.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddKategoriProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Harf",
                table: "Tesisler",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Kategori",
                table: "Tesisler",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Renk",
                table: "Tesisler",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Kategori",
                table: "Haberler",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Harf",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "Kategori",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "Renk",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "Kategori",
                table: "Haberler");
        }
    }
}
