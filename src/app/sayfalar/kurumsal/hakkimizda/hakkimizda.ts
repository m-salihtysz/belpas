import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-hakkimizda',
  imports: [],
  templateUrl: './hakkimizda.html',
  styleUrl: './hakkimizda.scss'
})
export class Hakkimizda implements OnInit {
  private seoService = inject(SeoService);

  istatistikler = [
    { deger: '1992', etiket: 'Kuruluş Yılı', ikon: 'pi-history', aciklama: '30 yılı aşkın tecrübe' },
    { deger: '%100', etiket: 'Sakarya B.Şehir İştiraki', ikon: 'pi-building', aciklama: 'Halkın hizmetinde' },
    { deger: '700M ₺', etiket: 'Sermaye Yapısı', ikon: 'pi-chart-line', aciklama: 'Güçlü mali yapı' },
    { deger: '36+', etiket: 'Hizmet Noktası', ikon: 'pi-map-marker', aciklama: 'Şehrin her yerinde' }
  ];

  degerlerimiz = [
    { 
      baslik: 'Misyonumuz', 
      ikon: 'pi-compass', 
      renk: 'emerald',
      aciklama: 'Sakarya halkına güvenilir, kaliteli, hijyenik ve ekonomik sosyal alanlar sunarak kentin yaşam kalitesini artırmak.' 
    },
    { 
      baslik: 'Vizyonumuz', 
      ikon: 'pi-eye', 
      renk: 'teal',
      aciklama: 'Sosyal belediyecilik ve kamu iştirakleri alanında Türkiye\'ye örnek gösterilen, yenilikçi ve sürdürülebilir bir kurumsal marka olmak.' 
    },
    { 
      baslik: 'Temel Değerlerimiz', 
      ikon: 'pi-shield', 
      renk: 'cyan',
      aciklama: 'Kamu yararı, tam şeffaflık, güler yüzlü hizmet, yüksek kalite standartları ve çevre dostu sürdürülebilir işletmecilik.' 
    }
  ];

  ozellikler = [
    'Kamu Yararını Temel Alan İşletmecilik Anlayışı',
    'Yüksek Hijyen ve Kalite Standartları',
    'Erişilebilir ve Ulaşılabilir Sosyal Alanlar',
    'Sürdürülebilir ve Doğa Dostu Yatırımlar',
    'Sakarya\'nın Yerel Üreticilerine Destek'
  ];

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Hakkımızda | BELPAŞ',
      description: '1992 yılında kurulan BELPAŞ, Sakarya Büyükşehir Belediyesi\'nin %100 iştiraki olarak sosyal tesisler ve kurumsal hizmetler sunmaktadır.',
      url: 'https://belpas.sakarya.bel.tr/kurumsal/hakkimizda',
      keywords: 'BELPAŞ hakkında, kuruluş tarihi, Sakarya, belediye iştiraki, sermaye yapısı'
    });

    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'BELPAŞ Hakkımızda',
      'url': 'https://belpas.sakarya.bel.tr/kurumsal/hakkimizda',
      'description': '1992\'den bu yana Sakarya\'ya hizmet eden BELPAŞ A.Ş. kurumsal sayfası.'
    });
  }
}
