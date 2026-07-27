import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-ilanlar',
  imports: [],
  templateUrl: './ilanlar.html',
  styleUrl: './ilanlar.scss',
})
export class Ilanlar implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Satın Alma İlanları | BELPAŞ',
      description: 'BELPAŞ\'ın güncel satın alma ve ihale ilanlarını inceleyin. Teklif ve başvuru süreçleri hakkında bilgi alın.',
      url: 'https://belpas.sakarya.bel.tr/ihaleler/ilanlar',
      keywords: 'BELPAŞ ihale ilanları, satın alma ilanı, belediye ihale'
    });
  }
}
