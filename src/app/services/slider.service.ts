import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Slider {
  id: number;
  kategori: string;
  baslik: string;
  aciklama?: string;
  resimUrl: string;
  logoUrl?: string;
  btnMetni: string;
  btnLink: string;
  sira: number;
  aktif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/sliderlar';

  getSliderlar(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      catchError(err => {
        console.warn('Sliderlar backend API ulaşılamadı, varsayılan sliderlar kullanılıyor:', err);
        return of(this.getMockSliderlar());
      })
    );
  }

  getMockSliderlar(): Slider[] {
    return [
      {
        id: 1,
        sira: 1,
        kategori: "BELPAŞ'A HOŞ GELDİNİZ",
        baslik: "NEHİR ÇİKOLATA EŞSİZ LEZZET DUBAİ LEZZETİ",
        aciklama: "Her lokmada geleneksel tatları modern dokunuşlarla buluşturan prestijli Nehir Çikolata serimiz.",
        resimUrl: "/images/çikolata.jpeg",
        logoUrl: "/images/nehir-logo.png",
        btnMetni: "KEŞFEDİN",
        btnLink: "/tesisler",
        aktif: true
      },
      {
        id: 2,
        sira: 2,
        kategori: "HİZMET NOKTALARI VE TESİSLER",
        baslik: "ŞEHRE HAYAT İNSANA DEĞER KATAN MEKANLAR SOSYAL TESİSLER",
        aciklama: "Sakarya genelinde konfor, kalite ve lezzeti bir araya getiren prestijli sosyal yaşam alanlarımız.",
        resimUrl: "/images/sbb_mekan.jpg",
        logoUrl: "/images/sbb_seffaf.png",
        btnMetni: "TESİSLERİMİZ",
        btnLink: "/tesisler",
        aktif: true
      },
      {
        id: 3,
        sira: 3,
        kategori: "DİJİTAL VE AKILLI ŞEHİR ÇÖZÜMLERİ",
        baslik: "ULAŞIMDA VE KENTE DİJİTAL KOLAYLIK KENT REHBERİ",
        aciklama: "Büyükşehrin tüm ulaşım hatları, harita bilgileri ve sosyal imkanlarına tek tıkla kolayca erişin.",
        resimUrl: "/images/kent_rehberi_bg.png",
        logoUrl: "/images/screen3.png",
        btnMetni: "İNCELEYİN",
        btnLink: "/haberler",
        aktif: true
      }
    ];
  }
}
