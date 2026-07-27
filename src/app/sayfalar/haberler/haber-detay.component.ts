import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsService, Haber } from '../../services/news.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-haber-detay',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './haber-detay.component.html',
  styleUrl: './haber-detay.component.scss'
})
export class HaberDetayComponent implements OnInit {
  private haberService = inject(NewsService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);
  
  haber = signal<Haber | null>(null);
  yukleniyor = signal(true);
  hata = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.hata.set(true);
      this.yukleniyor.set(false);
      return;
    }
    
    this.haberService.getHaber(id).subscribe({
      next: (data) => {
        this.haber.set(data);
        this.yukleniyor.set(false);

        // SEO Meta Etiketleri
        this.seoService.generateTags({
          title: data.baslik,
          description: data.ozet,
          image: data.resimUrl,
          url: `https://belpas.sakarya.bel.tr/haberler/${data.id}`,
          type: 'article'
        });

        // JSON-LD NewsArticle Şeması
        this.seoService.setJsonLd({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          'headline': data.baslik,
          'description': data.ozet,
          'image': data.resimUrl,
          'datePublished': data.olusturmaTarihi,
          'publisher': {
            '@type': 'Organization',
            'name': 'BELPAŞ - Sakarya Büyükşehir Belediyesi A.Ş.',
            'url': 'https://belpas.sakarya.bel.tr'
          }
        });
      },
      error: (err) => {
        console.error('Haber detay yüklenemedi:', err);
        this.hata.set(true);
        this.yukleniyor.set(false);
      }
    });
  }
}