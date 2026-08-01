import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NewsService } from '../../services/news.service';
import { FacilityService } from '../../services/facility.service';
import { SeoService } from '../../services/seo.service';
import { EventService } from '../../services/event.service';

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
  resimUrl?: string;
  logoUrl?: string;
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
export class Anasayfa implements OnInit, OnDestroy {
  private haberService = inject(NewsService);
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService);
  private eventService = inject(EventService);

  sliderlar: Slide[] = [
    {
      id: 1,
      kategori: 'BELPAŞ\'A HOŞ GELDİNİZ',
      baslik: 'NEHİR ÇİKOLATA EŞSİZ LEZZET',
      altyazi: 'DUBAİ LEZZETİ',
      aciklama: 'Her lokmada geleneksel tatları modern dokunuşlarla buluşturan prestijli Nehir Çikolata serimiz.',
      btnMetni: 'KEŞFEDİN',
      btnLink: '/tesisler',
      resimYolu: '/images/çikolata.jpeg',
      logoYolu: '/images/nehir-logo.png'
    },
    {
      id: 2,
      kategori: 'HİZMET NOKTALARI VE TESİSLER',
      baslik: 'ŞEHRE HAYAT İNSANA DEĞER KATAN MEKANLAR',
      altyazi: 'SOSYAL TESİSLER',
      aciklama: 'Sakarya genelinde konfor, kalite ve lezzeti bir araya getiren prestijli sosyal yaşam alanlarımız.',
      btnMetni: 'TESİSLERİMİZ',
      btnLink: '/tesisler',
      resimYolu: '/images/sbb_mekan.jpg',
      logoYolu: '/images/sbb_seffaf.png'
    },
    {
      id: 3,
      kategori: 'DİJİTAL VE AKILLI ŞEHİR ÇÖZÜMLERİ',
      baslik: 'ULAŞIMDA VE KENTE DİJİTAL KOLAYLIK',
      altyazi: 'KENT REHBERİ',
      aciklama: 'Büyükşehrin tüm ulaşım hatları, harita bilgileri ve sosyal imkanlarına tek tıkla kolayca erişin.',
      btnMetni: 'İNCELEYİN',
      btnLink: '/haberler',
      resimYolu: '/images/kent_rehberi_bg.png',
      logoYolu: '/images/screen3.png'
    }
  ];

  // Custom slider state
  activeSlide = 0;
  prevSlide = -1;
  isAnimating = false;
  private sliderTimer: any;
  readonly SLIDE_INTERVAL = 6000;

  tesisler: Tesis[] = [];
  haberler: Haber[] = [];
  
  // Dinamik Kent Rehberi Banner Objesi (İleride DB / API'den yüklenebilir)
  kentRehberiBanner = {
    rozet: 'KENT REHBERİ',
    baslikSol: 'SAKARYA BÜYÜKŞEHİR',
    baslikSag: 'KENT REHBERİ',
    aciklama: 'Sakarya Büyükşehir Belediyesi ulaşım hatları, harita bilgileri ve sosyal imkanlarına tek tıkla kolayca ulaşın.',
    gorselUrl: '/images/bottom-banner-1775830519-609.png',
    link: 'https://rehber.sakarya.bel.tr/harita/kent/sosyal-tesisler'
  };

  birimler = [
    { id: 1, ad: 'Catering & Kafeteryalar', aciklama: 'Kurumsal yemek hizmetleri ve kafeteryalarımız', ikon: 'pi-coffee', link: '/tesisler' },
    { id: 2, ad: 'Sosyal Tesisler', aciklama: 'Spor alanları, dinlenme ve rekreasyon tesisleri', ikon: 'pi-building', link: '/tesisler' },
    { id: 3, ad: 'Haberler & Duyurular', aciklama: 'Güncel kurumsal haberler ve basın açıklamaları', ikon: 'pi-megaphone', link: '/haberler' },
    { id: 4, ad: 'İletişim', aciklama: 'Bize ulaşın, görüş ve önerilerinizi paylaşın', ikon: 'pi-phone', link: '/iletisim' },
  ];

  etkinlikler: any[] = [];

  private timerInterval: any;

  startAutoplay() {
    this.stopAutoplay();
    this.sliderTimer = setInterval(() => this.nextSlide(), this.SLIDE_INTERVAL);
  }

  stopAutoplay() {
    if (this.sliderTimer) clearInterval(this.sliderTimer);
  }

  goToSlide(index: number) {
    if (this.isAnimating || index === this.activeSlide) return;
    this.isAnimating = true;
    this.prevSlide = this.activeSlide;
    this.activeSlide = index;
    setTimeout(() => {
      this.isAnimating = false;
      this.prevSlide = -1;
    }, 900);
    this.startAutoplay();
  }

  nextSlide() {
    const next = (this.activeSlide + 1) % this.sliderlar.length;
    this.goToSlide(next);
  }

  prevSlideAction() {
    const prev = (this.activeSlide - 1 + this.sliderlar.length) % this.sliderlar.length;
    this.goToSlide(prev);
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 5,
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
        breakpoint: '576px',
        numVisible: 2,
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
    this.startAutoplay();
  }

  getEventImage(e: any): string {
    if (e.resimUrl && e.resimUrl.includes('/images/')) {
      return e.resimUrl;
    }
    if (e.id === 1 || (e.baslik && e.baslik.toLowerCase().includes('kıraathane'))) return '/images/Millet_Kıraathanesi.jpg';
    if (e.id === 2 || (e.baslik && e.baslik.toLowerCase().includes('ormanpark'))) return '/images/OrmanPark.jpg';
    if (e.id === 3 || (e.baslik && e.baslik.toLowerCase().includes('acarlar'))) return '/images/Acarlar_Longozu.jpg';
    if (e.id === 4 || (e.baslik && e.baslik.toLowerCase().includes('kocaali'))) return '/images/Kocaali_Sosyal_Tesisleri.jpg';
    if (e.id === 5 || (e.baslik && e.baslik.toLowerCase().includes('nehir'))) return '/images/Erenler_Kafe.jpg';
    return e.resimUrl || '/images/Acarlar_Longozu.jpg';
  }

  getHaberImage(h: any): string {
    if (h.resimUrl && h.resimUrl.includes('/images/')) return h.resimUrl;
    if (h.id === 1) return '/images/kent_rehberi.png';
    if (h.id === 2) return '/images/sbb_mekan.jpg';
    return '/images/sbb_mekan.jpg';
  }

  verileriYukle() {
    this.tesisService.getTesisler().subscribe({
      next: (data: any[]) => {
        this.tesisler = data.map((t: any) => ({
          id: t.id,
          ad: t.ad,
          kategori: t.kategori,
          renk: t.renk || '#0284C7',
          harf: t.harf || t.ad.charAt(0),
          resimUrl: t.resimUrl,
          logoUrl: t.logoUrl
        }));
      },
      error: (err: any) => console.error('Anasayfa Tesisler yüklenirken hata oluştu:', err)
    });

    this.haberService.getHaberler().subscribe({
      next: (data: any[]) => {
        this.haberler = data.map((h: any) => ({
          id: h.id,
          kategori: h.kategori,
          baslik: h.baslik,
          aciklama: h.ozet,
          tarih: new Date(h.olusturmaTarihi).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
          link: '/haberler/' + (h.slug || h.id),
          resimUrl: this.getHaberImage(h)
        })).slice(0, 4);
      },
      error: (err: any) => console.error('Anasayfa Haberler yüklenirken hata oluştu:', err)
    });

    this.eventService.getEtkinlikler().subscribe({
      next: (data: any[]) => {
        this.etkinlikler = data.map((e: any) => ({
          id: e.id,
          baslik: e.baslik,
          kategori: e.kategori,
          tarih: e.tarih,
          saat: e.saat,
          konum: e.konum,
          ozet: e.ozet,
          resimUrl: this.getEventImage(e),
          link: '/kurumsal/etkinlikler'
        })).slice(0, 4);
      },
      error: (err: any) => console.error('Anasayfa Etkinlikler yüklenirken hata oluştu:', err)
    });
  }
}