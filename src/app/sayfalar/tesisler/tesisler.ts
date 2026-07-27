import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FacilityService, Tesis } from '../../services/facility.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-tesisler',
  imports: [RouterLink],
  templateUrl: './tesisler.html',
  styleUrl: './tesisler.scss'
})
export class Tesisler implements OnInit {
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService);
  tesisler = signal<Tesis[]>([]);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Tesislerimiz | BELPAŞ',
      description: 'BELPAŞ bünyesindeki sosyal tesisler, kafeteryalar ve hizmet noktalarını keşfedin.',
      url: 'https://belpas.sakarya.bel.tr/tesisler',
      keywords: 'BELPAŞ tesisleri, Sakarya sosyal tesisler, kafeterya, aile facilityi',
      image: 'https://belpas.sakarya.bel.tr/images/sbb_mekan.jpg'
    });

    this.tesisService.getTesisler().subscribe({
      next: (data) => this.tesisler.set(data),
      error: (err) => console.error('Tesisler yüklenirken hata oluştu:', err)
    });
  }
}
