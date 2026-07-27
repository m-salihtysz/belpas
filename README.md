# BELPAŞ Sosyal Tesisler ve Yönetim Paneli - Modernizasyon Projesi

Bu proje, Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ'ın kurumsal web sitesi ve sosyal tesisler yönetim platformudur. Sistem, **Frontend (Angular)**, **Backend (.NET 8.0 Web API)** ve **PostgreSQL Veri Tabanı** bileşenlerinden oluşur.

---

## Projeyi Çalıştırma Adımları

Sistemin tam olarak çalışabilmesi için sırasıyla **Veri Tabanı**, **Backend** ve **Frontend** bileşenlerini ayağa kaldırmanız gerekmektedir.

### 1. Veri Tabanını Çalıştırma (PostgreSQL)

Veri tabanı, Docker Compose kullanılarak izole bir şekilde ayağa kaldırılır.

* Projenin `backend` klasöründe terminali açın:
  ```bash
  cd backend
  docker compose up -d
  ```
* Bu komut, **Port 5433** üzerinde çalışan `belpas_postgres` isimli PostgreSQL konteynerini arka planda başlatacaktır.

---

### 2. API Sunucusunu Çalıştırma (.NET Core Web API)

Backend servislerinin ve veri tabanı entegrasyonunun çalışması için API sunucusu başlatılır.

* Terminalde `backend/src/Belpas.Api` dizinine gidin:
  ```bash
  cd backend/src/Belpas.Api
  ```
* Projeyi derleyin ve çalıştırın:
  ```bash
  dotnet run
  ```
* Sunucu ayağa kalktığında otomatik olarak veri tabanı göçlerini (migrations) kontrol edecek, tabloları kuracak ve `DbSeeder` sınıfı sayesinde ilk verileri (Tesisler, Haberler, Etkinlikler) otomatik olarak basacaktır.
* API dokümantasyonuna ve test arayüzüne tarayıcınızdan şu adresten ulaşabilirsiniz: [http://localhost:5000/swagger](http://localhost:5000/swagger)

> [!NOTE]
> macOS işletim sistemlerinde varsayılan AirPlay alıcısı 5000 portunu işgal edebilir. Sunucu başka bir portta açılırsa, frontend tarafındaki api endpoint tanımlarını kontrol edebilirsiniz.

---

### 3. Arayüzü Çalıştırma (Angular)

Frontend arayüzü modern Angular bileşenleriyle çalışır.

* Projenin **kök dizininde** terminali açın:
  ```bash
  npm install
  npm start
  ```
* Geliştirme sunucusu hazır olduğunda tarayıcınızdan şu adrese giderek uygulamayı görüntüleyebilirsiniz: [http://localhost:4200/](http://localhost:4200/)
