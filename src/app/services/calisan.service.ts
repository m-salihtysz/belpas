import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Calisan {
  id: number;
  adSoyad: string;
  unvan: string;
  departman?: string;
  eposta?: string;
  telefon?: string;
  fotoUrl?: string;
  ozgecmis?: string;
  gorevler?: string;
  sira: number;
  aktif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CalisanService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/calisanlar';

  getCalisanlar(): Observable<Calisan[]> {
    return this.http.get<Calisan[]>(this.apiUrl).pipe(
      catchError(err => {
        console.warn('Calisanlar backend API ulaşılamadı, varsayılan liste kullanılıyor:', err);
        return of(this.getMockCalisanlar());
      })
    );
  }

  getMockCalisanlar(): Calisan[] {
    return [
      {
        id: 1,
        adSoyad: 'ERTUĞRUL ÖZCAN',
        unvan: 'GENEL MÜDÜR',
        departman: 'Genel Müdürlük',
        fotoUrl: '/images/ertugrul_ozcan.png',
        gorevler: 'Söğütlü Belediye Başkanı (2004–2014)\nBelpaş Genel Müdürü (2024–)',
        ozgecmis: '2004–2014 yılları arasında iki dönem boyunca Söğütlü Belediye Başkanı olarak görev yapmış, yerel yönetimler ve kamu idaresi alanında geniş bir tecrübe edinmiştir. Belediye başkanlığı döneminde imza attığı projeler ve yönetim başarısıyla tanınan Özcan, kamu hizmeti birikimini Sakarya’nın en büyük iştiraklerinden biri olan BELPAŞ A.Ş. bünyesine taşımıştır.\n\nHâlen Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ A.Ş. Genel Müdürü olarak görevine devam etmektedir.',
        sira: 1,
        aktif: true
      },
      {
        id: 2,
        adSoyad: 'MUZAFFER GÜL',
        unvan: 'GENEL MÜDÜR YARDIMCISI',
        departman: 'Genel Müdürlük',
        fotoUrl: '/images/muzaffer_gul.png',
        gorevler: 'BELPAŞ A.Ş. Genel Müdür Yardımcısı',
        ozgecmis: '17 Mayıs 1976 tarihinde Sakarya’da doğdu. Anadolu Üniversitesi İşletme Fakültesi’nden mezun oldu. Özel Sektörde çeşitli firmalarda yönetici olarak görev yapan Muzaffer GÜL BELPAŞ A.Ş. Genel Müdürlüğünde Genel Müdür Yardımcısı olarak görevine devam etmektedir. Muzaffer GÜL evli ve üç çocuk babasıdır.',
        sira: 2,
        aktif: true
      },
      {
        id: 3,
        adSoyad: 'MEHMET ERDOĞAN',
        unvan: 'GENEL MÜDÜR YARDIMCISI',
        departman: 'Genel Müdürlük',
        fotoUrl: '/images/mehmet_erdogan.png',
        gorevler: 'Muhasebe Görevlisi (2003–2005)\nMuhasebe Şefi (2005–2007)\nSatınalma Şefi (2007–2009)\nFinans Şefi (2009–2010)\nPazarlama Şefi (2010–2014)\nMuhasebe Müdürü (2015–2023)\nGenel Müdür Yardımcısı (2023–)',
        ozgecmis: 'Mehmet Erdoğan, 1978 yılında Sakarya’nın Kaynarca ilçesinde doğmuştur. İlk, orta ve lise öğrenimini Sakarya’da tamamlamıştır. 1997-1999 yılları arasında Sakarya Üniversitesi Akyazı Meslek Yüksekokulu İşletme Bölümü’nden mezun olmuş, 2000-2002 yılları arasında Anadolu Üniversitesi İşletme Fakültesi’nde lisans eğitimini tamamlamıştır. 2019 yılında Serbest Muhasebeci Mali Müşavir (SMMM) stajını başarıyla tamamlamıştır.\n\nMeslek hayatına 2003 yılında BELPAŞ A.Ş.’de Muhasebe Görevlisi olarak başlayan Erdoğan, kurum bünyesinde farklı birimlerde görev alarak önemli deneyimler kazanmıştır. 2005-2007 yılları arasında AKM’de Muhasebe Şefi olarak görev yapmış; ardından BELPAŞ’ta sırasıyla Satınalma Şefi (2007-2009), Finans Şefi (2009-2010) ve Pazarlama Şefi (2010-2014) pozisyonlarında bulunmuştur.\n\n2015-2023 yılları arasında BELPAŞ A.Ş.’de Muhasebe Müdürü olarak görev yapan Mehmet Erdoğan, 2023 yılından itibaren Genel Müdür Yardımcısı olarak görevini sürdürmektedir.\n\nMehmet Erdoğan evli ve üç çocuk babasıdır.',
        sira: 3,
        aktif: true
      },
      {
        id: 4,
        adSoyad: 'YASİN KORKUT',
        unvan: 'GENEL MÜDÜR YARDIMCISI',
        departman: 'Genel Müdürlük',
        fotoUrl: '/images/yasin_korkut.png',
        gorevler: 'Park54 İşletme Müdürü\nAkaryakıt İstasyonu İşletme Müdürü\nGenel Müdür Yardımcısı (2025–)',
        ozgecmis: '1983 Kocaeli doğumlu olan Yasin Korkut, lisans eğitimini İşletme Fakültesi’nde tamamlamış; yüksek lisans derecesini ise Ahmet Yesevi Üniversitesi Kamu Yönetimi ve Siyaset Bilimi alanında almıştır.\n\nMesleki kariyerine 2009 yılında Adapazarı Şeker Fabrikası bünyesinde İnsan Kaynakları ve Satınalma birimlerinde başlayan Korkut, 2020 yılından itibaren BELPAŞ A.Ş. ailesine katılmıştır. Kurum bünyesinde sırasıyla Park54 İşletme Müdürlüğü ve Akaryakıt İstasyonu İşletme Müdürlüğü görevlerini yürüten Yasin Korkut, 2025 yılı itibarıyla BELPAŞ A.Ş. Genel Müdür Yardımcısı olarak görevine devam etmektedir.\n\nKorkut, evli ve bir çocuk babasıdır.',
        sira: 4,
        aktif: true
      }
    ];
  }
}
