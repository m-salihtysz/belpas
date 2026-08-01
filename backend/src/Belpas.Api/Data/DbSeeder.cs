using Belpas.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Belpas.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        try
        {
            context.Database.Migrate();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[DbSeeder] Migration notice: {ex.Message}");
        }

        // 1. Haberler Seeding
        if (context.Haberler.Any())
        {
            context.Haberler.RemoveRange(context.Haberler);
            context.SaveChanges();
        }

        context.Haberler.AddRange(
            new Haber
            {
                Baslik = "Nehir Çikolata'da Dubai Lezzeti Kampanyası Başladı",
                Slug = "nehir-cikolatada-dubai-lezzeti-kampanyasi-basladi",
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
                Slug = "sakarya-buyuksehir-kent-rehberi-guncellendi",
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
                Slug = "yentkent-pazarinda-yaz-festivali",
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
                Slug = "belpasta-kartli-odeme-donemi-1-temmuzda-basliyor",
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
                Slug = "kocaali-sosyal-tesislerimiz-yeni-sezonda-misafirlerini-agirlamaya-basladi",
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
                Slug = "acarlar-longozu-baharda-da-dogaseverlerin-gozdesi-olmaya-devam-ediyor",
                Kategori = "Haber",
                Ozet = "Sakarya Büyükşehir Belediyesi işletmesindeki Acarlar Longozu, baharla birlikte canlanan doğası ve eşsiz manzarasıyla ziyaretçilerini ağırlamaya devam ediyor.",
                Icerik = "Dünyanın tek parça en büyük subasar ormanlarından biri olan Acarlar Longozu, yeni sezonda da doğa ile baş başa kalmak isteyenlerin ilk tercihi oluyor.",
                ResimUrl = "/images/ihale2.jpg",
                OlusturmaTarihi = DateTime.UtcNow.AddDays(-15),
                Aktif = true
            }
        );
        context.SaveChanges();

        // 2. Tesisler Seeding
        if (context.Tesisler.Any())
        {
            context.Tesisler.RemoveRange(context.Tesisler);
            context.SaveChanges();
        }

        context.Tesisler.AddRange(
            // Restoran, Kafe ve Sosyal Tesisler
            new Tesis { Ad = "Ormanpark", Slug = "ormanpark", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "O", LogoUrl = "/images/logolar/ormanpark.png", ResimUrl = "/images/tesisler/ormanpark.jpg", MenuPdfUrl = "/documents/ormanpark-menu.pdf", MenuGorselUrl = "/images/menuler/ormanpark-menu.png" },
            new Tesis { Ad = "Ormanpark - Dört Mevsim", Slug = "ormanpark-dort-mevsim", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "O", LogoUrl = "/images/logolar/ormanpark-dort-mevsim.png", ResimUrl = "/images/tesisler/ormanpark-dort-mevsim.jpg", MenuPdfUrl = "/documents/ormanpark-dort-mevsim-menu.pdf", MenuGorselUrl = "/images/menuler/ormanpark-dort-mevsim-menu.png" },
            new Tesis { Ad = "Ormanpark - Sade Kahve", Slug = "ormanpark-sade-kahve", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "O", LogoUrl = "/images/logolar/ormanpark-sade-kahve.png", ResimUrl = "/images/tesisler/ormanpark-sade-kahve.jpg", MenuPdfUrl = "/documents/ormanpark-sade-kahve-menu.pdf", MenuGorselUrl = "/images/menuler/ormanpark-sade-kahve-menu.png" },
            new Tesis { Ad = "Çark-ı Dem (Aziz Durak Parkı)", Slug = "cark-i-dem", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "Ç", LogoUrl = "/images/logolar/cark-i-dem.png", ResimUrl = "/images/tesisler/cark-i-dem.jpg", MenuPdfUrl = "/documents/cark-i-dem-menu.pdf", MenuGorselUrl = "/images/menuler/cark-i-dem-menu.png" },
            new Tesis { Ad = "Elegant Restoran", Slug = "elegant-restoran", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "E", LogoUrl = "/images/logolar/elegant-restoran.png", ResimUrl = "/images/tesisler/elegant-restoran.jpg", MenuPdfUrl = "/documents/elegant-restoran-menu.pdf", MenuGorselUrl = "/images/menuler/elegant-restoran-menu.png" },
            new Tesis { Ad = "Millet Kıraathanesi", Slug = "millet-kiraathanesi", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "M", LogoUrl = "/images/logolar/millet-kiraathanesi.png", ResimUrl = "/images/tesisler/millet-kiraathanesi.jpg", MenuPdfUrl = "/documents/millet-kiraathanesi-menu.pdf", MenuGorselUrl = "/images/menuler/millet-kiraathanesi-menu.png" },
            new Tesis { Ad = "Yenikentpark", Slug = "yenikentpark", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "Y", LogoUrl = "/images/logolar/yenikentpark.png", ResimUrl = "/images/tesisler/yenikentpark.webp", MenuPdfUrl = "/documents/yenikentpark-menu.pdf", MenuGorselUrl = "/images/menuler/yenikentpark-menu.png" },
            new Tesis { Ad = "Karamanpark", Slug = "karamanpark", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "K", LogoUrl = "/images/logolar/karamanpark.png", ResimUrl = "/images/tesisler/karamanpark.jpg", MenuPdfUrl = "/documents/karamanpark-menu.pdf", MenuGorselUrl = "/images/menuler/karamanpark-menu.png" },
            new Tesis { Ad = "İl Ormanı Tabiat Parkı", Slug = "il-ormani-tabiat-parki", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "İ", LogoUrl = "/images/logolar/il-ormani-tabiat-parki.png", ResimUrl = "/images/tesisler/il-ormani-tabiat-parki.jpg", MenuPdfUrl = "/documents/il-ormani-tabiat-parki-menu.pdf", MenuGorselUrl = "/images/menuler/il-ormani-tabiat-parki-menu.png" },
            new Tesis { Ad = "Acarlar Longozu", Slug = "acarlar-longozu", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "A", LogoUrl = "/images/logolar/acarlar-longozu.png", ResimUrl = "/images/tesisler/acarlar-longozu.jpg", MenuPdfUrl = "/documents/acarlar-longozu-menu.pdf", MenuGorselUrl = "/images/menuler/acarlar-longozu-menu.png" },
            new Tesis { Ad = "Pamukova Esentepepark", Slug = "pamukova-esentepepark", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "P", LogoUrl = "/images/logolar/pamukova-esentepepark.png", ResimUrl = "/images/tesisler/pamukova-esentepepark.jpg", MenuPdfUrl = "/documents/pamukova-esentepepark-menu.pdf", MenuGorselUrl = "/images/menuler/pamukova-esentepepark-menu.png" },
            new Tesis { Ad = "Uçak Kıraathanesi", Slug = "ucak-kiraathanesi", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "U", LogoUrl = "/images/logolar/ucak-kiraathanesi.png", ResimUrl = "/images/tesisler/ucak-kiraathanesi.jpg", MenuPdfUrl = "/documents/ucak-kiraathanesi-menu.pdf", MenuGorselUrl = "/images/menuler/ucak-kiraathanesi-menu.png" },
            new Tesis { Ad = "Nehir Çikolata", Slug = "nehir-cikolata", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "N", LogoUrl = "/images/logolar/nehir-cikolata.png", ResimUrl = "/images/tesisler/nehir-cikolata.jpg", MenuPdfUrl = "/documents/nehir-cikolata-menu.pdf", MenuGorselUrl = "/images/menuler/nehir-cikolata-menu.png" },
            new Tesis { Ad = "Vagon Kıraathanesi", Slug = "vagon-kiraathanesi", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "V", LogoUrl = "/images/logolar/vagon-kiraathanesi.png", ResimUrl = "/images/tesisler/vagon-kiraathanesi.jpg", MenuPdfUrl = "/documents/vagon-kiraathanesi-menu.pdf", MenuGorselUrl = "/images/menuler/vagon-kiraathanesi-menu.png" },
            new Tesis { Ad = "Söğütlü Bahçem Kafe", Slug = "sogutlu-bahcem-kafe", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "S", LogoUrl = "/images/logolar/sogutlu-bahcem-kafe.png", ResimUrl = "/images/tesisler/sogutlu-bahcem-kafe.jpg", MenuPdfUrl = "/documents/sogutlu-bahcem-kafe-menu.pdf", MenuGorselUrl = "/images/menuler/sogutlu-bahcem-kafe-menu.png" },
            new Tesis { Ad = "Erenler Kafe", Slug = "erenler-kafe", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "E", LogoUrl = "/images/logolar/erenler-kafe.png", ResimUrl = "/images/tesisler/erenler-kafe.jpg" },
            new Tesis { Ad = "Kampüs Mutfak", Slug = "kampus-mutfak", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "K", LogoUrl = "/images/logolar/kampus-mutfak.png", ResimUrl = "/images/tesisler/kampus-mutfak.webp" },
            new Tesis { Ad = "Kampüs Öğrenci Lokantası", Slug = "kampus-ogrenci-lokantasi", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "K", LogoUrl = "/images/logolar/kampus-ogrenci-lokantasi.png", ResimUrl = "/images/tesisler/kampus-ogrenci-lokantasi.png" },
            new Tesis { Ad = "Geyve Belpaş Kafe", Slug = "geyve-belpas-kafe", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "G", LogoUrl = "/images/logolar/geyve-belpas-kafe.png", ResimUrl = "/images/tesisler/geyve-belpas-kafe.png" },
            new Tesis { Ad = "Çay Dünyası (Şemsiyelipark)", Slug = "cay-dunyasi", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "Ç", LogoUrl = "/images/logolar/cay-dunyasi.png", ResimUrl = "/images/tesisler/cay-dunyasi.webp" },
            new Tesis { Ad = "SGM Büfe", Slug = "sgm-bufe", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "S", LogoUrl = "/images/logolar/sgm-bufe.png", ResimUrl = "/images/tesisler/sgm-bufe.png" },
            new Tesis { Ad = "Millet Bahçesi Büfe", Slug = "millet-bahcesi-bufe", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "M", LogoUrl = "/images/logolar/millet-bahcesi-bufe.png", ResimUrl = "/images/tesisler/millet-bahcesi-bufe.png" },
            new Tesis { Ad = "Yenikent Sosyal Tesisleri", Slug = "yenikent-sosyal-tesisleri", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "Y", LogoUrl = "/images/logolar/yenikent-sosyal-tesisleri.png", ResimUrl = "/images/tesisler/yenikent-sosyal-tesisleri.png" },
            new Tesis { Ad = "Kocaali Sosyal Tesisleri", Slug = "kocaali-sosyal-tesisleri", Kategori = "Restoran & Kafe", Aciklama = string.Empty, Harf = "K", LogoUrl = "/images/logolar/kocaali-sosyal-tesisleri.png", ResimUrl = "/images/tesisler/kocaali-sosyal-tesisleri.jpg" },
            
            // Satış Noktaları ve Yöresel Ürünler
            new Tesis { Ad = "Bahçem Market", Slug = "bahcem-market", Kategori = "Yöresel Ürünler", Aciklama = string.Empty, Harf = "B", LogoUrl = "/images/logolar/bahcem-market.png", ResimUrl = "/images/tesisler/bahcem-market.jpg" },
            new Tesis { Ad = "Balevi - Bal54", Slug = "balevi", Kategori = "Yöresel Ürünler", Aciklama = string.Empty, Harf = "B", LogoUrl = "/images/logolar/balevi.png", ResimUrl = "/images/tesisler/balevi.png" },
            new Tesis { Ad = "Belpaş Yöresel Ürünler", Slug = "belpas-yoresel-urunler", Kategori = "Yöresel Ürünler", Aciklama = string.Empty, Harf = "B", LogoUrl = "/images/logolar/belpas-yoresel-urunler.png", ResimUrl = "/images/tesisler/belpas-yoresel-urunler.png" },
            new Tesis { Ad = "Ormanpark Yöresel Ürünler", Slug = "ormanpark-yoresel-urunler", Kategori = "Yöresel Ürünler", Aciklama = string.Empty, Harf = "O", LogoUrl = "/images/logolar/ormanpark-yoresel-urunler.png", ResimUrl = "/images/tesisler/ormanpark-yoresel-urunler.png" },
            
            // Ulaşım, Otopark ve Altyapı/Hizmet Birimleri
            new Tesis { Ad = "Kart54", Slug = "kart54", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "K", LogoUrl = "/images/logolar/kart54.png", ResimUrl = "/images/tesisler/kart54.png" },
            new Tesis { Ad = "Park54", Slug = "park54", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "P", LogoUrl = "/images/logolar/park54.png", ResimUrl = "/images/tesisler/park54.jpg" },
            new Tesis { Ad = "Belpaş Akaryakıt İstasyonu", Slug = "belpas-akaryakit-istasyonu", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "B", LogoUrl = "/images/logolar/belpas-akaryakit-istasyonu.png", ResimUrl = "/images/tesisler/belpas-akaryakit-istasyonu.png" },
            new Tesis { Ad = "Merkez - Katlı Otopark", Slug = "merkez-katli-otopark", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "M", LogoUrl = "/images/logolar/merkez-katli-otopark.png", ResimUrl = "/images/tesisler/merkez-katli-otopark.png" },
            new Tesis { Ad = "Hastane - Katlı Otopark", Slug = "hastane-katli-otopark", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "H", LogoUrl = "/images/logolar/hastane-katli-otopark.png", ResimUrl = "/images/tesisler/hastane-katli-otopark.png" },
            new Tesis { Ad = "Geyve - Safibey Pazar Alanı", Slug = "geyve-safibey-pazar-alani", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "G", LogoUrl = "/images/logolar/geyve-safibey-pazar-alani.png", ResimUrl = "/images/tesisler/geyve-safibey-pazar-alani.png" },
            new Tesis { Ad = "Maden Deresi", Slug = "maden-deresi", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "M", LogoUrl = "/images/logolar/maden-deresi.png", ResimUrl = "/images/tesisler/maden-deresi.png" },
            new Tesis { Ad = "Hafriyat Sahaları", Slug = "hafriyat-sahalari", Kategori = "Ulaşım & Otopark", Aciklama = string.Empty, Harf = "H", LogoUrl = "/images/logolar/hafriyat-sahalari.png", ResimUrl = "/images/tesisler/hafriyat-sahalari.png" }
        );

            context.SaveChanges();

        // 4. Etkinlikler Seeding
        if (!context.Etkinlikler.Any())
        {
            context.Etkinlikler.AddRange(
                new Etkinlik
                {
                    Baslik = "Millet Kıraathanesi Gençlik & Yazar Söyleşisi",
                    Kategori = "Kültür & Sanat",
                    Ozet = "Ünlü araştırmacı yazarlarımızın katılımıyla gerçekleşecek olan imza günü ve gençlik söyleşisi.",
                    Detay = "Sakarya Millet Bahçesi içerisindeki Millet Kıraathanemizde düzenlenecek bu özel etkinlikte kitap tahlili, yazar söyleşisi ve katılımcılara ücretsiz çay ikramı yapılacaktır.",
                    Tarih = "1 Ağustos 2026",
                    Saat = "19:00",
                    Konum = "Sakarya Millet Bahçesi Kıraathanesi",
                    ResimUrl = "/images/millet-kiraathanesi.png",
                    Kontenjan = "150 Kişi",
                    Ucretsiz = true,
                    Populer = true
                },
                new Etkinlik
                {
                    Baslik = "Ormanpark Doğa Yürüyüşü & Serpme Kahvaltı Buluşması",
                    Kategori = "Doğa & Spor",
                    Ozet = "Asırlık çınar ağaçları altında sabah doğa yürüyüşü ve ardından leziz serpme kahvaltı.",
                    Detay = "Ormanpark tesislerimizin eşsiz doğasında temiz hava eşliğinde yürüyüşümüz saat 09:00 da başlayacak, ardından tesis bahçemizde kahvaltı ikramı sunulacaktır.",
                    Tarih = "3 Ağustos 2026",
                    Saat = "09:00",
                    Konum = "Ormanpark Tesis Bahçesi",
                    ResimUrl = "/images/ormanpark.png",
                    Kontenjan = "200 Kişi",
                    Ucretsiz = false,
                    Populer = true
                },
                new Etkinlik
                {
                    Baslik = "Acarlar Longozu Fotoğrafçılık & Tabiat Gezisi",
                    Kategori = "Doğa & Spor",
                    Ozet = "Türkiye’nin en büyük subasar ormanında profesyonel fotoğrafçılarla doğa keşif rotası.",
                    Detay = "Karasu Acarlar Longozu yürüyüş yolunda rehber eşliğinde flora ve fauna gözlemi yapılıp, ahşap seyir terasında fotoğraf atölyesi gerçekleştirilecektir.",
                    Tarih = "5 Ağustos 2026",
                    Saat = "10:30",
                    Konum = "Acarlar Longozu Tesis Alanı",
                    ResimUrl = "/images/acarlar-longozu.png",
                    Kontenjan = "80 Kişi",
                    Ucretsiz = true,
                    Populer = false
                },
                new Etkinlik
                {
                    Baslik = "Kocaali Sahili Çocuk Açık Hava Sinema Etkinliği",
                    Kategori = "Çocuk & Aile",
                    Ozet = "Mavi bayraklı Kocaali sahil tesislerimizde çocuklar için patlamış mısır eşliğinde açık hava sineması.",
                    Detay = "Kadınlar ve aileler plaj alanında akşam gün batımıyla birlikte dev perdede eğlenceli animasyon çizgi film gösterimi sunulacaktır.",
                    Tarih = "8 Ağustos 2026",
                    Saat = "20:30",
                    Konum = "Kocaali Sosyal Tesisleri Sahil Etkinlik Alanı",
                    ResimUrl = "/images/kocaali-sosyal-tesisleri.png",
                    Kontenjan = "Açık Alan",
                    Ucretsiz = true,
                    Populer = true
                },
                new Etkinlik
                {
                    Baslik = "Nehir Kafeterya Akustik Canlı Müzik Dinletisi",
                    Kategori = "Kültür & Sanat",
                    Ozet = "Sakarya Nehri kıyısında ney ve gitar eşliğinde akustik müzik dinletisi.",
                    Detay = "Sakarya Park içerisinde yer alan Nehir Kafeteryamızda nehir manzarasına karşı dinlendirici canlı müzik performansı.",
                    Tarih = "12 Ağustos 2026",
                    Saat = "20:00",
                    Konum = "Nehir Kafeterya Tesisleri (Erenler)",
                    ResimUrl = "/images/nehir-kafeterya.png",
                    Kontenjan = "Tesis Kapasitesi",
                    Ucretsiz = true,
                    Populer = false
                }
            );

            context.SaveChanges();
        }
    }
}
