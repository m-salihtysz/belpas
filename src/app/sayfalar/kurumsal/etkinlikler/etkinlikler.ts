import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../services/seo.service';

export interface Etkinlik {
  id: number;
  baslik: string;
  kategori: string;
  ozet: string;
  detay: string;
  tarih: string;
  saat: string;
  konum: string;
  resimUrl: string;
  kontenjan: string;
  ucretsiz: boolean;
  populer?: boolean;
}

@Component({
  selector: 'app-etkinlikler',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './etkinlikler.html',
  styleUrl: './etkinlikler.scss'
})
export class Etkinlikler implements OnInit {
  private seoService = inject(SeoService);

  seciliKategori = signal<string>('Tümü');
  aramaMetni = signal<string>('');

  etkinlikler = signal<Etkinlik[]>([
    {
      id: 1,
      baslik: 'Millet Kıraathanesi Gençlik & Yazar Söyleşisi',
      kategori: 'Kültür & Sanat',
      ozet: 'Ünlü araştırmacı yazarlarımızın katılımıyla gerçekleşecek olan imza günü ve gençlik söyleşisi.',
      detay: 'Sakarya Millet Bahçesi içerisindeki Millet Kıraathanemizde düzenlenecek bu özel etkinlikte kitap tahlili, yazar söyleşisi ve katılımcılara ücretsiz çay ikramı yapılacaktır.',
      tarih: '1 Ağustos 2026',
      saat: '19:00',
      konum: 'Sakarya Millet Bahçesi Kıraathanesi',
      resimUrl: '/images/millet-kiraathanesi.png',
      kontenjan: '150 Kişi',
      ucretsiz: true,
      populer: true
    },
    {
      id: 2,
      baslik: 'Ormanpark Doğa Yürüyüşü & Serpme Kahvaltı Buluşması',
      kategori: 'Doğa & Spor',
      ozet: 'Asırlık çınar ağaçları altında sabah doğa yürüyüşü ve ardından leziz serpme kahvaltı.',
      detay: 'Ormanpark tesislerimizin eşsiz doğasında temiz hava eşliğinde yürüyüşümüz saat 09:00 da başlayacak, ardından tesis bahçemizde kahvaltı ikramı sunulacaktır.',
      tarih: '3 Ağustos 2026',
      saat: '09:00',
      konum: 'Ormanpark Tesis Bahçesi',
      resimUrl: '/images/ormanpark.png',
      kontenjan: '200 Kişi',
      ucretsiz: false,
      populer: true
    },
    {
      id: 3,
      baslik: 'Acarlar Longozu Fotoğrafçılık & Tabiat Gezisi',
      kategori: 'Doğa & Spor',
      ozet: 'Türkiye’nin en büyük subasar ormanında profesyonel fotoğrafçılarla doğa keşif rotası.',
      detay: 'Karasu Acarlar Longozu yürüyüş yolunda rehber eşliğinde flora ve fauna gözlemi yapılıp, ahşap seyir terasında fotoğraf atölyesi gerçekleştirilecektir.',
      tarih: '5 Ağustos 2026',
      saat: '10:30',
      konum: 'Acarlar Longozu Tesis Alanı',
      resimUrl: '/images/acarlar-longozu.png',
      kontenjan: '80 Kişi',
      ucretsiz: true,
      populer: false
    },
    {
      id: 4,
      baslik: 'Kocaali Sahili Çocuk Açık Hava Sinema Etkinliği',
      kategori: 'Çocuk & Aile',
      ozet: 'Mavi bayraklı Kocaali sahil tesislerimizde çocuklar için patlamış mısır eşliğinde açık hava sineması.',
      detay: 'Kadınlar ve aileler plaj alanında akşam gün batımıyla birlikte dev perdede eğlenceli animasyon çizgi film gösterimi sunulacaktır.',
      tarih: '8 Ağustos 2026',
      saat: '20:30',
      konum: 'Kocaali Sosyal Tesisleri Sahil Etkinlik Alanı',
      resimUrl: '/images/kocaali-sosyal-tesisleri.png',
      kontenjan: 'Açık Alan',
      ucretsiz: true,
      populer: true
    },
    {
      id: 5,
      baslik: 'Nehir Kafeterya Akustik Canlı Müzik Dinletisi',
      kategori: 'Kültür & Sanat',
      ozet: 'Sakarya Nehri kıyısında ney ve gitar eşliğinde akustik müzik dinletisi.',
      detay: 'Sakarya Park içerisinde yer alan Nehir Kafeteryamızda nehir manzarasına karşı dinlendirici canlı müzik performansı.',
      tarih: '12 Ağustos 2026',
      saat: '20:00',
      konum: 'Nehir Kafeterya Tesisleri (Erenler)',
      resimUrl: '/images/nehir-kafeterya.png',
      kontenjan: 'Tesis Kapasitesi',
      ucretsiz: true,
      populer: false
    }
  ]);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Etkinliklerimiz | BELPAŞ',
      description: 'BELPAŞ sosyal tesislerinde gerçekleşen kültür, sanat, doğa ve aile etkinliklerini keşfedin.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/etkinlikler',
      keywords: 'BELPAŞ etkinlikler, Sakarya kültür sanat, Millet kıraathanesi söyleşi, Ormanpark kahvaltı'
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
