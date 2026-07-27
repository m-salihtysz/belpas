import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-kriterler',
  imports: [],
  templateUrl: './kriterler.html',
  styleUrl: './kriterler.scss',
})
export class Kriterler implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Satın Alma Kriterleri | BELPAŞ',
      description: 'BELPAŞ ihale ve satın alma süreçlerinde uygulanan değerlendirme kriterleri ve şartlar.',
      url: 'https://belpas.sakarya.bel.tr/ihaleler/kriterler',
      keywords: 'BELPAŞ satın alma kriterleri, ihale şartları, değerlendirme'
    });
  }
}
