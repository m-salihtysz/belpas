# BELPAŞ — Sakarya Büyükşehir Belediyesi Sosyal Tesisler Web Platformu

> Sakarya Büyükşehir Belediyesi iştiraki **BELPAŞ A.Ş.**'nin kurumsal web sitesi ve sosyal tesisler bilgi platformu.  
> Modern Angular mimarisi, .NET 8 REST API ve PostgreSQL veritabanı üzerine inşa edilmiştir.

---

## 📌 Proje Hakkında

Bu platform; BELPAŞ bünyesindeki sosyal tesislerin, haberlerin, etkinliklerin ve satın alma ilanlarının kamuoyuyla paylaşıldığı kurumsal bir web uygulamasıdır.

**Öne çıkan özellikler:**

- 🏢 Sakarya genelindeki tüm BELPAŞ tesislerini listeler ve detaylarını gösterir
- 📰 Kurumsal haberler ve duyurular
- 📅 Etkinlik takvimi
- 🛒 Satın alma ilanları ve ihale bilgileri
- 📍 GPS ile en yakın tesis bulma
- 🔍 Akıllı arama (sayfa adı veya tesis/restoran adı yazılınca yönlendirir)
- 📱 Tam responsive tasarım, mobil menü desteği
- 🌐 SEO optimizasyonu (SSR, meta taglar, sitemap.xml, JSON-LD)

---

## 🛠️ Teknoloji Yığını

### Frontend
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| Angular | 22 | Standalone component mimarisi |
| Angular SSR | 22 | Sunucu taraflı render (SEO) |
| PrimeNG | 21 | UI bileşen kütüphanesi |
| PrimeFlex | 4 | Utility CSS (grid, flex, spacing) |
| PrimeIcons | 8 | İkon seti |
| TypeScript | 6 | Tip güvenli geliştirme |
| RxJS | 7.8 | Reaktif veri akışı |

### Backend
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| .NET | 8.0 | Web API framework |
| Entity Framework Core | 8.0 | ORM |
| Npgsql | 8.0 | PostgreSQL sürücüsü |
| Swagger / Swashbuckle | 6.5 | API dokümantasyonu |

### Veritabanı
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| PostgreSQL | 16 | İlişkisel veritabanı |
| Docker | - | Konteynerleştirme |

---

## 🗂️ Proje Klasör Yapısı

```
guncel/
├── src/                          # Angular kaynak kodu
│   └── app/
│       ├── components/
│       │   ├── header/           # Navbar, arama, mobil menü
│       │   └── footer/
│       ├── sayfalar/
│       │   ├── anasayfa/         # Hero slider, tesis & haber carousel'ları
│       │   ├── tesisler/         # Tesis listesi + GPS bulucu
│       │   │   └── tesis-detay/  # Tesis detay & dijital menü
│       │   ├── haberler/         # Haber listesi + detay
│       │   ├── etkinlikler/      # Etkinlik takvimi
│       │   ├── ihaleler/         # Satın alma alt sayfaları (4 adet)
│       │   ├── kurumsal/         # Hakkımızda, org şeması vb. (4 adet)
│       │   └── iletisim/
│       └── services/
│           ├── facility.service.ts   # Tesis API servisi
│           ├── news.service.ts       # Haber API servisi
│           ├── event.service.ts      # Etkinlik API servisi
│           └── seo.service.ts        # SEO meta tag üretici
│
└── backend/
    ├── docker-compose.yml        # PostgreSQL Docker ayarı
    └── src/Belpas.Api/
        ├── Controllers/          # 5 REST controller
        ├── Models/               # 4 veri modeli
        ├── Data/                 # DbContext + DbSeeder
        └── Migrations/           # EF Core migration dosyaları
```

---

## 🌐 API Endpoint'leri

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/Tesisler` | Tüm tesisleri listeler |
| GET | `/api/Tesisler/{id}` | Tekil tesis detayı |
| GET | `/api/Haberler` | Tüm haberleri listeler |
| GET | `/api/Haberler/{id}` | Tekil haber detayı |
| GET | `/api/Etkinlikler` | Etkinlik listesi |
| GET | `/api/Ihaleler` | İhale ilanları |
| GET | `/sitemap.xml` | SEO site haritası |

API'yi tarayıcıdan keşfetmek için: [http://localhost:5000/swagger](http://localhost:5000/swagger)

---

## 🚀 Kurulum ve Çalıştırma

Sistemin tam çalışabilmesi için sırasıyla **Veritabanı → Backend → Frontend** başlatılmalıdır.

### 1. Veritabanı (PostgreSQL + Docker)

```bash
cd backend
docker compose up -d
```

Bu komut, `belpas_postgres` adlı PostgreSQL konteynerini **port 5433**'te arka planda başlatır.  
Veriler kalıcı olarak `pgdata` Docker volume'unda saklanır.

---

### 2. Backend API (.NET 8)

```bash
cd backend/src/Belpas.Api
dotnet run
```

- Sunucu `http://localhost:5000` adresinde çalışır.
- İlk başlatmada `DbSeeder` otomatik devreye girer: tablolar oluşturulur, örnek veriler eklenir.
- Swagger arayüzü: [http://localhost:5000/swagger](http://localhost:5000/swagger)

> [!NOTE]
> macOS'ta AirPlay servisi 5000 portunu işgal edebilir. Bu durumda `appsettings.json` dosyasındaki port numarasını ve frontend servislerindeki `apiUrl` değerini güncellemeniz gerekir.

---

### 3. Frontend (Angular)

```bash
# Proje kök dizininde:
npm install
npm start
```

Uygulama `http://localhost:4200` adresinde açılır.

---

## 🔗 Sayfalar ve Rotalar

| URL | Sayfa |
|-----|-------|
| `/` | Ana Sayfa |
| `/tesisler` | Tesis Listesi |
| `/tesisler/:id` | Tesis Detayı |
| `/haberler` | Haberler |
| `/haberler/:id` | Haber Detayı |
| `/kurumsal/etkinlikler` | Etkinlikler |
| `/kurumsal/hakkimizda` | Hakkımızda |
| `/kurumsal/organizasyon-semasi` | Organizasyon Şeması |
| `/kurumsal/kurumsal-kimlik` | Kurumsal Kimlik |
| `/kurumsal/faaliyet-raporu` | Faaliyet Raporu |
| `/ihaleler/ilanlar` | Satın Alma İlanları |
| `/ihaleler/komisyon` | Satın Alma Komisyonu |
| `/ihaleler/kriterler` | Satın Alma Kriterleri |
| `/ihaleler/surec` | Satın Alma Süreci |
| `/iletisim` | İletişim |

---

## 🗄️ Veritabanı Bağlantı Bilgileri

| Parametre | Değer |
|-----------|-------|
| Host | `localhost` |
| Port | `5433` |
| Veritabanı | `belpas_db` |
| Kullanıcı | `belpas_user` |
| Şifre | `belpas_password123` |

---

## 📄 Lisans

Bu proje Sakarya Büyükşehir Belediyesi bünyesinde kurumsal kullanım amacıyla geliştirilmiştir.
