namespace Belpas.Api.Models
{
    public class Calisan
    {
        public int Id { get; set; }
        public string AdSoyad { get; set; } = string.Empty;
        public string Unvan { get; set; } = string.Empty;
        public string? Departman { get; set; }
        public string? Eposta { get; set; }
        public string? Telefon { get; set; }
        public string? FotoUrl { get; set; }
        public int Sira { get; set; } = 0;
        public bool Aktif { get; set; } = true;
    }
}
