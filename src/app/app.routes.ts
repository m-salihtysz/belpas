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
    path: 'kurumsal/etkinlikler',
    loadComponent: () =>
      import('./sayfalar/kurumsal/etkinlikler/etkinlikler').then(m => m.Etkinlikler),
    title: 'Kültür & Sanat Etkinlikleri | BELPAŞ'
  },
  {
    path: 'tesisler',
    loadComponent: () =>
      import('./sayfalar/tesisler/tesisler').then(m => m.Tesisler),
    title: 'Tesislerimiz & Sosyal Alanlar | BELPAŞ'
  },
  {
    path: 'tesisler/:slug',
    loadComponent: () =>
      import('./sayfalar/tesis-detay/tesis-detay').then(m => m.TesisDetay),
    title: 'Tesis Detayı & Menü Kartı | BELPAŞ'
  },
  {
    path: 'ihaleler',
    loadComponent: () =>
      import('./sayfalar/ihaleler/ihaleler').then(m => m.Ihaleler),
    title: 'Satın Alma İhaleleri | Sakarya BELPAŞ'
  },
  
  // EKLENEN YENİ 4 ALT SAYFA BURADAN BAŞLIYOR
  {
    path: 'ihaleler/ilanlar',
    loadComponent: () =>
      import('./sayfalar/ihaleler/ilanlar/ilanlar').then(m => m.Ilanlar),
    title: 'Satın Alma İlanları | Sakarya BELPAŞ'
  },
  {
    path: 'ihaleler/komisyon',
    loadComponent: () =>
      import('./sayfalar/ihaleler/komisyon/komisyon').then(m => m.Komisyon),
    title: 'Satın Alma Komisyonu | Sakarya BELPAŞ'
  },
  {
    path: 'ihaleler/kriterler',
    loadComponent: () =>
      import('./sayfalar/ihaleler/kriterler/kriterler').then(m => m.Kriterler),
    title: 'Satın Alma Kriterleri | Sakarya BELPAŞ'
  },
  {
    path: 'ihaleler/surec',
    loadComponent: () =>
      import('./sayfalar/ihaleler/surec/surec').then(m => m.Surec),
    title: 'Satın Alma Süreci | Sakarya BELPAŞ'
  },
  // YENİ SAYFALAR BİTİŞ

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