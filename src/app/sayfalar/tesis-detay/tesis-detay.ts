import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FacilityService, Tesis, MenuKategori } from '../../services/facility.service';
import { SeoService } from '../../services/seo.service'; 

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

  tesis = signal<Tesis | null>(null);
  menuKategorileri = signal<MenuKategori[]>([]);
  aktifSekme = signal<number>(0);
  menuModu = signal<'interaktif' | 'gorsel'>('interaktif');
  menuModalAcik = signal<boolean>(false);
  yukleniyor = signal(true);
  hata = signal(false);
  resimHata = signal(false);

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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.hata.set(true);
      this.yukleniyor.set(false);
      return;
    }

    this.tesisService.getTesis(id).subscribe({
      next: (data) => {
        this.tesis.set(data);
        this.menuKategorileri.set(this.tesisService.getMockMenuForFacility(id));
        this.yukleniyor.set(false);

        // Tesis modelindeki "ad" ve "aciklama" alanlarını kullanıyoruz
        if (data) {
          this.seoService.generateTags({
            title: data.ad,
            description: data.aciklama,
            image: data.resimUrl,
            url: `https://belpas.sakarya.bel.tr/tesisler/${data.id}`,
            keywords: `BELPAŞ, ${data.ad}, Sakarya tesisleri, sosyal tesis`
          });

          this.seoService.setJsonLd({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': data.ad,
            'description': data.aciklama,
            'image': data.resimUrl,
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Sakarya',
              'addressCountry': 'TR'
            }
          });
        }
      },
      error: (err) => {
        console.error('Tesis detay yüklenemedi:', err);
        this.hata.set(true);
        this.yukleniyor.set(false);
      }
    });
  }
}