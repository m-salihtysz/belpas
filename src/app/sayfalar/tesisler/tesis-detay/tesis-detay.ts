import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FacilityService, Tesis, MenuKategori } from '../../../services/facility.service';
import { SeoService } from '../../../services/seo.service'; 

@Component({
  selector: 'app-tesis-detay',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tesis-detay.html',
  styleUrl: './tesis-detay.scss'
})
export class TesisDetay implements OnInit {
  private route = inject(ActivatedRoute);
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService); 
  private sanitizer = inject(DomSanitizer);

  tesis = signal<Tesis | null>(null);
  menuKategorileri = signal<MenuKategori[]>([]);
  aktifSekme = signal<number>(0);
  menuModu = signal<'interaktif' | 'gorsel'>('interaktif');
  menuModalAcik = signal<boolean>(false);
  modalSayfa = signal<number>(1);
  yukleniyor = signal(true);
  hata = signal(false);
  resimHata = signal(false);

  getSafeMenuPdfUrl(): SafeResourceUrl | null {
    const url = this.tesis()?.menuPdfUrl;
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onResimHata(): void {
    this.resimHata.set(true);
  }

  sekmeDegistir(index: number): void {
    this.aktifSekme.set(index);
  }

  menuModuDegistir(mod: 'interaktif' | 'gorsel'): void {
    this.menuModu.set(mod);
  }

  modalAcKapat(durum: boolean): void {
    this.menuModalAcik.set(durum);
  }

  setModalSayfa(sayfa: number): void {
    this.modalSayfa.set(sayfa);
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('slug') || this.route.snapshot.paramMap.get('id');
    if (!param) {
      this.hata.set(true);
      this.yukleniyor.set(false);
      return;
    }

    this.tesisService.getTesis(param).subscribe({
      next: (data) => {
        this.tesis.set(data);
        this.menuKategorileri.set(this.tesisService.getMockMenuForFacility(data.id, data.slug, data.kategori));
        this.yukleniyor.set(false);

        if (data) {
          this.seoService.generateTags({
            title: `${data.ad} - Menü ve İletişim | Sakarya BELPAŞ`,
            description: data.aciklama,
            image: data.resimUrl,
            url: `https://belpas.sakarya.bel.tr/tesisler/${data.slug || data.id}`,
            keywords: `BELPAŞ, ${data.ad}, Sakarya tesisleri, sosyal tesis`
          });
        }
      },
      error: (err) => {
        console.warn('Tesis backend ulaşılamadı, yerel veri ve menü gösteriliyor:', err);
        const numericId = Number(param) || 1;
        const currentSlug = typeof param === 'string' ? param : 'belpas-tesis';
        // 12 Tesis için Varsayılan Yedek Veri ve Menü Yükleme
        const yedekTesis: Tesis = {
          id: numericId,
          ad: 'BELPAŞ Sosyal Tesisi',
          slug: currentSlug,
          kategori: 'Sosyal Tesis',
          renk: '#10B981',
          harf: 'B',
          aciklama: 'Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ güvencesiyle kaliteli ve leziz ikramlar sunulan sosyal tesisimizdir.',
          adres: 'Sakarya Büyükşehir Belediyesi Tesisler Bölgesi',
          telefon: '0264 272 00 10',
          resimUrl: '/images/sbb_mekan.jpg',
          konumUrl: 'https://maps.google.com',
          haftaIciSaat: '08:00 - 23:00',
          haftaSonuSaat: '08:00 - 23:30',
          aktif: true
        };
        this.tesis.set(yedekTesis);
        this.menuKategorileri.set(this.tesisService.getMockMenuForFacility(numericId, currentSlug, yedekTesis.kategori));
        this.hata.set(false);
        this.yukleniyor.set(false);
      }
    });
  }
}