namespace Belpas.Api.Models;

public class Tesis
{
    public int Id { get; set; }
    public required string Ad { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Kategori { get; set; } = "Tesis";
    public string Renk { get; set; } = "#8B4513";
    public string Harf { get; set; } = "T";
    public required string Aciklama { get; set; }
    public string? Adres { get; set; }
    public string? Telefon { get; set; }
    public string? ResimUrl { get; set; }
    public string? LogoUrl { get; set; }
    public string? MenuPdfUrl { get; set; }
    public string? MenuGorselUrl { get; set; }
    public string? KonumUrl { get; set; } // Google Maps linki
    public string? HaftaIciSaat { get; set; } // Örn: 09:00–23:00
    public string? HaftaSonuSaat { get; set; } // Örn: 09:00–23:00
    public double? Lat { get; set; }
    public double? Lng { get; set; }
    public int Sira { get; set; } = 0;
    public bool Aktif { get; set; } = true;
}
