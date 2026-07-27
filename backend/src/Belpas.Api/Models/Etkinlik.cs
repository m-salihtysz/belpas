namespace Belpas.Api.Models;

public class Etkinlik
{
    public int Id { get; set; }
    public required string Baslik { get; set; }
    public required string Kategori { get; set; }
    public required string Ozet { get; set; }
    public required string Detay { get; set; }
    public required string Tarih { get; set; }
    public required string Saat { get; set; }
    public required string Konum { get; set; }
    public string? ResimUrl { get; set; }
    public required string Kontenjan { get; set; }
    public bool Ucretsiz { get; set; }
    public bool Populer { get; set; }
}
