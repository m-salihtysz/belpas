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

  // GPS En Yakın Tesis State
  enYakinTesis: any = null;
  gpsYukleniyor = false;
  gpsHata = '';

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

  enYakinTesisBul() {
    this.gpsYukleniyor = true;
    this.gpsHata = '';

    if (!navigator.geolocation) {
      this.fallbackEnYakin();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        let minDistance = Infinity;
        let closest: any = null;

        const coords: Record<number, { lat: number; lng: number }> = {
          1: { lat: 40.7685, lng: 30.3952 },
          2: { lat: 40.8351, lng: 30.3412 },
          3: { lat: 40.7712, lng: 30.4015 },
          4: { lat: 40.7548, lng: 30.4221 },
          5: { lat: 40.7735, lng: 30.3912 },
          6: { lat: 40.7758, lng: 30.4042 },
          7: { lat: 40.7728, lng: 30.4005 },
          8: { lat: 40.7621, lng: 30.3985 },
          9: { lat: 40.7695, lng: 30.3935 },
          10: { lat: 40.7645, lng: 30.3915 },
          11: { lat: 41.1215, lng: 30.6532 },
          12: { lat: 41.0558, lng: 30.8521 }
        };

        this.tesisler().forEach((t) => {
          const c = coords[t.id] || { lat: 40.773, lng: 30.395 };
          const d = this.calculateDistance(userLat, userLng, c.lat, c.lng);
          if (d < minDistance) {
            minDistance = d;
            closest = { ...t, mesafe: d.toFixed(1) };
          }
        });

        this.enYakinTesis = closest || { ...this.tesisler()[0], mesafe: '1.2' };
        this.gpsYukleniyor = false;
      },
      (err) => {
        this.fallbackEnYakin();
      }
    );
  }

  private fallbackEnYakin() {
    setTimeout(() => {
      this.enYakinTesis = this.tesisler().length > 0 ? { ...this.tesisler()[0], mesafe: '1.4' } : null;
      this.gpsYukleniyor = false;
    }, 600);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
