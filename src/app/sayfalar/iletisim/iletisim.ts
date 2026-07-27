import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-iletisim',
  imports: [],
  templateUrl: './iletisim.html',
  styleUrl: './iletisim.scss'
})
export class Iletisim implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'İletişim | BELPAŞ',
      description: 'BELPAŞ ile iletişime geçin. Adres, telefon ve e-posta bilgilerine ulaşın.',
      url: 'https://belpas.sakarya.bel.tr/iletisim',
      keywords: 'BELPAŞ iletişim, Sakarya belediyesi iletişim, adres, telefon'
    });
  }
}
