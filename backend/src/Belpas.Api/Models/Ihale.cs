namespace Belpas.Api.Models;

public class Ihale
{
    public int Id { get; set; }
    public required string IhaleNo { get; set; }
    public required string Konu { get; set; }
    public DateTime Tarih { get; set; }
    public string? Tur { get; set; } // e.g. Satış, Alım, Kiralama
    public string? Durum { get; set; } // e.g. İlanda, Sonuçlandı, İptal
    public string? DosyaUrl { get; set; } // Şartname doküman linki
    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;
}
