import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-faaliyet-raporu',
  imports: [],
  templateUrl: './faaliyet-raporu.html',
  styleUrl: './faaliyet-raporu.scss'
})
export class FaaliyetRaporu implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Faaliyet Raporu | BELPAŞ',
      description: 'BELPAŞ A.Ş. yıllık faaliyet raporları, mali veriler ve performans özeti.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/faaliyet-raporu',
      keywords: 'BELPAŞ faaliyet raporu, yıllık rapor, mali tablo, performans'
    });
  }
}
