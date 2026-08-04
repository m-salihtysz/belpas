namespace Belpas.Api.Models;

public class Slider
{
    public int Id { get; set; }
    public string Kategori { get; set; } = "BELPAŞ'A HOŞ GELDİNİZ";
    public string Baslik { get; set; } = string.Empty;
    public string? Aciklama { get; set; }
    public string ResimUrl { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string BtnMetni { get; set; } = "KEŞFEDİN";
    public string BtnLink { get; set; } = "/tesisler";
    public int Sira { get; set; } = 0;
    public bool Aktif { get; set; } = true;
}
