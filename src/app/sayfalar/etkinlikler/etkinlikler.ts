import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { EventService, Etkinlik } from '../../services/event.service';

@Component({
  selector: 'app-etkinlikler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etkinlikler.html',
  styleUrl: './etkinlikler.scss'
})
export class Etkinlikler implements OnInit {
  private seoService = inject(SeoService);
  private eventService = inject(EventService);

  seciliKategori = signal<string>('Tümü');
  aramaMetni = signal<string>('');
  etkinlikler = signal<Etkinlik[]>([]);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Etkinliklerimiz | BELPAŞ',
      description: 'BELPAŞ sosyal tesislerinde gerçekleşen kültür, sanat, doğa ve aile etkinliklerini keşfedin.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/etkinlikler',
      keywords: 'BELPAŞ etkinlikler, Sakarya kültür sanat, Millet kıraathanesi söyleşi, Ormanpark kahvaltı'
    });

    this.eventService.getEtkinlikler().subscribe({
      next: (data) => this.etkinlikler.set(data),
      error: (err) => console.error('Etkinlikler yüklenirken hata oluştu:', err)
    });
  }

  kategoriSec(kategori: string): void {
    this.seciliKategori.set(kategori);
  }

  get filtrelenmisEtkinlikler(): Etkinlik[] {
    return this.etkinlikler().filter(e => {
      const katUyum = this.seciliKategori() === 'Tümü' || e.kategori === this.seciliKategori();
      const arama = this.aramaMetni().toLowerCase();
      const aramaUyum = !arama || e.baslik.toLowerCase().includes(arama) || e.konum.toLowerCase().includes(arama);
      return katUyum && aramaUyum;
    });
  }
}
