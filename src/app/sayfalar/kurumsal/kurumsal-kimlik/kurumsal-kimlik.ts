import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-kurumsal-kimlik',
  imports: [],
  templateUrl: './kurumsal-kimlik.html',
  styleUrl: './kurumsal-kimlik.scss'
})
export class KurumsalKimlik implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Kurumsal Kimlik | BELPAŞ',
      description: 'BELPAŞ kurumsal kimlik rehberi; logo, renk paleti ve marka kullanım standartları.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/kurumsal-kimlik',
      keywords: 'BELPAŞ kurumsal kimlik, logo, marka, renk paleti',
      image: 'https://belpas.sakarya.bel.tr/images/belpaslogo.webp'
    });
  }
}
