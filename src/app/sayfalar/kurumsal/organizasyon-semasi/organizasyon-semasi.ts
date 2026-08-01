import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo.service';
import { CalisanService, Calisan } from '../../../services/calisan.service';

@Component({
  selector: 'app-organizasyon-semasi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizasyon-semasi.html',
  styleUrl: './organizasyon-semasi.scss'
})
export class OrganizasyonSemasi implements OnInit {
  private seoService = inject(SeoService);
  private calisanService = inject(CalisanService);

  genelMudur: Calisan | null = null;
  yardimcilar: Calisan[] = [];

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Organizasyon Şeması | BELPAŞ',
      description: 'BELPAŞ A.Ş. yönetim ve organizasyon yapısını gösteren şema.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/organizasyon-semasi',
      keywords: 'BELPAŞ organizasyon şeması, yönetim yapısı, üst yönetim'
    });

    this.calisanService.getCalisanlar().subscribe(data => {
      if (data && data.length > 0) {
        this.genelMudur = data.find(c => c.unvan.toLowerCase().includes('genel müdür') && !c.unvan.toLowerCase().includes('yardımc')) || data[0];
        this.yardimcilar = data.filter(c => c !== this.genelMudur);
      }
    });
  }
}
