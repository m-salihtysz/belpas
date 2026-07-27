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
  kategori: string;
  renk: string;
  harf: string;
  aciklama: string;
  adres: string;
  telefon: string;
  resimUrl: string;
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

  getTesis(id: number): Observable<Tesis> {
    return this.http.get<Tesis>(`${this.apiUrl}/${id}`);
  }

  // Digital Menu Mock Generator for Facilities (Resmi Sakarya Büyükşehir Belediyesi Tesis Menüsü)
  getMockMenuForFacility(tesisId: number): MenuKategori[] {
    return [
      {
        id: 1,
        baslik: 'Kahvaltı & Aperatifler',
        ikon: 'pi-sun',
        urunler: [
          { id: 101, ad: 'Tabak Kahvaltı (Tek Kişilik)', aciklama: 'Peynir çeşitleri, zeytin, bal-kaymak, yumurta, domates, salatalık ve simit ikramı ile.', fiyat: 300, populer: true },
          { id: 102, ad: 'Güveçte Kaşar Mantar', aciklama: 'Taze mantar ve fırınlanmış kaşar peyniri lezzeti.', fiyat: 200, populer: true },
          { id: 103, ad: 'Paçanga Böreği', aciklama: 'Pastırmalı ve kaşarlı çıtır fırın böreği.', fiyat: 160 },
          { id: 104, ad: 'Kalem Böreği', aciklama: 'Çıtır peynirli ev yapımı börek.', fiyat: 115 },
          { id: 105, ad: 'Sahanda Yumurta / Menemen', aciklama: 'Köy yumurtası ve taze domates biber ile.', fiyat: 140 },
          { id: 106, ad: 'Sucuklu Yumurta', aciklama: 'Özel kasap sucuklu sahanda yumurta.', fiyat: 140 },
          { id: 107, ad: 'Gözleme Çeşitleri (Peynirli / Patatesli)', aciklama: 'El açması yufkadan sac gözlemesi.', fiyat: 160 },
          { id: 108, ad: 'Bonfrit (Patates Kızartması)', aciklama: 'Çıtır patates kızartması porsiyon.', fiyat: 125 }
        ]
      },
      {
        id: 2,
        baslik: 'Ana Yemekler & Izgaralar',
        ikon: 'pi-star',
        urunler: [
          { id: 201, ad: 'Meşhur Sakarya Islama Köfte', aciklama: 'Özel kemik sulu biberli ekmek üzerinde ızgara köfte ve közlenmiş biber.', fiyat: 350, populer: true },
          { id: 202, ad: 'Erzurum Cağ Kebabı (Porsiyon)', aciklama: 'Odun ateşinde pişen özel marine edilmiş lezzet.', fiyat: 440, populer: true },
          { id: 203, ad: 'Karışık Izgara (Ormanpark Özel)', aciklama: 'Köfte, tavuk ızgara, pirzola ve garnitürler.', fiyat: 475, populer: true },
          { id: 204, ad: 'Saç Kavurma', aciklama: 'Sac üzerinde lokum kıvamında et kavurma.', fiyat: 425 },
          { id: 205, ad: 'Izgara Köfte Porsiyon', aciklama: 'Pirinç pilavı ve patates kızartması eşliğinde.', fiyat: 375 },
          { id: 206, ad: 'Tavuk / Et Çökertme Kebabı', aciklama: 'Çıtır patates yatağında süzme yoğurt ve soslu et.', fiyat: 375 },
          { id: 207, ad: 'Kekikli / Köri Soslu Tavuk', aciklama: 'Kremalı özel soslu jülyen tavuk göğsü.', fiyat: 350 },
          { id: 208, ad: 'Günün Çorbası', aciklama: 'Taze günlük çorba ikramımız.', fiyat: 75 }
        ]
      },
      {
        id: 3,
        baslik: 'Pide, Lahmacun & Burger',
        ikon: 'pi-compass',
        urunler: [
          { id: 301, ad: 'Geleneksel Lahmacun', aciklama: 'Odun fırınında taze yeşillik ve limon ile.', fiyat: 110 },
          { id: 302, ad: 'Kuşbaşılı & Kaşarlı Pide', aciklama: 'Karadeniz Usulü uzatılmış özel fırın pidesi.', fiyat: 290, populer: true },
          { id: 303, ad: 'Kıymalı / Kaşarlı Pide', aciklama: 'Taze fırınlanmış lezzetli pideniz.', fiyat: 280 },
          { id: 304, ad: 'Ormanpark Özel Pizza', aciklama: 'Sucuk, mısır, zeytin, mantar ve bol kaşar.', fiyat: 330, populer: true },
          { id: 305, ad: 'Hamburger Menü (Patates + İçecek)', aciklama: '%100 dana köftesi, özel sos ve patates.', fiyat: 300 },
          { id: 306, ad: 'Cheeseburger Menü', aciklama: 'Eriyen çedar peynirli özel menü.', fiyat: 340 }
        ]
      },
      {
        id: 4,
        baslik: 'Tatlılar & Dondurma',
        ikon: 'pi-heart',
        urunler: [
          { id: 401, ad: 'Sakarya Meşhur Kabak Tatlısı', aciklama: 'Tahin ve ceviz parçaları eşliğinde geleneksel kabak tatlısı.', fiyat: 220, populer: true },
          { id: 402, ad: 'Sütlü Trileçe Tatlısı', aciklama: 'Karamel soslu hafif sütlü tatlı.', fiyat: 190, populer: true },
          { id: 403, ad: 'Fırın Sütlaç', aciklama: 'Geleneksel fırınlanmış fındıklı sütlaç.', fiyat: 135 },
          { id: 404, ad: 'Sıcak Çıtır Künefe', aciklama: 'Antep fıstıklı sıcak antep künefesi.', fiyat: 200 },
          { id: 405, ad: 'Çikolatalı Profiterol / Magnolya', aciklama: 'Taze krema ve özel çikolata soslu.', fiyat: 190 },
          { id: 406, ad: 'Maraş Usulü Porsiyon Dondurma', aciklama: 'Sade, çikolatalı ve antep fıstıklı çeşitler.', fiyat: 150 }
        ]
      },
      {
        id: 5,
        baslik: 'Sıcak & Soğuk İçecekler',
        ikon: 'pi-coffee',
        urunler: [
          { id: 501, ad: 'Türk Kahvesi (Lokum İkramlı)', aciklama: 'Közde demlenmiş bol köpüklü Türk kahvesi.', fiyat: 85, populer: true },
          { id: 502, ad: 'Damla Sakızlı / Dibek Kahvesi', aciklama: 'Özel baharat aromalı yumuşak içim.', fiyat: 90 },
          { id: 503, ad: 'Geleneksel Bardak Çay', aciklama: 'Taze demlenmiş Rize çayı.', fiyat: 15 },
          { id: 504, ad: 'Termos Çay (Aile Porsiyonu)', aciklama: 'Masaya özel demlik termos çay servisi.', fiyat: 180 },
          { id: 505, ad: 'Ev Yapımı Taze Limonata', aciklama: 'Taze sıkılmış limon ve nane yaprakları ile.', fiyat: 100, populer: true },
          { id: 506, ad: 'Taze Sıkılmış Portakal / Nar Suyu', aciklama: 'Günlük taze sıkma meyve suyu.', fiyat: 120 },
          { id: 507, ad: 'Salep (Tarçınlı)', aciklama: 'Sıcak sütlü salep lezzeti.', fiyat: 120 },
          { id: 508, ad: 'Kutu İçecekler / Ayran / Soda', aciklama: 'Soğuk meşrubat çeşitleri.', fiyat: 40 }
        ]
      }
    ];
  }
}
