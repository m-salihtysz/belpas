import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-surec',
  imports: [],
  templateUrl: './surec.html',
  styleUrl: './surec.scss',
})
export class Surec implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Satın Alma Süreci | BELPAŞ',
      description: 'BELPAŞ ihale ve satın alma sürecinin adımları, başvuru yöntemleri ve takip bilgileri.',
      url: 'https://belpas.sakarya.bel.tr/ihaleler/surec',
      keywords: 'BELPAŞ satın alma süreci, ihale süreci, başvuru aşamaları'
    });
  }
}
