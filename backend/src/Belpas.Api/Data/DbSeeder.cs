using Belpas.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Belpas.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        context.Database.Migrate();

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
            new Tesis { Ad = "Ormanpark", Slug = "ormanpark", Aciklama = string.Empty, Harf = "O", ResimUrl = "/images/logolar/ormanpark.png" },
            new Tesis { Ad = "Ormanpark - Dört Mevsim", Slug = "ormanpark-dort-mevsim", Aciklama = string.Empty, Harf = "O", ResimUrl = "/images/logolar/ormanpark-dort-mevsim.png" },
            new Tesis { Ad = "Ormanpark - Sade Kahve", Slug = "ormanpark-sade-kahve", Aciklama = string.Empty, Harf = "O", ResimUrl = "/images/logolar/ormanpark-sade-kahve.png" },
            new Tesis { Ad = "Çark-ı Dem (Aziz Durak Parkı)", Slug = "cark-i-dem", Aciklama = string.Empty, Harf = "Ç", ResimUrl = "/images/logolar/cark-i-dem.png" },
            new Tesis { Ad = "Elegant Restoran", Slug = "elegant-restoran", Aciklama = string.Empty, Harf = "E", ResimUrl = "/images/logolar/elegant-restoran.png" },
            new Tesis { Ad = "Millet Kıraathanesi", Slug = "millet-kiraathanesi", Aciklama = string.Empty, Harf = "M", ResimUrl = "/images/logolar/millet-kiraathanesi.png" },
            new Tesis { Ad = "Yenikentpark", Slug = "yenikentpark", Aciklama = string.Empty, Harf = "Y", ResimUrl = "/images/logolar/yenikentpark.png" },
            new Tesis { Ad = "Karamanpark", Slug = "karamanpark", Aciklama = string.Empty, Harf = "K", ResimUrl = "/images/logolar/karamanpark.png" },
            new Tesis { Ad = "İl Ormanı Tabiat Parkı", Slug = "il-ormani-tabiat-parki", Aciklama = string.Empty, Harf = "İ", ResimUrl = "/images/logolar/il-ormani-tabiat-parki.png" },
            new Tesis { Ad = "Acarlar Longozu", Slug = "acarlar-longozu", Aciklama = string.Empty, Harf = "A", ResimUrl = "/images/logolar/acarlar-longozu.png" },
            new Tesis { Ad = "Pamukova Esentepepark", Slug = "pamukova-esentepepark", Aciklama = string.Empty, Harf = "P", ResimUrl = "/images/logolar/pamukova-esentepepark.png" },
            new Tesis { Ad = "Kocaali Sosyal Tesisleri", Slug = "kocaali-sosyal-tesisleri", Aciklama = string.Empty, Harf = "K", ResimUrl = "/images/logolar/kocaali-sosyal-tesisleri.png" },
            new Tesis { Ad = "Uçak Kıraathanesi", Slug = "ucak-kiraathanesi", Aciklama = string.Empty, Harf = "U", ResimUrl = "/images/logolar/ucak-kiraathanesi.png" },
            new Tesis { Ad = "Nehir Çikolata", Slug = "nehir-cikolata", Aciklama = string.Empty, Harf = "N", ResimUrl = "/images/logolar/nehir-cikolata.png" },
            new Tesis { Ad = "Vagon Kıraathanesi", Slug = "vagon-kiraathanesi", Aciklama = string.Empty, Harf = "V", ResimUrl = "/images/logolar/vagon-kiraathanesi.png" },
            new Tesis { Ad = "Söğütlü Bahçem Kafe", Slug = "sogutlu-bahcem-kafe", Aciklama = string.Empty, Harf = "S", ResimUrl = "/images/logolar/sogutlu-bahcem-kafe.png" },
            new Tesis { Ad = "Bahçem Market", Slug = "bahcem-market", Aciklama = string.Empty, Harf = "B", ResimUrl = "/images/logolar/bahcem-market.png" },
            new Tesis { Ad = "Çay Dünyası (Şemsiyelipark)", Slug = "cay-dunyasi", Aciklama = string.Empty, Harf = "Ç", ResimUrl = "/images/logolar/cay-dunyasi.png" },
            new Tesis { Ad = "Kampüs Mutfak", Slug = "kampus-mutfak", Aciklama = string.Empty, Harf = "K", ResimUrl = "/images/logolar/kampus-mutfak.png" },
            new Tesis { Ad = "Kampüs Öğrenci Lokantası", Slug = "kampus-ogrenci-lokantasi", Aciklama = string.Empty, Harf = "K", ResimUrl = "/images/logolar/kampus-ogrenci-lokantasi.png" },
            new Tesis { Ad = "Erenler Kafe", Slug = "erenler-kafe", Aciklama = string.Empty, Harf = "E", ResimUrl = "/images/logolar/erenler-kafe.png" },
            new Tesis { Ad = "Geyve Belpaş Kafe", Slug = "geyve-belpas-kafe", Aciklama = string.Empty, Harf = "G", ResimUrl = "/images/logolar/geyve-belpas-kafe.png" },
            new Tesis { Ad = "Belpaş Akaryakıt İstasyonu", Slug = "belpas-akaryakit-istasyonu", Aciklama = string.Empty, Harf = "B", ResimUrl = "/images/logolar/belpas-akaryakit-istasyonu.png" },
            new Tesis { Ad = "Park54", Slug = "park54", Aciklama = string.Empty, Harf = "P", ResimUrl = "/images/logolar/park54.png" },
            new Tesis { Ad = "Kart54", Slug = "kart54", Aciklama = string.Empty, Harf = "K", ResimUrl = "/images/logolar/kart54.png" },
            new Tesis { Ad = "Merkez - Katlı Otopark", Slug = "merkez-katli-otopark", Aciklama = string.Empty, Harf = "M", ResimUrl = "/images/logolar/merkez-katli-otopark.png" },
            new Tesis { Ad = "Hastane - Katlı Otopark", Slug = "hastane-katli-otopark", Aciklama = string.Empty, Harf = "H", ResimUrl = "/images/logolar/hastane-katli-otopark.png" },
            new Tesis { Ad = "Geyve - Safibey Pazar Alanı", Slug = "geyve-safibey-pazar-alani", Aciklama = string.Empty, Harf = "G", ResimUrl = "/images/logolar/geyve-safibey-pazar-alani.png" },
            new Tesis { Ad = "Maden Deresi", Slug = "maden-deresi", Aciklama = string.Empty, Harf = "M", ResimUrl = "/images/logolar/maden-deresi.png" },
            new Tesis { Ad = "Balevi - Bal54", Slug = "balevi", Aciklama = string.Empty, Harf = "B", ResimUrl = "/images/logolar/balevi.png" },
            new Tesis { Ad = "Belpaş Yöresel Ürünler", Slug = "belpas-yoresel-urunler", Aciklama = string.Empty, Harf = "B", ResimUrl = "/images/logolar/belpas-yoresel-urunler.png" },
            new Tesis { Ad = "Ormanpark Yöresel Ürünler", Slug = "ormanpark-yoresel-urunler", Aciklama = string.Empty, Harf = "O", ResimUrl = "/images/logolar/ormanpark-yoresel-urunler.png" },
            new Tesis { Ad = "Hafriyat Sahaları", Slug = "hafriyat-sahalari", Aciklama = string.Empty, Harf = "H", ResimUrl = "/images/logolar/hafriyat-sahalari.png" },
            new Tesis { Ad = "SGM Büfe", Slug = "sgm-bufe", Aciklama = string.Empty, Harf = "S", ResimUrl = "/images/logolar/sgm-bufe.png" },
            new Tesis { Ad = "Millet Bahçesi Büfe", Slug = "millet-bahcesi-bufe", Aciklama = string.Empty, Harf = "M", ResimUrl = "/images/logolar/millet-bahcesi-bufe.png" },
            new Tesis { Ad = "Yenikent Sosyal Tesisleri", Slug = "yenikent-sosyal-tesisleri", Aciklama = string.Empty, Harf = "Y", ResimUrl = "/images/logolar/yenikent-sosyal-tesisleri.png" },
            new Tesis { Ad = "Asfalt Şantiyesi", Slug = "asfalt-santiyesi", Aciklama = string.Empty, Harf = "A" }
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
