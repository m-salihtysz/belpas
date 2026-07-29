import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItem {
  id: number;
  ad: string;
  aciklama?: string;
  fiyat: number;
  resimUrl?: string;
  populer?: boolean;
}

export interface MenuKategori {
  id: number;
  baslik: string;
  ikon?: string;
  urunler: MenuItem[];
}

export interface Tesis {
  id: number;
  ad: string;
  slug?: string;
  kategori: string;
  renk: string;
  harf: string;
  aciklama: string;
  adres: string;
  telefon: string;
  resimUrl: string;
  logoUrl?: string;
  menuPdfUrl?: string;
  menuGorselUrl?: string;
  konumUrl: string;
  haftaIciSaat: string;
  haftaSonuSaat: string;
  lat?: number;
  lng?: number;
  menuKategorileri?: MenuKategori[];
  aktif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/Tesisler';

  getTesisler(): Observable<Tesis[]> {
    return this.http.get<Tesis[]>(this.apiUrl);
  }

  getTesis(idOrSlug: string | number): Observable<Tesis> {
    return this.http.get<Tesis>(`${this.apiUrl}/${idOrSlug}`);
  }

  // Digital Menu Generator for Facilities (Tesis Tipine Göre Özelleştirilmiş Menü)
  getMockMenuForFacility(tesisId: number, slug?: string, kategori?: string): MenuKategori[] {
    if (kategori && kategori !== 'Restoran & Kafe') {
      return [];
    }
    const s = (slug || '').toLowerCase();

    // 1. NEHİR ÇİKOLATA
    if (s.includes('nehir-cikolata')) {
      return [
        {
          id: 1,
          baslik: 'Özel Çikolata Çeşitleri',
          ikon: 'pi-star',
          urunler: [
            { id: 101, ad: 'Orijinal Dubai Çikolatası (Special)', aciklama: 'Kadayır ve antep fıstığı dolgulu sütlü çikolata.', fiyat: 180, populer: true },
            { id: 102, ad: 'Antep Fıstıklı Special Tablet', aciklama: 'Taze fıstık taneli el yapımı çikolata.', fiyat: 150, populer: true },
            { id: 103, ad: 'Fındık Pralinli Çikolata Kutusu', aciklama: 'Sakarya fındıklı özel pralin çikolata.', fiyat: 220 },
            { id: 104, ad: 'Meyveli Truff Çeşitleri', aciklama: 'Çilekli, böğürtlenli ve frambuazlı dolgu.', fiyat: 140 }
          ]
        },
        {
          id: 2,
          baslik: 'Kahve & Sıcak İçecekler',
          ikon: 'pi-coffee',
          urunler: [
            { id: 201, ad: 'Bardak Çay', aciklama: 'Taze demlenmiş çay.', fiyat: 15 },
            { id: 202, ad: 'Fincan Çay', aciklama: 'Özel fincanda demlik çay.', fiyat: 30 },
            { id: 203, ad: 'Türk Kahvesi', aciklama: 'Közde demlenmiş geleneksel kahve.', fiyat: 85, populer: true },
            { id: 204, ad: 'Damla Sakızlı Türk Kahvesi', aciklama: 'Özel damla sakızı aromalı.', fiyat: 90 },
            { id: 205, ad: 'Dibek Kahvesi', aciklama: 'Yumuşak içimli özel havan kahvesi.', fiyat: 90 },
            { id: 206, ad: 'Filtre Kahve', aciklama: '%100 Arabica çekirdeklerinden.', fiyat: 125 },
            { id: 207, ad: 'Bitki Çayları', aciklama: 'Ihlamur, adaçayı, yeşil çay vb.', fiyat: 100 },
            { id: 208, ad: 'Espresso / Double Espresso', aciklama: 'Yoğun aromalı espresso.', fiyat: 100 },
            { id: 209, ad: 'Mocha / White Choc. Mocha', aciklama: 'Belçika çikolatası ve espresso.', fiyat: 125 },
            { id: 210, ad: 'Cappuccino / Latte Macchiato', aciklama: 'Köpüklü süt ve espresso harmanı.', fiyat: 125 },
            { id: 211, ad: 'Americano', aciklama: 'Sıcak su ile inceltilmiş espresso.', fiyat: 125 },
            { id: 212, ad: 'Sıcak Çikolata', aciklama: 'Gerçek eritilmiş çikolata ile.', fiyat: 125, populer: true }
          ]
        }
      ];
    }

    // 2. ORMANPARK (ANA RESTORAN)
    if (s === 'ormanpark') {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Aperatifler',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Peynir çeşitleri, zeytin, bal, kaymak, yumurta, menemen, patates kızartması ve yeşillik.', fiyat: 300, populer: true },
            { id: 102, ad: 'Kalem Böreği', aciklama: 'Çıtır peynirli börek.', fiyat: 115 },
            { id: 103, ad: 'Paçanga Böreği', aciklama: 'Pastırmalı ve kaşarlı börek.', fiyat: 160, populer: true },
            { id: 104, ad: 'Güveçte Kaşar Mantar', aciklama: 'Fırınlanmış kaşarlı taze mantar.', fiyat: 200, populer: true },
            { id: 105, ad: 'Sosis Tabağı', aciklama: 'Patates kızartması ve soslar ile.', fiyat: 180 },
            { id: 106, ad: 'Sahanda / Sucuklu Yumurta', aciklama: 'Taze yumurta ve sucuk ikramı.', fiyat: 140 },
            { id: 107, ad: 'Menemen', aciklama: 'Domates, biber ve yumurta.', fiyat: 140 },
            { id: 108, ad: 'Bonfrit (Patates Kızartması)', aciklama: 'Çıtır patates.', fiyat: 125 }
          ]
        },
        {
          id: 2,
          baslik: 'Ana Yemekler & Izgaralar',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Günün Çorbası', aciklama: 'Sıcak ev yapımı günün çorbası.', fiyat: 75 },
            { id: 202, ad: 'Meşhur Sakarya Islama Köfte', aciklama: 'Özel kemik sulu biberli ekmek üzerinde köfte.', fiyat: 350, populer: true },
            { id: 203, ad: 'Cağ Kebabı (Şiş)', aciklama: 'Odun ateşinde Erzurum cağ kebabı.', fiyat: 225 },
            { id: 204, ad: 'Cağ Kebabı (Porsiyon)', aciklama: 'Garnitür ve lavaş ile porsiyon cağ kebabı.', fiyat: 440, populer: true },
            { id: 205, ad: 'Karışık Izgara (Ormanpark)', aciklama: 'Köfte, tavuk, bonfile ve zengin garnitür.', fiyat: 475, populer: true },
            { id: 206, ad: 'Izgara Köfte / Tavuk', aciklama: 'Izgarada pişen taze et ve tavuk.', fiyat: 375 },
            { id: 207, ad: 'Saç Kavurma', aciklama: 'Lokum kıvamında et kavurma.', fiyat: 425 },
            { id: 208, ad: 'Tavuk / Et Çökertme', aciklama: 'Kibrit patates, yoğurt ve özel sos ile.', fiyat: 375 },
            { id: 209, ad: 'Wrap Tavuk / Kekikli Tavuk', aciklama: 'Tortilla ekmeğinde tavuk veya özel marineli kekikli tavuk.', fiyat: 300 }
          ]
        },
        {
          id: 3,
          baslik: 'Pizzalar & Makarnalar',
          ikon: 'pi-compass',
          urunler: [
            { id: 301, ad: 'Ormanpark Özel Pizza', aciklama: 'Sucuk, mısır, zeytin, mantar, kaşar ve özel pizz sosu.', fiyat: 330, populer: true },
            { id: 302, ad: 'Tagliatelle Alfredo', aciklama: 'Kremalı mantarlı ve tavuklu tagliatelle.', fiyat: 280 },
            { id: 303, ad: 'Alfredo Fettucini', aciklama: 'Özel Alfredo soslu İtalyan makarna.', fiyat: 280 }
          ]
        },
        {
          id: 4,
          baslik: 'Salatalar & Tatlılar',
          ikon: 'pi-heart',
          urunler: [
            { id: 401, ad: 'Çoban Salata / Akdeniz Salata', aciklama: 'Taze mevsim sebzeleri ve ezine peyniri.', fiyat: 225 },
            { id: 402, ad: 'Izgara Tavuk Salata', aciklama: 'Izgara tavuk dilimleri ve zengin yeşillik.', fiyat: 250, populer: true },
            { id: 403, ad: 'Ton Balıklı Salata', aciklama: 'Mısır ve ton balıklı mevsim salatası.', fiyat: 275 },
            { id: 404, ad: 'Sakarya Meşhur Kabak Tatlısı', aciklama: 'Tahin ve ceviz parçaları eşliğinde.', fiyat: 220, populer: true }
          ]
        }
      ];
    }

    // 3. ÇARK-I DEM
    if (s.includes('cark-i-dem')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Aperatifler',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Zengin zeytin, peynir, bal, menemen ve kızartma.', fiyat: 300, populer: true },
            { id: 102, ad: 'Sahanda Yumurta / Menemen', aciklama: 'Taze pişirilmiş sıcak kahvaltılık.', fiyat: 140 },
            { id: 103, ad: 'Kalem & Paçanga Böreği', aciklama: 'Çıtır fırın börek çeşitleri.', fiyat: 160 },
            { id: 104, ad: 'Bonfrit / Günün Çorbası', aciklama: 'Sıcak çorba veya patates kızartması.', fiyat: 125 }
          ]
        },
        {
          id: 2,
          baslik: 'Ana Yemekler & Izgaralar',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Saç Kavurma / Et Çökertme', aciklama: 'Özel döküm tavada lokum et kavurma veya çökertme.', fiyat: 425, populer: true },
            { id: 202, ad: 'Tavuk Çökertme / Wrap', aciklama: 'Yoğurt ve çıtır patatesli tavuk veya dürümlü wrap.', fiyat: 360 },
            { id: 203, ad: 'Kremalı Tavuklu Penne / Köri Soslu Tavuk', aciklama: 'Özel soslu mantarlı tavuk yemekleri.', fiyat: 350 },
            { id: 204, ad: 'Ev Yapımı Mantı', aciklama: 'Yoğurt ve tereyağlı sos ile geleneksel mantı.', fiyat: 250 },
            { id: 205, ad: 'Karışık Izgara Porsiyon', aciklama: 'Izgara köfte, tavuk, pirzola ve garnitür.', fiyat: 475, populer: true },
            { id: 206, ad: 'Islama Köfte / Izgara Köfte', aciklama: 'Kemik sulu soslu ekmek ile Sakarya köftesi.', fiyat: 350, populer: true }
          ]
        },
        {
          id: 3,
          baslik: 'Pizzalar, Burger & Kumpir',
          ikon: 'pi-compass',
          urunler: [
            { id: 301, ad: 'Karıışık / Sucuklu Pizza', aciklama: 'Bol malzemeli odun fırını pizzası.', fiyat: 310, populer: true },
            { id: 302, ad: 'Vejeteryan / Margarita Pizza', aciklama: 'Taze sebzeler ve mozarella peynirli.', fiyat: 250 },
            { id: 303, ad: 'Hamburger / Cheeseburger Menü', aciklama: '100% dana köfteli burger, patates ve içecek.', fiyat: 300, populer: true },
            { id: 304, ad: 'Özel Bol Malzemeli Kumpir', aciklama: 'Tereyağlı, kaşarlı ve 8 çeşit mezeli fırın patates.', fiyat: 300, populer: true }
          ]
        },
        {
          id: 4,
          baslik: 'Lahmacun & Pide',
          ikon: 'pi-heart',
          urunler: [
            { id: 401, ad: 'Geleneksel Lahmacun / Antep Lahmacun', aciklama: 'Çıtır odun fırın lahmacunu.', fiyat: 110 },
            { id: 402, ad: 'Kıymalı & Kaşarlı Pide', aciklama: 'Özel Karadeniz usulü pide.', fiyat: 280, populer: true },
            { id: 403, ad: 'Kuşbaşılı & Kaşarlı Pide', aciklama: 'Kuşbaşı etli ve erimiş kaşarlı pide.', fiyat: 290 }
          ]
        }
      ];
    }

    // 4. MİLLET KIRAATHANESİ
    if (s.includes('millet-kiraathanesi')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Tost & Gözleme',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Zengin tabak kahvaltı sunumu.', fiyat: 300, populer: true },
            { id: 102, ad: 'Kaşarlı / Karışık Tost Menü', aciklama: 'Patates ve içecek ile tost menü.', fiyat: 225 },
            { id: 103, ad: 'Bazlama Kaşar Sucuklu / Kavurmalı', aciklama: 'Sıcak bazlama ekmeğinde eritme kaşarlı.', fiyat: 230, populer: true },
            { id: 104, ad: 'Peynirli / Kaşarlı Gözleme Menü', aciklama: 'Ayran ve yeşillik ile el açması gözleme.', fiyat: 225 },
            { id: 105, ad: 'Aperatif Tabağı (Patates & Soğan Halkası)', aciklama: 'Bonfrit patates, soğan halkası ve börek.', fiyat: 125 }
          ]
        },
        {
          id: 2,
          baslik: 'Burgerler & Izgaralar',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Hamburger / Cheeseburger Menü', aciklama: 'Bonfrit ve içecek ile enfes burger menüsü.', fiyat: 300, populer: true },
            { id: 202, ad: 'Chickenburger Menü', aciklama: 'Çıtır tavuk burger, patates ve içecek.', fiyat: 290 },
            { id: 203, ad: 'Izgara Tavuk / Izgara Sucuk', aciklama: 'Izgarada taze pişen porsiyon yemekler.', fiyat: 350 },
            { id: 204, ad: 'Izgara Köfte / Izgara Karışık', aciklama: 'Izgara dana köfte ve zengin garnitür.', fiyat: 375, populer: true },
            { id: 205, ad: 'Tavuk Wrap / Et Wrap Tabağı', aciklama: 'Patates kızartması ve akdeniz yeşilliği ile.', fiyat: 300, populer: true }
          ]
        },
        {
          id: 3,
          baslik: 'Günlük Taş Fırın Pizzaları',
          ikon: 'pi-compass',
          urunler: [
            { id: 301, ad: 'Alaturka Mix Pizza', aciklama: 'Kaşar peyniri, özel sos, misir, köfte parçacıkları, mangal sucuk, pastırma, biber.', fiyat: 350, populer: true },
            { id: 302, ad: 'Kavurmalı / Pastırmalı Pizza', aciklama: 'Özel kavurma veya pastırma dolgulu nefis pizza.', fiyat: 350, populer: true },
            { id: 303, ad: 'Vejeteryan / Margarita / Sebzeli Pizza', aciklama: 'Zengin sebze ve mozarella peynirli.', fiyat: 250 },
            { id: 304, ad: 'Sucuklu / Karışık Pizza Menü', aciklama: 'Karışık mini pizza, akdeniz salata, patates ve içecek.', fiyat: 400, populer: true }
          ]
        }
      ];
    }

    // 5. YENİKENTPARK
    if (s.includes('yenikentpark')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Aperatifler',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Peynir, zeytin, bal, yumurta, patates, domates, salatalık.', fiyat: 300, populer: true },
            { id: 102, ad: 'Günün Çorbası', aciklama: 'Sıcak süzme çorba servisi.', fiyat: 75 },
            { id: 103, ad: 'Tost Menü (Kaşarlı / Karışık)', aciklama: 'Patates kızartması ve içecek ile.', fiyat: 225, populer: true },
            { id: 104, ad: 'Gözleme Menü (Ayran İle)', aciklama: 'El açması taze gözleme.', fiyat: 225 },
            { id: 105, ad: 'Hamburger Menü', aciklama: 'Taze dana burger, bonfrit ve soğuk içecek.', fiyat: 300 }
          ]
        },
        {
          id: 2,
          baslik: 'Ana Yemekler & Izgaralar',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Her Güne Özel Sulu Yemek', aciklama: 'Fırın veya tencere sulu ev yemeği menüsü.', fiyat: 250, populer: true },
            { id: 202, ad: 'Meşhur Islama Köfte', aciklama: 'Biberli soslu ekmek üstünde ızgara köfte.', fiyat: 350, populer: true },
            { id: 203, ad: 'Izgara Tavuk / Izgara Köfte', aciklama: 'Pilav ve patates garnitürü ile.', fiyat: 350 },
            { id: 204, ad: 'Karışık Izgara Porsiyon', aciklama: 'Izgara çeşitleri ve zengin tabak garnitür.', fiyat: 425, populer: true }
          ]
        },
        {
          id: 3,
          baslik: 'Pizzalar & Salatalar',
          ikon: 'pi-compass',
          urunler: [
            { id: 301, ad: 'Belpaş Pizza Menü', aciklama: 'Karışık mini pizza, akdeniz salata, patates, içecek.', fiyat: 400, populer: true },
            { id: 302, ad: 'Margarita / Karışık Pizza', aciklama: 'Fırından taze pizza çeşitleri.', fiyat: 310 },
            { id: 303, ad: 'Izgara Tavuk Salata / Akdeniz Salata', aciklama: 'Taze Akdeniz yeşillikleri ile salata.', fiyat: 250 }
          ]
        }
      ];
    }

    // 6. ORMANPARK - DÖRT MEVSİM
    if (s.includes('dort-mevsim')) {
      return [
        {
          id: 1,
          baslik: 'Pizzalar & Kumpir',
          ikon: 'pi-star',
          urunler: [
            { id: 101, ad: 'Ormanpark Özel Pizza', aciklama: 'Bol zeytin, sucuk, mısır, kaşar ve özel sos.', fiyat: 330, populer: true },
            { id: 102, ad: 'Karışık Pizza Menü', aciklama: 'Pizza, patates kızartması ve soğuk içecek.', fiyat: 400, populer: true },
            { id: 103, ad: 'Fırın Kumpir (Bol Malzemeli)', aciklama: 'Tereyağlı, kaşarlı fırınlanmış patates kumpir.', fiyat: 300, populer: true },
            { id: 104, ad: 'Vejeteryan / Margarita / Sucuklu Pizza', aciklama: 'İtalyan hamuru ile nefis pizzalar.', fiyat: 250 }
          ]
        },
        {
          id: 2,
          baslik: 'Tostlar & Burgerler',
          ikon: 'pi-sun',
          urunler: [
            { id: 201, ad: 'Ayvalık Tostu (Karışık / Sade)', aciklama: 'Zengin malzemeli sıcak Ayvalık tost ekmeği.', fiyat: 170, populer: true },
            { id: 202, ad: 'Tost Menü (Kaşarlı / Karışık)', aciklama: 'Patates ve içecek ile tost servisi.', fiyat: 225 },
            { id: 203, ad: 'Hamburger / Cheeseburger Menü', aciklama: 'Enfes burger, bonfrit ve buz gibi içecek.', fiyat: 300, populer: true }
          ]
        },
        {
          id: 3,
          baslik: 'Lahmacun, Pide & Gözlemeler',
          ikon: 'pi-compass',
          urunler: [
            { id: 301, ad: 'Geleneksel Lahmacun / Antep Lahmacun', aciklama: 'Fırından taze lahmacun.', fiyat: 110 },
            { id: 302, ad: 'Kıymalı / Kaşarlı / Kuşbaşılı Pide', aciklama: 'Karadeniz fırın pidesi çeşitleri.', fiyat: 280, populer: true },
            { id: 303, ad: 'Gözleme Çeşitleri & Menü', aciklama: 'El açması yufkadan börek lezzeti.', fiyat: 160 }
          ]
        }
      ];
    }

    // 7. ORMANPARK - SADE KAHVE / SADE BAHÇE
    if (s.includes('sade-kahve')) {
      return [
        {
          id: 1,
          baslik: 'Kahve & Sıcak/Soğuk İçecekler',
          ikon: 'pi-coffee',
          urunler: [
            { id: 101, ad: 'Közde Demlenmiş Bardak Çay / Fincan Çay', aciklama: 'Taze demlik çay.', fiyat: 15, populer: true },
            { id: 102, ad: 'Türk Kahvesi / Dibek / Damla Sakızlı', aciklama: 'Lokum eşliğinde kahve keyfi.', fiyat: 85, populer: true },
            { id: 103, ad: 'Sıkma Portakal & Nar Suyu', aciklama: '%100 doğal taze sıkılmış meyve suları.', fiyat: 120, populer: true },
            { id: 104, ad: 'Sıcak Çikolata / Sütlü Çikolata / Salep', aciklama: 'Köpüklü sıcak kış/yaz içecekleri.', fiyat: 125 },
            { id: 105, ad: 'Nargile Çeşitleri', aciklama: 'Özel aromalı nargile servisi.', fiyat: 350 }
          ]
        },
        {
          id: 2,
          baslik: 'Yiyecekler & Pide & Tost',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Fırın Lahmacun / Antep Lahmacun', aciklama: 'Limon ve yeşillik ile çıtır lahmacun.', fiyat: 110 },
            { id: 202, ad: 'Kıymalı & Kaşarlı & Kuşbaşılı Pide', aciklama: 'Fırından sıcak pide lezzeti.', fiyat: 280, populer: true },
            { id: 203, ad: 'Hamburger & Cheeseburger Menü', aciklama: 'Bonfrit ve soğuk meşrubat ile.', fiyat: 300 },
            { id: 204, ad: 'Gözleme & Tost Çeşitleri', aciklama: 'Gözleme veya sıcacık tost tabağı.', fiyat: 160 },
            { id: 205, ad: 'Tereyağlı Fırın Kumpir', aciklama: 'Bol meze ve kaşarlı kumpir.', fiyat: 300, populer: true }
          ]
        },
        {
          id: 3,
          baslik: 'Geleneksel Tatlılar',
          ikon: 'pi-heart',
          urunler: [
            { id: 301, ad: 'Sakarya Meşhur Kabak Tatlısı', aciklama: 'Tahin ve ceviz parçaları ile fırınlanmış kabak.', fiyat: 220, populer: true },
            { id: 302, ad: 'Fırın Sütlaç / Künefe', aciklama: 'Fındıklı sütlaç veya sıcak peynirli künefe.', fiyat: 135, populer: true },
            { id: 303, ad: 'Profiterol / Trileçe / Magnolia', aciklama: 'Taze günlük tatlı çeşitleri.', fiyat: 190 },
            { id: 304, ad: 'Taze Dilim Pasta Çeşitleri', aciklama: 'Meyveli ve çikolatalı yaş pasta.', fiyat: 190 }
          ]
        }
      ];
    }

    // 8. UÇAK KIRAATHANESİ
    if (s.includes('ucak')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Fast Food & Izgara',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Zengin kahvaltı tabağı ve çay servisi.', fiyat: 300, populer: true },
            { id: 102, ad: 'Tost / Tost Menü (Kaşarlı/Karışık)', aciklama: 'Patates ve içecekli doyurucu menü.', fiyat: 225 },
            { id: 103, ad: 'Hamburger / Cheeseburger Menü', aciklama: 'Dana burger, bonfrit patates ve meşrubat.', fiyat: 300, populer: true },
            { id: 104, ad: 'Chickenburger Menü', aciklama: 'Çıtır tavuk burger menüsü.', fiyat: 290 },
            { id: 105, ad: 'Izgara Tavuk / Izgara Köfte Porsiyon', aciklama: 'Izgarada nar gibi kızarmış et servisi.', fiyat: 350, populer: true }
          ]
        },
        {
          id: 2,
          baslik: 'Sıcak & Soğuk İçecekler',
          ikon: 'pi-coffee',
          urunler: [
            { id: 201, ad: 'Bardak Çay / Fincan Çay', aciklama: 'Taze Rize çayı.', fiyat: 15, populer: true },
            { id: 202, ad: 'Türk Kahvesi / Damla Sakızlı / Dibek', aciklama: 'Geleneksel közde kahveler.', fiyat: 85, populer: true },
            { id: 203, ad: 'Sıcak Çikolata / Salep / Nescafe', aciklama: 'Sıcak kış lezzetleri.', fiyat: 120 },
            { id: 204, ad: 'Limonata / Soğuk Çay / Kutu İçecekler', aciklama: 'Buz gibi ferahlatıcı meşrubatlar.', fiyat: 70 }
          ]
        },
        {
          id: 3,
          baslik: 'Tatlılar & Dondurma',
          ikon: 'pi-heart',
          urunler: [
            { id: 301, ad: 'Profiterol / Trileçe / Magnolia', aciklama: 'Özel soslu nefis günlük tatlılar.', fiyat: 190, populer: true },
            { id: 302, ad: 'Hatay Usulü Künefe', aciklama: 'Sıcak şerbetli ve çıtır kadayıflı.', fiyat: 200 },
            { id: 303, ad: 'Top Dondurma / Porsiyon Dondurma', aciklama: 'Çeşitli meyveli ve çikolatalı dondurma.', fiyat: 40 }
          ]
        }
      ];
    }

    // 9. VAGON KIRAATHANESİ
    if (s.includes('vagon')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Aperatifler & Izgara',
          ikon: 'pi-star',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Nefis kahvaltılık ürünler sunumu.', fiyat: 300, populer: true },
            { id: 102, ad: 'Tost Menü (Kaşarlı / Karışık)', aciklama: 'Çıtır patates ve meşrubat eşliğinde.', fiyat: 225 },
            { id: 103, ad: 'Hamburger / Cheeseburger Menü', aciklama: '100% Dana burger, patates ve içecek.', fiyat: 300, populer: true },
            { id: 104, ad: 'Izgara Tavuk / Sucuk / Köfte', aciklama: 'Pilavlı ve garnitürlü ızgara porsiyon.', fiyat: 350, populer: true },
            { id: 105, ad: 'Karışık Izgara Porsiyon', aciklama: 'Zengin karışık et tabağı.', fiyat: 425, populer: true }
          ]
        },
        {
          id: 2,
          baslik: 'Salatalar & İçecekler & Dondurma',
          ikon: 'pi-coffee',
          urunler: [
            { id: 201, ad: 'Izgara Tavuk Salata / Akdeniz Salata', aciklama: 'Taze yeşillikli besleyici salatalar.', fiyat: 250 },
            { id: 202, ad: 'Taze Bardak Çay / Türk Kahvesi', aciklama: 'Geleneksel demlik çay ve kahve.', fiyat: 15, populer: true },
            { id: 203, ad: 'Sıcak Çikolata / Salep', aciklama: 'Köpüklü leziz sıcak içecekler.', fiyat: 125 },
            { id: 204, ad: 'Maraş Usulü Top / Porsiyon Dondurma', aciklama: 'Serinletici gerçek dondurma lezzeti.', fiyat: 40 }
          ]
        }
      ];
    }

    // 10. ACARLAR LONGOZU
    if (s.includes('acarlar-longozu')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Aperatifler',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (Longoz Özel)', aciklama: 'Doğa içinde nefis serpme tabak kahvaltı.', fiyat: 300, populer: true },
            { id: 102, ad: 'Menemen / Sucuklu Yumurta', aciklama: 'Sıcak sahanda pişirilen lezzetler.', fiyat: 140 },
            { id: 103, ad: 'Tost / Tost Menü', aciklama: 'Patates ve içecekli tost servisi.', fiyat: 225 },
            { id: 104, ad: 'El açması Gözleme & Menü', aciklama: 'Sıcak sac gözlemesi ve yayık ayranı.', fiyat: 225, populer: true },
            { id: 105, ad: 'Hamburger / Cheeseburger Menü', aciklama: 'Nefis hamburger, bonfrit patates ve içecek.', fiyat: 300 }
          ]
        },
        {
          id: 2,
          baslik: 'Izgaralar & Salatalar',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Izgara Köfte / Izgara Sucuk', aciklama: 'Közde ızgara köfte ve garnitür.', fiyat: 375, populer: true },
            { id: 202, ad: 'Izgara Tavuk Porsiyon', aciklama: 'Marine edilmiş tavuk pirzola/göğüs.', fiyat: 350 },
            { id: 203, ad: 'Karışık Izgara (Acarlar Özel)', aciklama: 'Zengin ızgara çeşitleri tabağı.', fiyat: 425, populer: true },
            { id: 204, ad: 'Karışık Pizza & Pizza Menü', aciklama: 'Taş fırından sıcak pizza.', fiyat: 310 },
            { id: 205, ad: 'Izgara Tavuk Salata / Çoban Salata', aciklama: 'Taze doğal zeytinyağlı salatalar.', fiyat: 250 }
          ]
        }
      ];
    }

    // 11. ELEGANT RESTORAN
    if (s.includes('elegant-restoran')) {
      return [
        {
          id: 1,
          baslik: 'Restoran Özel Izgaralar',
          ikon: 'pi-star',
          urunler: [
            { id: 101, ad: 'Meşhur Sakarya Islama Köfte', aciklama: 'Özel kemik suyu ekmekli köfte.', fiyat: 350, populer: true },
            { id: 102, ad: 'Karışık Izgara Porsiyon', aciklama: 'Köfte, pirzola, tavuk ve garnitür.', fiyat: 475, populer: true },
            { id: 103, ad: 'Saç Kavurma', aciklama: 'Özel döküm sacda et kavurma.', fiyat: 425 }
          ]
        },
        {
          id: 2,
          baslik: 'Kahvaltı & Tatlılar',
          ikon: 'pi-sun',
          urunler: [
            { id: 201, ad: 'Serpme / Tabak Kahvaltı', aciklama: 'Zengin serpme kahvaltı çeşitleri.', fiyat: 300, populer: true },
            { id: 202, ad: 'Meşhur Sakarya Kabak Tatlısı', aciklama: 'Tahinli ve cevizli fırın kabak.', fiyat: 220, populer: true }
          ]
        }
      ];
    }

    // 12. KARAMANPARK
    if (s.includes('karamanpark')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Fast Food',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı', aciklama: 'Zengin kahvaltı tabağı.', fiyat: 300, populer: true },
            { id: 102, ad: 'Tost Menü (Kaşarlı / Karışık)', aciklama: 'Patates ve içecek ile.', fiyat: 225 },
            { id: 103, ad: 'Hamburger Menü', aciklama: 'Dana burger ve bonfrit patates.', fiyat: 300, populer: true }
          ]
        },
        {
          id: 2,
          baslik: 'Izgaralar & Pizzalar',
          ikon: 'pi-star',
          urunler: [
            { id: 201, ad: 'Izgara Köfte / Izgara Tavuk', aciklama: 'Garnitürlü leziz ızgaralar.', fiyat: 350, populer: true },
            { id: 202, ad: 'Karışık Pizza Menü', aciklama: 'Taş fırın pizzası ve içecek.', fiyat: 400 }
          ]
        }
      ];
    }

    // 13. İL ORMANI TABİAT PARKI
    if (s.includes('il-ormani')) {
      return [
        {
          id: 1,
          baslik: 'Doğa Kahvaltısı & Izgaralar',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı (İl Ormanı Özel)', aciklama: 'Doğa manzarasında zengin kahvaltı.', fiyat: 300, populer: true },
            { id: 102, ad: 'Saç Kavurma Porsiyon', aciklama: 'Döküm sac üzerinde sıcak et kavurma.', fiyat: 425, populer: true },
            { id: 103, ad: 'Izgara Köfte / Tavuk / Sucuk', aciklama: 'Közde ızgara çeşitleri.', fiyat: 350, populer: true },
            { id: 104, ad: 'Semaver Çay Servisi', aciklama: 'Közde demlenen taze semaver çayı.', fiyat: 180, populer: true }
          ]
        }
      ];
    }

    // 14. PAMUKOVA ESENTEPEPARK
    if (s.includes('pamukova') || s.includes('esentepepark')) {
      return [
        {
          id: 1,
          baslik: 'Kahvaltı & Sosyal Tesis Menüsü',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı', aciklama: 'Pamukova manzaralı serpme kahvaltı.', fiyat: 300, populer: true },
            { id: 102, ad: 'Izgara Köfte / Islama Köfte', aciklama: 'Közde ızgara köfte porsiyon.', fiyat: 350, populer: true },
            { id: 103, ad: 'Tost & Gözleme Menü', aciklama: 'Çıtır patates ve meşrubat ile.', fiyat: 225 }
          ]
        }
      ];
    }

    // 15. SÖĞÜTLÜ BAHÇEM KAFE
    if (s.includes('sogutlu') || s.includes('bahcem-kafe')) {
      return [
        {
          id: 1,
          baslik: 'Bahçem Kafe Özel Lezzetleri',
          ikon: 'pi-sun',
          urunler: [
            { id: 101, ad: 'Tabak Kahvaltı', aciklama: 'Doğal köy kahvaltılıkları tabağı.', fiyat: 300, populer: true },
            { id: 102, ad: 'El Açması Gözleme Çeşitleri', aciklama: 'Peynirli, patatesli veya kaşarlı gözleme.', fiyat: 160, populer: true },
            { id: 103, ad: 'Semaver Çay & Türk Kahvesi', aciklama: 'Bahçede demlik çay ve Türk kahvesi.', fiyat: 85, populer: true }
          ]
        }
      ];
    }

    // Varsayılan Restoran & Sosyal Tesis Menüsü (PDF yüklenmeyen diğer tüm tesisler için sabit kalsın)
    return [
      {
        id: 1,
        baslik: 'Kahvaltı & Aperatifler',
        ikon: 'pi-sun',
        urunler: [
          { id: 101, ad: 'Serpme / Tabak Kahvaltı', aciklama: 'Peynir çeşitleri, zeytin, bal-kaymak, yumurta, domates, salatalık ve simit ile.', fiyat: 300, populer: true },
          { id: 102, ad: 'Güveçte Kaşar Mantar', aciklama: 'Taze mantar ve fırınlanmış kaşar peyniri.', fiyat: 200, populer: true },
          { id: 103, ad: 'Paçanga Böreği', aciklama: 'Pastırmalı ve kaşarlı çıtır fırın böreği.', fiyat: 160 },
          { id: 104, ad: 'Gözleme Çeşitleri (Peynirli / Patatesli)', aciklama: 'El açması yufkadan sac gözlemesi.', fiyat: 160 }
        ]
      },
      {
        id: 2,
        baslik: 'Ana Yemekler & Izgaralar',
        ikon: 'pi-star',
        urunler: [
          { id: 201, ad: 'Meşhur Sakarya Islama Köfte', aciklama: 'Özel kemik sulu biberli ekmek üzerinde ızgara köfte.', fiyat: 350, populer: true },
          { id: 202, ad: 'Erzurum Cağ Kebabı (Porsiyon)', aciklama: 'Odun ateşinde pişen özel marine edilmiş lezzet.', fiyat: 440, populer: true },
          { id: 203, ad: 'Karışık Izgara Porsiyon', aciklama: 'Köfte, tavuk ızgara ve garnitürler.', fiyat: 475 },
          { id: 204, ad: 'Saç Kavurma', aciklama: 'Sac üzerinde lokum kıvamında et kavurma.', fiyat: 425 }
        ]
      },
      {
        id: 3,
        baslik: 'Pide & Lahmacun',
        ikon: 'pi-compass',
        urunler: [
          { id: 301, ad: 'Geleneksel Lahmacun', aciklama: 'Odun fırınından taze yeşillik ve limon ile.', fiyat: 110 },
          { id: 302, ad: 'Kuşbaşılı & Kaşarlı Pide', aciklama: 'Fırınlanmış Karadeniz usulü pide.', fiyat: 290, populer: true },
          { id: 303, ad: 'Kıymalı Pide', aciklama: 'Taze kıymalı fırın pidesi.', fiyat: 280 }
        ]
      },
      {
        id: 4,
        baslik: 'Tatlılar & İçecekler',
        ikon: 'pi-heart',
        urunler: [
          { id: 401, ad: 'Sakarya Meşhur Kabak Tatlısı', aciklama: 'Tahin ve ceviz parçaları eşliğinde.', fiyat: 220, populer: true },
          { id: 402, ad: 'Fırın Sütlaç', aciklama: 'Geleneksel fındıklı sütlaç.', fiyat: 135 },
          { id: 403, ad: 'Türk Kahvesi', aciklama: 'Közde demlenmiş bol köpüklü kahve.', fiyat: 85 },
          { id: 404, ad: 'Bardak Çay', aciklama: 'Taze demlenmiş çay.', fiyat: 15 }
        ]
      }
    ];
  }
}
