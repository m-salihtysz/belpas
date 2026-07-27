import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MenubarModule, ButtonModule, InputTextModule, DialogModule, FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  aramaAcik: boolean = false;
  aramaMetni: string = '';

  ngOnInit() {
    this.items = [
      {
        label: 'Kurumsal',
        items: [
          { label: 'Hakkımızda', routerLink: '/kurumsal/hakkimizda' },
          { label: 'Organizasyon Şeması', routerLink: '/kurumsal/organizasyon-semasi' },
          { label: 'Kurumsal Kimlik', routerLink: '/kurumsal/kurumsal-kimlik' },
          { label: 'Faaliyet Raporu', routerLink: '/kurumsal/faaliyet-raporu' },
          { label: 'Etkinliklerimiz', routerLink: '/kurumsal/etkinlikler' }
        ]
      },
      {
        label: 'Satın Alma',
        items: [
          { label: 'Satın Alma İlanları', routerLink: '/ihaleler/ilanlar' },
          { label: 'Satın Alma Komisyonu', routerLink: '/ihaleler/komisyon' },
          { label: 'Satın Alma Kriterleri', routerLink: '/ihaleler/kriterler' },
          { label: 'Satın Alma Süreci', routerLink: '/ihaleler/surec' }
        ]
      },
      {
        label: 'Birimlerimiz',
        routerLink: '/tesisler'
      },
      {
        label: 'Haberler',
        routerLink: '/haberler'
      },
      {
        label: 'İletişim',
        items: [
          { label: 'Bize Ulaşın', routerLink: '/iletisim' },
          { label: 'Görüş ve Öneriler', routerLink: '/iletisim' }
        ]
      }
    ];
  }

  aramaAc() {
    this.aramaAcik = true;
  }

  aramaYap() {
    if (this.aramaMetni) {
      console.log('Arama:', this.aramaMetni);
      this.aramaAcik = false;
      this.aramaMetni = '';
    }
  }
}
