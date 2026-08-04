import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NewsService } from '../../services/news.service';
import { FacilityService } from '../../services/facility.service';
import { SeoService } from '../../services/seo.service';
import { SliderService } from '../../services/slider.service';

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
  standalone: true,
  imports: [RouterLink, CommonModule, CarouselModule, CardModule, ButtonModule],
  templateUrl: './anasayfa.html',
  styleUrl: './anasayfa.scss'
})
export class Anasayfa implements OnInit, OnDestroy {
  private haberService = inject(NewsService);
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService);
  private sliderService = inject(SliderService);

  sliderlar: Slide[] = [
    {
      id: 1,
      kategori: 'BELPAŞ\'A HOŞ GELDİNİZ',
      baslik: 'NEHİR ÇİKOLATA EŞSİZ LEZZET DUBAİ LEZZETİ',
      altyazi: '',
      aciklama: 'Her lokmada geleneksel tatları modern dokunuşlarla buluşturan prestijli Nehir Çikolata serimiz.',
      btnMetni: 'KEŞFEDİN',
      btnLink: '/tesisler',
      resimYolu: '/images/çikolata.jpeg',
      logoYolu: '/images/nehir-logo.png'
    },
    {
      id: 2,
      kategori: 'HİZMET NOKTALARI VE TESİSLER',
      baslik: 'ŞEHRE HAYAT İNSANA DEĞER KATAN MEKANLAR SOSYAL TESİSLER',
      altyazi: '',
      aciklama: 'Sakarya genelinde konfor, kalite ve lezzeti bir araya getiren prestijli sosyal yaşam alanlarımız.',
      btnMetni: 'TESİSLERİMİZ',
      btnLink: '/tesisler',
      resimYolu: '/images/sbb_mekan.jpg',
      logoYolu: '/images/sbb_seffaf.png'
    },
    {
      id: 3,
      kategori: 'DİJİTAL VE AKILLI ŞEHİR ÇÖZÜMLERİ',
      baslik: 'ULAŞIMDA VE KENTE DİJİTAL KOLAYLIK KENT REHBERİ',
      altyazi: '',
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

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1
    }
  ];
  
  // Dinamik Kent Rehberi Banner Objesi
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

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'BELPAŞ — Sakarya Büyükşehir Belediyesi İhtiyaç Maddeleri A.Ş.',
      description: 'Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ A.Ş. Sosyal tesisler, kafeteryalar, yöresel ürünler ve şehir içi tesis hizmetleri.',
      url: 'https://belpas.sakarya.bel.tr',
      keywords: 'BELPAŞ, Sakarya Büyükşehir Belediyesi, Ormanpark, Sosyal Tesisler, Kent Rehberi, Kart54'
    });

    this.verileriYukle();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  // --- CUSTOM SLIDER METOTLARI ---
  startAutoSlide() {
    this.stopAutoSlide();
    this.sliderTimer = setInterval(() => {
      this.nextSlide();
    }, this.SLIDE_INTERVAL);
  }

  stopAutoSlide() {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  }

  goToSlide(index: number) {
    if (index === this.activeSlide || this.isAnimating) return;
    this.prevSlide = this.activeSlide;
    this.activeSlide = index;
    this.isAnimating = true;

    setTimeout(() => {
      this.isAnimating = false;
    }, 850);

    this.startAutoSlide();
  }

  nextSlide() {
    if (this.isAnimating || !this.sliderlar || this.sliderlar.length === 0) return;
    const nextIdx = (this.activeSlide + 1) % this.sliderlar.length;
    this.goToSlide(nextIdx);
  }

  prevSlideAction() {
    if (this.isAnimating || !this.sliderlar || this.sliderlar.length === 0) return;
    const prevIdx = (this.activeSlide - 1 + this.sliderlar.length) % this.sliderlar.length;
    this.goToSlide(prevIdx);
  }

  getHaberImage(h: any): string {
    if (h.resimUrl && h.resimUrl.includes('/images/')) return h.resimUrl;
    if (h.id === 1) return '/images/kent_rehberi.png';
    if (h.id === 2) return '/images/sbb_mekan.jpg';
    return '/images/sbb_mekan.jpg';
  }

  verileriYukle() {
    // 1. Sliderlar API
    this.sliderService.getSliderlar().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.sliderlar = data.map(s => ({
            id: s.id,
            kategori: s.kategori || "BELPAŞ'A HOŞ GELDİNİZ",
            baslik: s.baslik,
            altyazi: '',
            aciklama: s.aciklama || '',
            btnMetni: s.btnMetni || 'KEŞFEDİN',
            btnLink: s.btnLink || '/tesisler',
            resimYolu: s.resimUrl,
            logoYolu: s.logoUrl || ''
          }));
        }
      },
      error: (err: any) => console.error('Anasayfa Sliderlar yüklenirken hata oluştu:', err)
    });

    // 2. Tesisler API
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

    // 3. Haberler API
    this.haberService.getHaberler().subscribe({
      next: (data: any[]) => {
        const sorted = [...(data || [])].sort((a, b) => {
          const timeA = a.olusturmaTarihi ? new Date(a.olusturmaTarihi).getTime() : 0;
          const timeB = b.olusturmaTarihi ? new Date(b.olusturmaTarihi).getTime() : 0;
          return timeB - timeA || (b.id || 0) - (a.id || 0);
        });
        this.haberler = sorted.map((h: any) => ({
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
  }
}