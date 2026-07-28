import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NewsService } from '../../services/news.service';
import { FacilityService } from '../../services/facility.service';
import { SeoService } from '../../services/seo.service';

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
  imports: [RouterLink, CommonModule, CarouselModule, CardModule, ButtonModule],
  templateUrl: './anasayfa.html',
  styleUrl: './anasayfa.scss'
})
export class Anasayfa implements OnInit {
  private haberService = inject(NewsService);
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService);

  sliderlar: Slide[] = [
    {
      id: 1,
      kategori: 'Özel Lezzet',
      baslik: 'Nehir Çikolata',
      altyazi: 'Dubai Lezzeti',
      aciklama: 'Her lokmada geleneksel lezzetler, modern dokunuşlarla birleşiyor. Ofisinizde, kafenizde size özel.',
      btnMetni: 'Keşfedin',
      btnLink: '/tesisler',
      resimYolu: '/images/çikolata.jpeg',
      logoYolu: '/images/nehir-logo.png'
    },
    {
      id: 2,
      kategori: 'Kurumsal Hizmet',
      baslik: 'Şehre Değer',
      altyazi: 'Katan Mekanlar',
      aciklama: 'Sakarya\'yı yaşanabilir kılan sosyal tesisler ve hizmetlerle hayatınıza değer katıyoruz.',
      btnMetni: 'Tesislerimiz',
      btnLink: '/tesisler',
      resimYolu: '/images/sbb_mekan.jpg',
      logoYolu: '/images/sbb_seffaf.png'
    },
    {
      id: 3,
      kategori: 'Haberler',
      baslik: 'Sakarya Kent',
      altyazi: 'Rehberi',
      aciklama: 'Büyükşehrin tüm imkânlarını keşfedin. Sosyal, kültürel ve ticari hayatın tam ortasında BELPAŞ.',
      btnMetni: 'Daha Fazla',
      btnLink: '/haberler',
      resimYolu: '/images/kent_rehberi.png',
      logoYolu: '/images/screen3.png'
    }
  ];

  tesisler: any[] = [];
  haberler: any[] = [];

  // GPS En Yakın Tesis State
  enYakinTesis: any = null;
  gpsYukleniyor = false;
  gpsHata = '';

  // Etkinlik Takvimi
  etkinlikler = [
    {
      id: 1,
      baslik: 'Acarlar Longozu Fotoğrafçılık & Tabiat Gezisi',
      kategori: 'Doğa & Gezi',
      tarih: '30 Temmuz 2026',
      saat: '10:00',
      konum: 'Acarlar Longozu Tesis Alanı',
      ozet: 'Türkiye’nin en büyük subasar ormanında profesyonel fotoğrafçılar rehberliğinde eşsiz tabiat yürüyüşü ve fotoğraf atölyesi.',
      resimUrl: '/images/acarlar-longozu.png',
      link: '/kurumsal/etkinlikler'
    },
    {
      id: 2,
      baslik: 'Millet Kıraathanesi Gençlik & Yazar Söyleşisi',
      kategori: 'Kültür & Sanat',
      tarih: '1 Ağustos 2026',
      saat: '19:00',
      konum: 'Millet Bahçesi Kıraathane Salonu',
      ozet: 'Araştırmacı yazarlarımızın katılımıyla gençlere özel imza günü, kitap tahlili söyleşisi ve ikramlar.',
      resimUrl: '/images/millet-kiraathanesi.png',
      link: '/kurumsal/etkinlikler'
    },
    {
      id: 3,
      baslik: 'Ormanpark Doğa Yürüyüşü & Serpme Kahvaltı Buluşması',
      kategori: 'Aile & Spor',
      tarih: '3 Ağustos 2026',
      saat: '09:00',
      konum: 'Ormanpark Tesis Bahçesi',
      ozet: 'Asırlık çınarların gölgesinde sabah doğa yürüyüşü ve ardından zengin serpme kahvaltı keyfi.',
      resimUrl: '/images/ormanpark.png',
      link: '/kurumsal/etkinlikler'
    }
  ];

  private timerInterval: any;

  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
  ];

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

    this.verileriYukle();
  }

  enYakinTesisBul() {
    this.gpsYukleniyor = true;
    this.gpsHata = '';

    if (!navigator.geolocation) {
      this.fallbackEnYakin();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        let minDistance = Infinity;
        let closest: any = null;

        const coords: Record<number, { lat: number; lng: number }> = {
          1: { lat: 40.7685, lng: 30.3952 },
          2: { lat: 40.8351, lng: 30.3412 },
          3: { lat: 40.7712, lng: 30.4015 },
          4: { lat: 40.7548, lng: 30.4221 },
          5: { lat: 40.7735, lng: 30.3912 },
          6: { lat: 40.7758, lng: 30.4042 },
          7: { lat: 40.7728, lng: 30.4005 },
          8: { lat: 40.7621, lng: 30.3985 },
          9: { lat: 40.7695, lng: 30.3935 },
          10: { lat: 40.7645, lng: 30.3915 },
          11: { lat: 41.1215, lng: 30.6532 },
          12: { lat: 41.0558, lng: 30.8521 }
        };

        this.tesisler.forEach((t) => {
          const c = coords[t.id] || { lat: 40.773, lng: 30.395 };
          const d = this.calculateDistance(userLat, userLng, c.lat, c.lng);
          if (d < minDistance) {
            minDistance = d;
            closest = { ...t, mesafe: d.toFixed(1) };
          }
        });

        this.enYakinTesis = closest || { ...this.tesisler[0], mesafe: '1.2' };
        this.gpsYukleniyor = false;
      },
      (err) => {
        this.fallbackEnYakin();
      }
    );
  }

  private fallbackEnYakin() {
    setTimeout(() => {
      this.enYakinTesis = this.tesisler.length > 0 ? { ...this.tesisler[0], mesafe: '1.4' } : null;
      this.gpsYukleniyor = false;
    }, 600);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  verileriYukle() {
    this.tesisService.getTesisler().subscribe({
      next: (data: any[]) => {
        this.tesisler = data.map((t: any) => ({
          id: t.id,
          ad: t.ad,
          slug: t.slug,
          kategori: t.kategori,
          renk: t.renk || '#10B981',
          harf: t.harf || t.ad.charAt(0)
        }));
      },
      error: (err: any) => console.error('Anasayfa Tesisler yüklenirken hata oluştu:', err)
    });

    this.haberService.getHaberler().subscribe({
      next: (data: any[]) => {
        this.haberler = data.map((h: any) => ({
          id: h.id,
          slug: h.slug,
          kategori: h.kategori,
          baslik: h.baslik,
          aciklama: h.ozet,
          tarih: new Date(h.olusturmaTarihi).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          link: ['/haberler', h.slug || h.id],
          resimUrl: h.resimUrl
        })).slice(0, 3);
      },
      error: (err: any) => console.error('Anasayfa Haberler yüklenirken hata oluştu:', err)
    });
  }
}