import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-kurumsal',
  imports: [],
  templateUrl: './kurumsal.html',
  styleUrl: './kurumsal.scss'
})
export class Kurumsal implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Kurumsal | BELPAŞ',
      description: 'BELPAŞ kurumsal yapısı, misyon ve vizyonu, organizasyon şeması ve faaliyet raporları.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal',
      keywords: 'BELPAŞ kurumsal, misyon, vizyon, organizasyon, Sakarya belediyesi iştiraki'
    });
  }
}
