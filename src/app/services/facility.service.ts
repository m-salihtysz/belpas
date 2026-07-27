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

  // Digital Menu Mock Generator for Facilities
  getMockMenuForFacility(tesisId: number): MenuKategori[] {
    return [
      {
        id: 1,
        baslik: 'Sıcak İçecekler & Kahveler',
        ikon: 'pi-coffee',
        urunler: [
          { id: 101, ad: 'Geleneksel Sakarya Çayı (İnce Belli)', aciklama: 'Taze demlenmiş Rize çayı lezzeti.', fiyat: 15, populer: true },
          { id: 102, ad: 'Türk Kahvesi (Lokum ile)', aciklama: 'Közde pişirilmiş bol köpüklü geleneksel Türk kahvesi.', fiyat: 45, populer: true },
          { id: 103, ad: 'Dibek Kahvesi', aciklama: 'Özel baharat aromalı yumuşak içimli kahve.', fiyat: 55 },
          { id: 104, ad: 'Bitki & Meyve Çayları', aciklama: 'Ihlamur, adaçayı, yeşil çay, nane-limon çeşitleri.', fiyat: 35 },
          { id: 105, ad: 'Espresso / Americano', aciklama: 'Taze çekilmiş %100 Arabica çekirdeklerinden.', fiyat: 60 }
        ]
      },
      {
        id: 2,
        baslik: 'Kahvaltı & Aperatifler',
        ikon: 'pi-sun',
        urunler: [
          { id: 201, ad: 'Serpme Belpaş Kahvaltısı (Kişi Başı)', aciklama: 'Ezine peyniri, kaşar, bal-kaymak, yumurta, zeytin ve taze simit çeşitleri.', fiyat: 220, populer: true },
          { id: 202, ad: 'Bazlama Tost (Kaşarlı & Sucuklu)', aciklama: 'Köy bazlaması arasında özel kasap sucuk ve eritme kaşar.', fiyat: 85, populer: true },
          { id: 203, ad: 'Tereyağlı Menemen', aciklama: 'Taze domates, biber ve köy yumurtası ile pişirilmiş lezzet.', fiyat: 75 },
          { id: 204, ad: 'Gözleme Çeşitleri (Peynirli / Patatesli)', aciklama: 'El açması yufkadan sac gözlemesi.', fiyat: 65 }
        ]
      },
      {
        id: 3,
        baslik: 'Tatlılar & Fırın Ürünleri',
        ikon: 'pi-heart',
        urunler: [
          { id: 301, ad: 'San Sebastian Cheesecake', aciklama: 'Eriyen kıvamlı İspanyol cheesecake lezzeti.', fiyat: 95, populer: true },
          { id: 302, ad: 'Sütlaç (Fırınlanmış)', aciklama: 'Geleneksel fırın sütlaç, fındık parçaları ile.', fiyat: 60 },
          { id: 303, ad: 'Sıcak Çikolatalı Souffle', aciklama: 'Akışkan çikolatalı sufle ve vanilyalı dondurma.', fiyat: 90 },
          { id: 304, ad: 'Haşhaşlı & İncirli Kek', aciklama: 'Taze pişmiş anne keki dokusunda lezzet.', fiyat: 45 }
        ]
      },
      {
        id: 4,
        baslik: 'Soğuk İçecekler',
        ikon: 'pi-bolt',
        urunler: [
          { id: 401, ad: 'Ev Yapımı Limonata (Nane Yapraklı)', aciklama: 'Taze sıkılmış limon ve taze nane ile soğuk serinlik.', fiyat: 50, populer: true },
          { id: 402, ad: 'Taze Sıkılmış Portakal Suyu', aciklama: 'Günlük C vitamini deposu taze meyve suyu.', fiyat: 65 },
          { id: 403, ad: 'Churchill (Tuzlu Limonlu Soda)', aciklama: 'Soda, taze limon suyu ve deniz tuzu karışımı.', fiyat: 35 },
          { id: 404, ad: 'Soğuk Kahve (Iced Latte)', aciklama: 'Espresso, soğuk süt ve buz küpleri.', fiyat: 70 }
        ]
      }
    ];
  }
}
