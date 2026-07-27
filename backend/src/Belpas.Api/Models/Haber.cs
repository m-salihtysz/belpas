namespace Belpas.Api.Models;

public class Haber
{
    public int Id { get; set; }
    public required string Baslik { get; set; }
    public string Kategori { get; set; } = "Haber";
    public required string Ozet { get; set; }
    public required string Icerik { get; set; }
    public string? ResimUrl { get; set; }
    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;
    public bool Aktif { get; set; } = true;
}
