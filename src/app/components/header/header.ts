import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuOgesi {
  etiket: string;
  link?: string;
  altMenuler?: { etiket: string; link: string }[];
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  kaydirildimi = signal(false);
  mobilMenuAcik = signal(false);
  aramaAcik = signal(false);
  aramaMetni = signal('');
  aktifDropdown = signal<string | null>(null);

  menuOgeleri: MenuOgesi[] = [
    {
      etiket: 'Kurumsal',
      altMenuler: [
        { etiket: 'Hakkımızda',          link: '/kurumsal/hakkimizda' },
        { etiket: 'Organizasyon Şeması', link: '/kurumsal/organizasyon-semasi' },
        { etiket: 'Kurumsal Kimlik',     link: '/kurumsal/kurumsal-kimlik' },
        { etiket: 'Faaliyet Raporu',     link: '/kurumsal/faaliyet-raporu' },
      ]
    },
    {
      etiket: 'Satın Alma',
      altMenuler: [
        { etiket: 'Satın Alma İlanları',  link: '/ihaleler/ilanlar' },
        { etiket: 'Satın Alma Komisyonu', link: '/ihaleler/komisyon' },
        { etiket: 'Satın Alma Kriterleri',link: '/ihaleler/kriterler' },
        { etiket: 'Satın Alma Süreci',    link: '/ihaleler/surec' },
      ]
    },
    {
      etiket: 'Birimlerimiz',
      link: '/tesisler'
    },
    {
      etiket: 'Haberler',
      link: '/haberler'
    },
    {
      etiket: 'İletişim',
      altMenuler: [
        { etiket: 'Bize Ulaşın',        link: '/iletisim' },
        { etiket: 'Görüş ve Öneriler',  link: '/iletisim' },
      ]
    }
  ];

  @HostListener('window:scroll')
  kaydirmaKontrol() {
    this.kaydirildimi.set(window.scrollY > 20);
  }

  @HostListener('document:keydown.escape')
  escKapat() {
    this.aramaAcik.set(false);
    this.aktifDropdown.set(null);
  }

  dropdownToggle(etiket: string) {
    this.aktifDropdown.set(
      this.aktifDropdown() === etiket ? null : etiket
    );
  }

  dropdownKapat() {
    // Küçük gecikme ile kapat (link tıklamaya zaman vermek için)
    setTimeout(() => this.aktifDropdown.set(null), 150);
  }

  mobilMenuToggle() {
    this.mobilMenuAcik.update(v => !v);
    if (this.mobilMenuAcik()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  mobilMenuKapat() {
    this.mobilMenuAcik.set(false);
    document.body.style.overflow = '';
  }

  aramaAc() {
    this.aramaAcik.set(true);
    setTimeout(() => {
      (document.getElementById('arama-input') as HTMLInputElement)?.focus();
    }, 100);
  }

  aramaKapat() {
    this.aramaAcik.set(false);
    this.aramaMetni.set('');
  }

  aramaYap() {
    if (this.aramaMetni()) {
      console.log('Arama:', this.aramaMetni());
      this.aramaKapat();
    }
  }
}
