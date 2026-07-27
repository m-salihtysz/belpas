using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Belpas.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddEtkinliklerTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HaftaIciSaat",
                table: "Tesisler",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HaftaSonuSaat",
                table: "Tesisler",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Tesisler",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Tesisler",
                type: "double precision",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Etkinlikler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Baslik = table.Column<string>(type: "text", nullable: false),
                    Kategori = table.Column<string>(type: "text", nullable: false),
                    Ozet = table.Column<string>(type: "text", nullable: false),
                    Detay = table.Column<string>(type: "text", nullable: false),
                    Tarih = table.Column<string>(type: "text", nullable: false),
                    Saat = table.Column<string>(type: "text", nullable: false),
                    Konum = table.Column<string>(type: "text", nullable: false),
                    ResimUrl = table.Column<string>(type: "text", nullable: true),
                    Kontenjan = table.Column<string>(type: "text", nullable: false),
                    Ucretsiz = table.Column<bool>(type: "boolean", nullable: false),
                    Populer = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etkinlikler", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Etkinlikler");

            migrationBuilder.DropColumn(
                name: "HaftaIciSaat",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "HaftaSonuSaat",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Tesisler");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Tesisler");
        }
    }
}
