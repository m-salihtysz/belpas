import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sayfalar/anasayfa/anasayfa').then(m => m.Anasayfa),
    title: 'BELPAŞ | Sakarya Büyükşehir Sosyal Tesisler'
  },
  {
    path: 'kurumsal',
    loadComponent: () =>
      import('./sayfalar/kurumsal/kurumsal').then(m => m.Kurumsal),
    title: 'Kurumsal Bilgilerimiz | Sakarya BELPAŞ'
  },
  {
    path: 'kurumsal/hakkimizda',
    loadComponent: () =>
      import('./sayfalar/kurumsal/hakkimizda/hakkimizda').then(m => m.Hakkimizda),
    title: 'Kurumsal Hakkımızda | Sakarya BELPAŞ'
  },
  {
    path: 'kurumsal/organizasyon-semasi',
    loadComponent: () =>
      import('./sayfalar/kurumsal/organizasyon-semasi/organizasyon-semasi').then(m => m.OrganizasyonSemasi),
    title: 'Organizasyon Şeması | Sakarya BELPAŞ'
  },
  {
    path: 'kurumsal/kurumsal-kimlik',
    loadComponent: () =>
      import('./sayfalar/kurumsal/kurumsal-kimlik/kurumsal-kimlik').then(m => m.KurumsalKimlik),
    title: 'Kurumsal Kimlik & Logo | Sakarya BELPAŞ'
  },
  {
    path: 'kurumsal/faaliyet-raporu',
    loadComponent: () =>
      import('./sayfalar/kurumsal/faaliyet-raporu/faaliyet-raporu').then(m => m.FaaliyetRaporu),
    title: 'Faaliyet Raporları | Sakarya BELPAŞ'
  },
  {
    path: 'tesisler',
    loadComponent: () =>
      import('./sayfalar/tesisler/tesisler').then(m => m.Tesisler),
    title: 'Birimlerimiz & Sosyal Alanlar | BELPAŞ'
  },
  {
    path: 'tesisler/:slug',
    loadComponent: () =>
      import('./sayfalar/tesisler/tesis-detay/tesis-detay').then(m => m.TesisDetay),
    title: 'Tesis Detayı | BELPAŞ'
  },

  // YENİ EKLENEN HABERLER SAYFASI
  {
    path: 'haberler',
    loadComponent: () =>
      import('./sayfalar/haberler/haberler').then(m => m.Haberler),
    title: 'Güncel Haberler & Duyurular | BELPAŞ'
  },
  {
    path: 'haberler/:slug',
    loadComponent: () =>
      import('./sayfalar/haberler/haber-detay.component').then(m => m.HaberDetayComponent),
    title: 'Haber Detayı & İçeriği | BELPAŞ'
  },

  {
    path: 'iletisim',
    loadComponent: () =>
      import('./sayfalar/iletisim/iletisim').then(m => m.Iletisim),
    title: 'İletişim & Konum Bilgileri | BELPAŞ'
  },
  {
    path: '**',
    redirectTo: ''
  }
];