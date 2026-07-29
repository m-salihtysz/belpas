using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Belpas.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSlugToHaberler : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Tesisler",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Haberler",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Haberler");
        }
    }
}
