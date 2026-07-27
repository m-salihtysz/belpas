import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { FacilityService } from '../../services/facility.service';
import { SeoService } from '../../services/seo.service';

// 1. GÜNCELLEME: resimYolu ve logoYolu eklendi
interface Slide {
  id: number;
  kategori: string;
  baslik: string;
  altyazi: string;
  aciklama: string;
  btnMetni: string;
  btnLink: string;
  resimYolu: string; 
  logoYolu: string;  
}

interface Tesis {
  id: number;
  ad: string;
  kategori: string;
  renk: string;
  harf: string;
}

interface Haber {
  id: number;
  kategori: string;
  baslik: string;
  aciklama: string;
  tarih: string;
  link: string;
  resimUrl?: string;
}

@Component({
  selector: 'app-anasayfa',
  imports: [RouterLink, CommonModule],
  templateUrl: './anasayfa.html',
  styleUrl: './anasayfa.scss'
})
export class Anasayfa implements OnInit, OnDestroy {
  private haberService = inject(NewsService);
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService);

  aktifSlide = signal(0);
  private sliderZamanlayici: ReturnType<typeof setInterval> | null = null;

  aktifTesisBaslangic = signal(0);
  readonly tesisGoruntulenen = 5;

  // 2. GÜNCELLEME: Her slayda resim ve logo yolları eklendi
  sliderlar: Slide[] = [
    {
      id: 1,
      kategori: 'Özel Lezzet',
      baslik: 'Nehir Çikolata',
      altyazi: 'Dubai Lezzeti',
      aciklama: 'Her lokmada geleneksel lezzetler, modern dokunuşlarla birleşiyor. Ofisinizde, kafenizde size özel.',
      btnMetni: 'Keşfedin',
      btnLink: '/tesisler',
      resimYolu: '/images/çikolata.jpeg', // Örnek arkaplan resmi
      logoYolu: '/images/nehir-logo.png'    // Örnek logo resmi
    },
    {
      id: 2,
      kategori: 'Kurumsal Hizmet',
      baslik: 'Şehre Değer',
      altyazi: 'Katan Mekanlar',
      aciklama: 'Sakarya\'yı yaşanabilir kılan sosyal tesisler ve hizmetlerle hayatınıza değer katıyoruz.',
      btnMetni: 'Tesislerimiz',
      btnLink: '/tesisler',
      resimYolu: '/images/sbb_mekan.jpg', // Örnek arkaplan resmi
      logoYolu: '/images/sbb_seffaf.png'      // Kendi logonuz
    },
    {
      id: 3,
      kategori: 'Haberler',
      baslik: 'Sakarya Kent',
      altyazi: 'Rehberi',
      aciklama: 'Büyükşehrin tüm imkânlarını keşfedin. Sosyal, kültürel ve ticari hayatın tam ortasında BELPAŞ.',
      btnMetni: 'Daha Fazla',
      btnLink: '/haberler',
      resimYolu: '/images/kent_rehberi.png', // Örnek arkaplan resmi
      logoYolu: '/images/screen3.png'     // Örnek logo resmi
    }
  ];

  tesisler: Tesis[] = [];
  haberler: Haber[] = [];

  ngOnInit() {
    this.seoService.generateTags({
      title: 'BELPAŞ - Sakarya Büyükşehir Belediyesi',
      description: 'Sakarya Büyükşehir Belediyesi iştiraki olan BELPAŞ, sosyal tesisler, kafeteryalar ve kurumsal hizmetler sunar.',
      url: 'https://belpas.sakarya.bel.tr/',
      keywords: 'BELPAŞ, Sakarya, Büyükşehir Belediyesi, sosyal tesisler, kafeterya, ihaleler'
    });

    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      'name': 'BELPAŞ - Sakarya Büyükşehir Belediyesi A.Ş.',
      'url': 'https://belpas.sakarya.bel.tr',
      'logo': 'https://belpas.sakarya.bel.tr/images/sbb_seffaf.png'
    });

    this.sliderBaslat();
    this.verileriYukle();
  }

  verileriYukle() {
    console.log('Anasayfa verileriYukle started');
    // Tesisleri Yükle
    this.tesisService.getTesisler().subscribe({
      next: (data) => {
        console.log('Anasayfa Tesisler data received:', data);
        this.tesisler = data.map(t => ({
          id: t.id,
          ad: t.ad,
          kategori: t.kategori,
          renk: t.renk || '#8B4513',
          harf: t.harf || t.ad.charAt(0)
        }));
      },
      error: (err) => console.error('Anasayfa Tesisler yüklenirken hata oluştu:', err)
    });

    // Haberleri Yükle (Son 3 haber)
    this.haberService.getHaberler().subscribe({
      next: (data) => {
        console.log('Anasayfa Haberler data received:', data);
        this.haberler = data.map(h => ({
          id: h.id,
          kategori: h.kategori,
          baslik: h.baslik,
          aciklama: h.ozet,
          tarih: new Date(h.olusturmaTarihi).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          link: '/haberler',
          resimUrl: h.resimUrl
        })).slice(0, 3);
      },
      error: (err) => console.error('Anasayfa Haberler yüklenirken hata oluştu:', err)
    });
  }

  ngOnDestroy() {
    this.sliderDurdur();
  }

  sliderBaslat() {
    this.sliderZamanlayici = setInterval(() => {
      this.sonrakiSlide();
    }, 5000);
  }

  sliderDurdur() {
    if (this.sliderZamanlayici) {
      clearInterval(this.sliderZamanlayici);
    }
  }

  sliderGit(index: number) {
    this.aktifSlide.set(index);
    this.sliderDurdur();
    this.sliderBaslat();
  }

  oncekiSlide() {
    const yeni = (this.aktifSlide() - 1 + this.sliderlar.length) % this.sliderlar.length;
    this.sliderGit(yeni);
  }

  sonrakiSlide() {
    const yeni = (this.aktifSlide() + 1) % this.sliderlar.length;
    this.aktifSlide.set(yeni);
  }

  tesisSol() {
    if (this.aktifTesisBaslangic() > 0) {
      this.aktifTesisBaslangic.update(v => v - 1);
    }
  }

  tesisSag() {
    if (this.aktifTesisBaslangic() < this.tesisler.length - this.tesisGoruntulenen) {
      this.aktifTesisBaslangic.update(v => v + 1);
    }
  }

  goruntelenecekTesisler() {
    return this.tesisler.slice(
      this.aktifTesisBaslangic(),
      this.aktifTesisBaslangic() + this.tesisGoruntulenen
    );
  }
}