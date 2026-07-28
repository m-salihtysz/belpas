import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FacilityService, Tesis } from '../../services/facility.service';

interface AramaSonucu {
  label: string;
  alt?: string;
  link: string;
  ikon: string;
  tip: 'sayfa' | 'tesis';
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, MenubarModule, ButtonModule, InputTextModule, DialogModule, FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private tesisService = inject(FacilityService);

  items: MenuItem[] | undefined;
  aramaAcik: boolean = false;
  aramaMetni: string = '';
  menuAcik: boolean = false;
  sonuclar: AramaSonucu[] = [];
  tesisler: Tesis[] = [];

  private sayfalar: AramaSonucu[] = [
    { label: 'Ana Sayfa', link: '/', ikon: 'pi-home', tip: 'sayfa' },
    { label: 'Birimlerimiz', alt: 'Tesisler Birimler', link: '/tesisler', ikon: 'pi-building', tip: 'sayfa' },
    { label: 'Haberler', alt: 'Duyurular Haber', link: '/haberler', ikon: 'pi-megaphone', tip: 'sayfa' },
    { label: 'Etkinlikler', alt: 'Etkinliklerimiz', link: '/kurumsal/etkinlikler', ikon: 'pi-calendar', tip: 'sayfa' },
    { label: 'İletişim', alt: 'Iletisim', link: '/iletisim', ikon: 'pi-phone', tip: 'sayfa' },
    { label: 'Hakkımızda', alt: 'Kurumsal', link: '/kurumsal/hakkimizda', ikon: 'pi-info-circle', tip: 'sayfa' },
    { label: 'Organizasyon Şeması', link: '/kurumsal/organizasyon-semasi', ikon: 'pi-sitemap', tip: 'sayfa' },
    { label: 'Kurumsal Kimlik', link: '/kurumsal/kurumsal-kimlik', ikon: 'pi-star', tip: 'sayfa' },
    { label: 'Faaliyet Raporu', link: '/kurumsal/faaliyet-raporu', ikon: 'pi-file', tip: 'sayfa' },
    { label: 'Satın Alma İlanları', alt: 'İhaleler İlan', link: '/ihaleler/ilanlar', ikon: 'pi-shopping-bag', tip: 'sayfa' },
    { label: 'Satın Alma Komisyonu', link: '/ihaleler/komisyon', ikon: 'pi-users', tip: 'sayfa' },
    { label: 'Satın Alma Kriterleri', link: '/ihaleler/kriterler', ikon: 'pi-list', tip: 'sayfa' },
    { label: 'Satın Alma Süreci', link: '/ihaleler/surec', ikon: 'pi-arrow-right', tip: 'sayfa' },
  ];

  ngOnInit() {
    this.tesisService.getTesisler().subscribe({
      next: (data) => this.tesisler = data,
      error: () => {}
    });
  }

  aramaAc() {
    this.aramaAcik = true;
    this.sonuclar = [];
    this.aramaMetni = '';
  }

  aramaFiltrele() {
    const q = this.aramaMetni.trim().toLowerCase();
    if (!q || q.length < 2) {
      this.sonuclar = [];
      return;
    }

    const sayfaEslesmeler = this.sayfalar.filter(s =>
      s.label.toLowerCase().includes(q) || (s.alt?.toLowerCase().includes(q))
    );

    const tesisEslesmeler: AramaSonucu[] = this.tesisler
      .filter(t => t.ad.toLowerCase().includes(q) || t.kategori?.toLowerCase().includes(q))
      .map(t => ({
        label: t.ad,
        alt: t.kategori,
        link: `/tesisler/${t.id}`,
        ikon: 'pi-map-marker',
        tip: 'tesis' as const
      }));

    this.sonuclar = [...sayfaEslesmeler, ...tesisEslesmeler].slice(0, 8);
  }

  secimYap(sonuc: AramaSonucu) {
    this.router.navigateByUrl(sonuc.link);
    this.aramaAcik = false;
    this.aramaMetni = '';
    this.sonuclar = [];
  }

  aramaYap() {
    if (this.sonuclar.length > 0) {
      this.secimYap(this.sonuclar[0]);
      return;
    }
    if (this.aramaMetni.trim()) {
      this.router.navigate(['/haberler']);
      this.aramaAcik = false;
      this.aramaMetni = '';
    }
  }
}
