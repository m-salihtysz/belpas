import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-ihaleler',
  imports: [],
  templateUrl: './ihaleler.html',
  styleUrl: './ihaleler.scss'
})
export class Ihaleler implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Satın Alma | BELPAŞ',
      description: 'BELPAŞ satın alma ilanları, komisyon bilgileri, kriterler ve ihale süreci hakkında bilgi edinin.',
      url: 'https://belpas.sakarya.bel.tr/ihaleler',
      keywords: 'BELPAŞ ihale, satın alma, ihale ilanları, Sakarya belediyesi ihale'
    });
  }
}
