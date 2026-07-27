import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  yil = new Date().getFullYear();

  hizliLinkler = [
    { etiket: 'Kurumsal Web Sitesi',    link: '/kurumsal' },
    { etiket: 'Açık Veri Portalı',      link: '/kurumsal' },
    { etiket: 'Hakkımızda',             link: '/kurumsal' },
    { etiket: 'Organizasyon Şeması',    link: '/kurumsal' },
    { etiket: 'Faaliyet Raporu',        link: '/kurumsal' },
  ];

  sosyalMedya = [
    { platform: 'Instagram', ikon: 'instagram', link: 'https://www.instagram.com/belpaskurumsal/' },
    { platform: 'Facebook',  ikon: 'facebook',  link: 'https://www.facebook.com/belpaskurumsal' },
    { platform: 'YouTube',   ikon: 'youtube',   link: 'https://www.youtube.com/@belpaskurumsal-sbb' },
    { platform: 'X (Twitter)', ikon: 'x',       link: 'https://x.com/belpaskurumsal1' },
    { platform: 'LinkedIn',  ikon: 'linkedin',  link: 'https://tr.linkedin.com/company/belpaskurumsal' },
  ];
}
