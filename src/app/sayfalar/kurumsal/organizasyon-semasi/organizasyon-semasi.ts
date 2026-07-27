import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-organizasyon-semasi',
  imports: [],
  templateUrl: './organizasyon-semasi.html',
  styleUrl: './organizasyon-semasi.scss'
})
export class OrganizasyonSemasi implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Organizasyon Şeması | BELPAŞ',
      description: 'BELPAŞ A.Ş. yönetim ve organizasyon yapısını gösteren şema.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/organizasyon-semasi',
      keywords: 'BELPAŞ organizasyon şeması, yönetim yapısı, üst yönetim'
    });
  }
}
