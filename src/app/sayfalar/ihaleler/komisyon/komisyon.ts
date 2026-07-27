import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-komisyon',
  imports: [],
  templateUrl: './komisyon.html',
  styleUrl: './komisyon.scss',
})
export class Komisyon implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Satın Alma Komisyonu | BELPAŞ',
      description: 'BELPAŞ Satın Alma Komisyonu üyeleri ve görev tanımları hakkında bilgi edinin.',
      url: 'https://belpas.sakarya.bel.tr/ihaleler/komisyon',
      keywords: 'BELPAŞ satın alma komisyonu, ihale komisyonu, üyeler'
    });
  }
}
