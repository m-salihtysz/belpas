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

        // 2. Tesisler Seeding (Remove old records to force refresh rich data and green colors)
        if (context.Tesisler.Any())
        {
            context.Tesisler.RemoveRange(context.Tesisler);
            context.SaveChanges();
        }

        context.Tesisler.AddRange(
                new Tesis
                {
                    Ad = "Çay Dünyası",
                    Kategori = "Kafeterya",
                    Renk = "#10B981",
                    Harf = "Ç",
                    Aciklama = "Kent Park'ın eşsiz doğası içinde yer alan Çay Dünyası; taze demlenmiş çay çeşitleri, taze sıkılmış meyve suları ve özel fırın lezzetleriyle Sakaryalıların en sevdiği dinlenme noktasıdır.",
                    Adres = "Atatürk Bulvarı, Kent Park İçi, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 10",
                    ResimUrl = "/images/cay-dunyasi.png",
                    KonumUrl = "https://maps.google.com/?q=Kent+Park+Adapazari",
                    HaftaIciSaat = "08:30–23:00",
                    HaftaSonuSaat = "08:30–23:30",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Yentkent",
                    Kategori = "Pazar & Sosyal Alan",
                    Renk = "#059669",
                    Harf = "Y",
                    Aciklama = "Yenikent bölgesinde halkımıza kaliteli, hijyenik ve ekonomik alışveriş ile dinlenme imkanı sunan Belpaş kapalı sosyal ve ticari alan tesisi.",
                    Adres = "Yenikent Şehir Parkı Yanı, Camili / Adapazarı / Sakarya",
                    Telefon = "0264 272 00 11",
                    ResimUrl = "/images/yentkent.png",
                    KonumUrl = "https://maps.google.com/?q=Camili+Adapazari",
                    HaftaIciSaat = "08:00–20:00",
                    HaftaSonuSaat = "08:00–20:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "P Market",
                    Kategori = "Tanzim Satış & Market",
                    Renk = "#047857",
                    Harf = "P",
                    Aciklama = "Belpaş tanzim satış ve süpermarket noktası. Sakarya'nın yerel lezzetleri, kooperatif ürünleri ve temel gıda ihtiyaçları doğrudan üreticiden en uygun fiyatlarla sunulmaktadır.",
                    Adres = "Gar Meydanı Yanı, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 13",
                    ResimUrl = "/images/p-market.png",
                    KonumUrl = "https://maps.google.com/?q=Gar+Meydani+Adapazari",
                    HaftaIciSaat = "08:00–21:00",
                    HaftaSonuSaat = "08:00–21:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Nehir Kafeterya",
                    Kategori = "Kafeterya & Restoran",
                    Renk = "#065F46",
                    Harf = "N",
                    Aciklama = "Sakarya Nehri'nin kıyısında, muazzam nehir manzarası eşliğinde leziz kahvaltılar, çay/kahve molaları ve çocuk oyun alanlarıyla ailece vakit geçirilecek ferah tesis.",
                    Adres = "Sakarya Park İçi, Erenler / Sakarya",
                    Telefon = "0264 272 00 16",
                    ResimUrl = "/images/nehir-kafeterya.png",
                    KonumUrl = "https://maps.google.com/?q=Sakarya+Park+Erenler",
                    HaftaIciSaat = "09:00–23:30",
                    HaftaSonuSaat = "09:00–23:30",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "İznik Kiralama",
                    Kategori = "Rekreasyon & Kiralama",
                    Renk = "#10B981",
                    Harf = "İ",
                    Aciklama = "Şehir içi rekreasyon alanlarında bisiklet, akülü araçlar ve açık alan eğlence ekipmanları kiralama hizmeti sunan Belpaş sosyal aktivite noktası.",
                    Adres = "Çark Caddesi Sonu, Kent Park Girişi, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 17",
                    ResimUrl = "/images/iznik-kiralama.png",
                    KonumUrl = "https://maps.google.com/?q=Cark+Caddesi+Adapazari",
                    HaftaIciSaat = "09:00–21:00",
                    HaftaSonuSaat = "09:00–21:30",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Meclis Kafeteryası",
                    Kategori = "Kafeterya",
                    Renk = "#047857",
                    Harf = "M",
                    Aciklama = "Sakarya Büyükşehir Belediyesi hizmet binası içerisinde vatandaşlarımıza, meclis üyelerimize ve personelimize kaliteli aperatif ve içecek sunan nezih mekan.",
                    Adres = "Büyükşehir Belediyesi Hizmet Binası, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 18",
                    ResimUrl = "/images/meclis.png",
                    KonumUrl = "https://maps.google.com/?q=Sakarya+Buyuksehir+Belediyesi",
                    HaftaIciSaat = "08:00–18:00",
                    HaftaSonuSaat = "Kapalı",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Büfe",
                    Kategori = "Hızlı Gıda & Büfe",
                    Renk = "#059669",
                    Harf = "B",
                    Aciklama = "Şehrin merkezinde, Demokrasi Meydanı'nda taze tost, sandviç, çay, kahve ve meşrubat çeşitleriyle hızlı, güvenilir ve ekonomik hizmet noktası.",
                    Adres = "Demokrasi Meydanı, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 20",
                    ResimUrl = "/images/bufe.png",
                    KonumUrl = "https://maps.google.com/?q=Demokrasi+Meydani+Adapazari",
                    HaftaIciSaat = "07:30–22:00",
                    HaftaSonuSaat = "07:30–22:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Ormanpark",
                    Kategori = "Kafeterya & Restoran",
                    Renk = "#10B981",
                    Harf = "O",
                    Aciklama = "Asırlık çınar ve meşe ağaçlarının gölgesinde zengin serpme kahvaltısı, ızgara çeşitleri ve ferah bahçesiyle Sakarya'nın en sevilen simge sosyal tesisi.",
                    Adres = "Adnan Menderes Cd., Adapazarı / Sakarya",
                    Telefon = "0264 272 00 12",
                    ResimUrl = "/images/ormanpark.png",
                    KonumUrl = "https://maps.app.goo.gl/23nK4hfzZ3nYYxP68",
                    HaftaIciSaat = "08:30–23:00",
                    HaftaSonuSaat = "08:30–23:30",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Elegant Restoran",
                    Kategori = "Seçkin Restoran",
                    Renk = "#047857",
                    Harf = "E",
                    Aciklama = "Seçkin şeflerin hazırladığı özel et menüleri, şık atmosferi, VIP toplantı odaları ve yüksek hizmet kalitesiyle prestijli lezzet durağı.",
                    Adres = "Donatım Park İçi, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 14",
                    ResimUrl = "/images/elegant-restoran.png",
                    KonumUrl = "https://maps.google.com/?q=Donatim+Park+Adapazari",
                    HaftaIciSaat = "10:00–23:00",
                    HaftaSonuSaat = "10:00–23:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Millet Kıraathanesi",
                    Kategori = "Kültür & Kütüphane",
                    Renk = "#059669",
                    Harf = "M",
                    Aciklama = "Binlerce kitaplık zengin kütüphanesi, sessiz çalışma alanları, hızlı interneti ve ücretsiz ikramlarıyla gençlerimizin ve araştırmacılarımızın buluşma noktası.",
                    Adres = "Millet Bahçesi İçi, Adapazarı / Sakarya",
                    Telefon = "0264 272 00 15",
                    ResimUrl = "/images/millet-kiraathanesi.png",
                    KonumUrl = "https://maps.google.com/?q=Millet+Bahcesi+Adapazari",
                    HaftaIciSaat = "08:00–24:00",
                    HaftaSonuSaat = "08:00–24:00",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Acarlar Longozu",
                    Kategori = "Doğa Parkı & Tesis",
                    Renk = "#065F46",
                    Harf = "A",
                    Aciklama = "Türkiye'nin tek parça halindeki en büyük subasar ormanında, ahşap yürüyüş yolları, seyir terasları ve doğa kafeteryasıyla eşsiz bir tabiat deneyimi.",
                    Adres = "Denizköy Mahallesi, Karasu / Sakarya",
                    Telefon = "0264 272 00 19",
                    ResimUrl = "/images/acarlar-longozu.png",
                    KonumUrl = "https://www.google.com/maps/place/Acarlar+Longozu",
                    HaftaIciSaat = "08:30–20:30",
                    HaftaSonuSaat = "08:30–20:30",
                    Aktif = true
                },
                new Tesis
                {
                    Ad = "Kocaali Sosyal Tesisleri",
                    Kategori = "Plaj & Sosyal Tesis",
                    Renk = "#10B981",
                    Harf = "K",
                    Aciklama = "Mavi bayraklı Kocaali sahilinde kadınlarımıza ve çocuklarına özel plaj, şezlonglar, giyinme kabinleri, kafeterya ve restoran hizmeti sunan tatil tesisi.",
                    Adres = "Alandere Mahallesi Sahil Cd., Kocaali / Sakarya",
                    Telefon = "0264 272 00 21",
                    ResimUrl = "/images/kocaali-sosyal-tesisleri.png",
                    KonumUrl = "https://www.google.com/maps/place/Kocaali+Kad%C4%B1nlar+Plaj%C4%B1",
                    HaftaIciSaat = "08:30–19:30",
                    HaftaSonuSaat = "08:30–19:30",
                    Aktif = true
                }
            );

            context.SaveChanges();
    }
}
