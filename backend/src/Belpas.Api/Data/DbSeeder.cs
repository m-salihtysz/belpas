using Belpas.Api.Models;

namespace Belpas.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        context.Database.EnsureCreated();

        // 1. Haberler Seeding
        if (!context.Haberler.Any())
        {
            context.Haberler.AddRange(
                new Haber
                {
                    Baslik = "Nehir Çikolata'da Dubai Lezzeti Kampanyası Başladı",
                    Kategori = "Duyuru",
                    Ozet = "Orijinal Dubai çikolatası ile hazırlanan özel seri, Ofis Sanat Merkezi kafeteryamızda sizleri bekliyor.",
                    Icerik = "Orijinal Dubai çikolatası ile hazırlanan özel seri, Ofis Sanat Merkezi kafeteryamızda sizleri bekliyor.",
                    ResimUrl = "/images/çikolata.jpeg",
                    OlusturmaTarihi = DateTime.UtcNow.AddDays(-1),
                    Aktif = true
                },
                new Haber
                {
                    Baslik = "Sakarya Büyükşehir Kent Rehberi Güncellendi",
                    Kategori = "Haber",
                    Ozet = "Şehrimizin sosyal ve kültürel etkinliklerini kapsayan yeni kent rehberimiz yayınlandı.",
                    Icerik = "Şehrimizin sosyal ve kültürel etkinliklerini kapsayan yeni kent rehberimiz yayınlandı.",
                    ResimUrl = "/images/kent_rehberi.png",
                    OlusturmaTarihi = DateTime.UtcNow.AddDays(-2),
                    Aktif = true
                },
                new Haber
                {
                    Baslik = "Yentkent Pazar'ında Yaz Festivali",
                    Kategori = "Etkinlik",
                    Ozet = "Her hafta sonu düzenlenen yaz festivali etkinliklerimize katılın, yerel üreticilerle tanışın.",
                    Icerik = "Her hafta sonu düzenlenen yaz festivali etkinliklerimize katılın, yerel üreticilerle tanışın.",
                    ResimUrl = "/images/screen3.png",
                    OlusturmaTarihi = DateTime.UtcNow.AddDays(-3),
                    Aktif = true
                },
                new Haber
                {
                    Baslik = "BELPAŞ'ta Kartlı Ödeme Dönemi 1 Temmuz'da Başlıyor",
                    Kategori = "Haber",
                    Ozet = "BELPAŞ, 1 Temmuz itibarıyla tüm sosyal tesisleri ve hizmet noktalarında kartlı ödeme sistemine geçiyor. Yeni uygulamayla birlikte nakit ödeme kabul edilmeyecek.",
                    Icerik = "Detaylı açıklama: Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ bünyesindeki tüm kafe, restoran ve sosyal tesislerde nakit kullanımı sonlandırılarak tamamen temassız ve kredi/banka kartlı ödemeye geçiş yapılacaktır.",
                    ResimUrl = "/images/ihale_1.jpg",
                    OlusturmaTarihi = DateTime.UtcNow.AddDays(-5),
                    Aktif = true
                },
                new Haber
                {
                    Baslik = "Kocaali Sosyal Tesislerimiz Yeni Sezonda Misafirlerini Ağırlamaya Başladı",
                    Kategori = "Duyuru",
                    Ozet = "Sakarya Büyükşehir Belediyesi'nin kadınlara özel hizmet veren Kocaali Sosyal Tesislerimiz, yeni sezonda misafirlerini ağırlamaya başladı.",
                    Icerik = "Sakarya Büyükşehir Belediyesi'nin kadınlara özel hizmet veren Kocaali Sosyal Tesisleri, yeni sezonda da kapılarını açarak misafirlerine konforlu ve huzurlu bir ortam sunmaya devam ediyor.",
                    ResimUrl = "/images/sbb_mekan.jpg",
                    OlusturmaTarihi = DateTime.UtcNow.AddDays(-10),
                    Aktif = true
                },
                new Haber
                {
                    Baslik = "Acarlar Longozu Baharda da Doğaseverlerin Gözdesi Olmaya Devam Ediyor",
                    Kategori = "Haber",
                    Ozet = "Sakarya Büyükşehir Belediyesi işletmesindeki Acarlar Longozu, baharla birlikte canlanan doğası ve eşsiz manzarasıyla ziyaretçilerini ağırlamaya devam ediyor.",
                    Icerik = "Dünyanın tek parça en büyük subasar ormanlarından biri olan Acarlar Longozu, yeni sezonda da doğa ile baş başa kalmak isteyenlerin ilk tercihi oluyor.",
                    ResimUrl = "/images/ihale2.jpg",
                    OlusturmaTarihi = DateTime.UtcNow.AddDays(-15),
                    Aktif = true
                }
            );
        }

        // 2. Tesisler Seeding
        if (!context.Tesisler.Any())
        {
            context.Tesisler.AddRange(
                new Tesis
                {
                    Ad = "Çay Dünyası",
                    Kategori = "Kafeterya",
                    Renk = "#8B4513",
                    Harf = "Ç",
                    Aciklama = "Belpaş çay bahçesi ve dinlenme tesisi.",
                    ResimUrl = "/images/cay-dunyasi.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Yentkent",
                    Kategori = "Pazar",
                    Renk = "#2E7D32",
                    Harf = "Y",
                    Aciklama = "Yenikent Kapalı Pazar Alanı.",
                    ResimUrl = "/images/yentkent.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "P Market",
                    Kategori = "Market",
                    Renk = "#1565C0",
                    Harf = "P",
                    Aciklama = "Belpaş tanzim satış ve süpermarket noktası.",
                    ResimUrl = "/images/p-market.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Nehir Kafeterya",
                    Kategori = "Kafeterya",
                    Renk = "#5D4037",
                    Harf = "N",
                    Aciklama = "Nehir kenarında keyifli çay kahve saati.",
                    ResimUrl = "/images/nehir-kafeterya.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "İznik Kiralama",
                    Kategori = "Kiralama",
                    Renk = "#E65100",
                    Harf = "İ",
                    Aciklama = "Sosyal ekipman ve alan kiralama hizmeti.",
                    ResimUrl = "/images/iznik-kiralama.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Meclis Kafeteryası",
                    Kategori = "Kafeterya",
                    Renk = "#1A237E",
                    Harf = "M",
                    Aciklama = "Belediye meclis binası kafeteryası.",
                    ResimUrl = "/images/meclis.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Büfe",
                    Kategori = "Gıda",
                    Renk = "#880E4F",
                    Harf = "B",
                    Aciklama = "Demokrasi Meydanı satış büfesi.",
                    ResimUrl = "/images/bufe.png",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Ormanpark",
                    Kategori = "Kafeterya",
                    Renk = "#8B4513",
                    Harf = "O",
                    Aciklama = "Doğa ile iç içe, restoran ve kahvaltı hizmeti sunan tesis.",
                    Adres = "Adnan Menderes Cd., Adapazarı/Sakarya",
                    Telefon = "0264 272 00 12",
                    ResimUrl = "/images/ormanpark.png",
                    KonumUrl = "https://maps.app.goo.gl/23nK4hfzZ3nYYxP68",
                    HaftaIciSaat = "09:00–23:00",
                    HaftaSonuSaat = "09:00–23:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Elegant Restoran",
                    Kategori = "Restoran",
                    Renk = "#880E4F",
                    Harf = "E",
                    Aciklama = "Şık atmosferi ve zengin menüsüyle seçkin bir restoran deneyimi.",
                    Adres = "Adapazarı/Sakarya",
                    Telefon = "0264 272 00 14",
                    ResimUrl = "/images/elegant-restoran.png",
                    KonumUrl = "https://maps.google.com",
                    HaftaIciSaat = "09:00–23:00",
                    HaftaSonuSaat = "09:00–23:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Millet Kıraathanesi",
                    Kategori = "Kütüphane",
                    Renk = "#1A237E",
                    Harf = "M",
                    Aciklama = "Ders çalışma, kitap okuma alanları ve ücretsiz ikramlar sunan kültür merkezi.",
                    Adres = "Millet Bahçesi içi, Adapazarı/Sakarya",
                    Telefon = "0264 272 00 15",
                    ResimUrl = "/images/millet-kiraathanesi.png",
                    KonumUrl = "https://maps.google.com",
                    HaftaIciSaat = "09:00–23:00",
                    HaftaSonuSaat = "09:00–23:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Acarlar Longozu",
                    Kategori = "Doğa Parkı",
                    Renk = "#2E7D32",
                    Harf = "A",
                    Aciklama = "Eşsiz doğasıyla subasar ormanı yürüyüş ve seyir alanları.",
                    Adres = "Karasu/Sakarya",
                    Telefon = "0264 272 00 19",
                    ResimUrl = "/images/acarlar-longozu.png",
                    KonumUrl = "https://www.google.com/maps/place/Acarlar+Longozu",
                    HaftaIciSaat = "09:30–20:30",
                    HaftaSonuSaat = "09:30–20:30",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Kocaali Sosyal Tesisleri",
                    Kategori = "Sosyal Tesis",
                    Renk = "#1565C0",
                    Harf = "K",
                    Aciklama = "Denize sıfır konumu ve kadınlara özel plaj/sosyal alan hizmeti.",
                    Adres = "Kocaali Sahili, Kocaali/Sakarya",
                    Telefon = "0264 272 00 21",
                    ResimUrl = "/images/kocaali-sosyal-tesisleri.png",
                    KonumUrl = "https://www.google.com/maps/place/Kocaali+Kad%C4%B1nlar+Plaj%C4%B1",
                    HaftaIciSaat = "09:00–18:30",
                    HaftaSonuSaat = "09:00–18:30",
                    Aktif = true
                }
            );
        }

        context.SaveChanges();
    }
}
