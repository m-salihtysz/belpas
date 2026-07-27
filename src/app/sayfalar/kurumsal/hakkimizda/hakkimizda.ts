import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-hakkimizda',
  imports: [],
  templateUrl: './hakkimizda.html',
  styleUrl: './hakkimizda.scss'
})
export class Hakkimizda implements OnInit {
  private seoService = inject(SeoService);

  istatistikler = [
    { deger: '1992', etiket: 'Kuruluş Yılı' },
    { deger: '%100', etiket: 'Sakarya B.Şehir Belediyesi İştiraki' },
    { deger: '700.000.000 TL', etiket: 'Sermaye Yapısı' }
  ];

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Hakkımızda | BELPAŞ',
      description: '1992 yılında kurulan BELPAŞ, Sakarya Büyükşehir Belediyesi\'nin %100 iştiraki olarak sosyal tesisler ve kurumsal hizmetler sunmaktadır.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/hakkimizda',
      keywords: 'BELPAŞ hakkında, kuruluş tarihi, Sakarya, belediye iştiraki, sermaye yapısı'
    });

    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'BELPAŞ Hakkımızda',
      'url': 'https://belpas.sakarya.bel.tr/kurumsal/hakkimizda',
      'description': '1992\'den bu yana Sakarya\'ya hizmet eden BELPAŞ A.Ş. kurumsal sayfası.'
    });
  }
}
