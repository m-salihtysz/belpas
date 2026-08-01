import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService, Haber } from '../../services/news.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-haberler',
  imports: [RouterLink],
  templateUrl: './haberler.html',
  styleUrl: './haberler.scss'
})
export class Haberler implements OnInit {
  private haberService = inject(NewsService);
  private seoService = inject(SeoService);
  haberler = signal<Haber[]>([]);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Haberler | BELPAŞ',
      description: 'BELPAŞ\'ın güncel haberleri, duyuruları ve etkinlik bilgilerini takip edin.',
      url: 'https://belpas.sakarya.bel.tr/haberler',
      keywords: 'BELPAŞ haberler, Sakarya haberleri, belediye duyuruları, etkinlikler'
    });

    this.haberService.getHaberler().subscribe({
      next: (data) => {
        const sortedData = [...(data || [])].sort((a, b) => {
          const timeA = a.olusturmaTarihi ? new Date(a.olusturmaTarihi).getTime() : 0;
          const timeB = b.olusturmaTarihi ? new Date(b.olusturmaTarihi).getTime() : 0;
          return timeB - timeA || (b.id || 0) - (a.id || 0);
        });
        this.haberler.set(sortedData);
      },
      error: (err) => console.error('Haberler yüklenirken hata oluştu:', err)
    });
  }
}