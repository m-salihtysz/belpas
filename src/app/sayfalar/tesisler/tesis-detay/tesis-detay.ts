import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FacilityService, Tesis, MenuKategori } from '../../../services/facility.service';
import { SeoService } from '../../../services/seo.service'; 

@Component({
  selector: 'app-tesis-detay',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tesis-detay.html',
  styleUrl: './tesis-detay.scss'
})
export class TesisDetay implements OnInit {
  private route = inject(ActivatedRoute);
  private tesisService = inject(FacilityService);
  private seoService = inject(SeoService); 
  private sanitizer = inject(DomSanitizer);

  tesis = signal<Tesis | null>(null);
  menuKategorileri = signal<MenuKategori[]>([]);
  aktifSekme = signal<number>(0);
  menuModu = signal<'interaktif' | 'gorsel'>('interaktif');
  menuModalAcik = signal<boolean>(false);
  dijitalMenuAcik = signal<boolean>(false);
  modalSayfa = signal<number>(1);
  yukleniyor = signal(true);
  hata = signal(false);
  resimHata = signal(false);
  aktifResimIndex = signal<number>(0);

  getGaleriResimleri(): string[] {
    const t = this.tesis();
    if (!t) return [];
    
    // Varsayılan galeri resimleri (görseller)
    const varsayilanlar = [
      t.resimUrl || '/images/sbb_mekan.jpg',
      '/images/tesisler/ormanpark.jpg',
      '/images/tesisler/ormanpark-dort-mevsim.jpg',
      '/images/tesisler/ormanpark-sade-kahve.jpg',
      '/images/tesisler/cark-i-dem.jpg',
      '/images/tesisler/yenikentpark.webp'
    ];
    return varsayilanlar;
  }

  resimSec(idx: number): void {
    this.aktifResimIndex.set(idx);
  }

  oncekiResim(): void {
    const max = this.getGaleriResimleri().length;
    this.aktifResimIndex.update(i => (i - 1 + max) % max);
  }

  sonrakiResim(): void {
    const max = this.getGaleriResimleri().length;
    this.aktifResimIndex.update(i => (i + 1) % max);
  }

  toggleDijitalMenu(): void {
    this.dijitalMenuAcik.update(v => !v);
  }

  getSafeMenuPdfUrl(): SafeResourceUrl | null {
    const url = this.tesis()?.menuPdfUrl;
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onResimHata(): void {
    this.resimHata.set(true);
  }

  sekmeDegistir(index: number): void {
    this.aktifSekme.set(index);
  }

  menuModuDegistir(mod: 'interaktif' | 'gorsel'): void {
    this.menuModu.set(mod);
  }

  modalAcKapat(durum: boolean): void {
    this.menuModalAcik.set(durum);
  }

  setModalSayfa(sayfa: number): void {
    this.modalSayfa.set(sayfa);
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('slug') || this.route.snapshot.paramMap.get('id');
    if (!param) {
      this.hata.set(true);
      this.yukleniyor.set(false);
      return;
    }

    this.tesisService.getTesis(param).subscribe({
      next: (data) => {
        this.tesis.set(data);
        this.menuKategorileri.set(this.tesisService.getMockMenuForFacility(data.id, data.slug));
        this.yukleniyor.set(false);

        if (data) {
          this.seoService.generateTags({
            title: `${data.ad} - Menü ve İletişim | Sakarya BELPAŞ`,
            description: data.aciklama,
            image: data.resimUrl,
            url: `https://belpas.sakarya.bel.tr/tesisler/${data.slug || data.id}`,
            keywords: `BELPAŞ, ${data.ad}, Sakarya tesisleri, sosyal tesis`
          });
        }
      },
      error: (err) => {
        console.warn('Tesis backend ulaşılamadı, yerel veri ve menü gösteriliyor:', err);
        const numericId = Number(param) || 1;
        const currentSlug = typeof param === 'string' ? param.toLowerCase() : 'ormanpark';

        let yedekTesis: Tesis = {
          id: numericId,
          ad: 'Ormanpark',
          slug: 'ormanpark',
          kategori: 'Restoran & Kafe',
          renk: '#0284C7',
          harf: 'O',
          aciklama: '2006 yılında "Şehrin içinde orman keyfi" sloganıyla Sakarya halkının hizmetine sunulan Ormanpark; 18 dönümlük dişbudak ağaçlarının gölgesinde 3.250 m² kullanım alanına sahiptir. Dünya mutfağından yerel Sakarya lezzetlerine, serpmeyle sunulan zengin kahvaltı seçeneklerinden meşhur ıslama köfteye kadar geniş bir yelpazede hizmet vermektedir.',
          adres: 'Şirinevler Mahallesi, Adnan Menderes Caddesi, No: 293/A, Adapazarı / Sakarya',
          telefon: '0264 291 08 78',
          resimUrl: '/images/tesisler/ormanpark.jpg',
          konumUrl: 'https://maps.google.com/?q=Ormanpark+Sakarya',
          haftaIciSaat: '09:00 - 23:00',
          haftaSonuSaat: '09:00 - 23:00',
          aktif: true
        };

        if (currentSlug.includes('dort-mevsim')) {
          yedekTesis = {
            id: 2,
            ad: 'Ormanpark - Dört Mevsim',
            slug: 'ormanpark-dort-mevsim',
            kategori: 'Restoran & Kafe',
            renk: '#0284C7',
            harf: 'O',
            aciklama: 'Ormanpark bünyesinde yer alan Dört Mevsim Kafeterya; özel fırın pizzaları, zengin tost ve kumpir çeşitleri, çıtır lahmacun ve pidesiyle dört mevsim boyunca sıcak ve konforlu kapalı alanında misafirlerini ağırlamaktadır.',
            adres: 'Ormanpark İçi, Şirinevler Mah. Adnan Menderes Cad. Adapazarı / Sakarya',
            telefon: '0264 291 08 78',
            resimUrl: '/images/tesisler/ormanpark-dort-mevsim.jpg',
            konumUrl: 'https://maps.google.com/?q=Ormanpark+Sakarya',
            haftaIciSaat: '09:00 - 23:00',
            haftaSonuSaat: '09:00 - 23:00',
            aktif: true
          };
        } else if (currentSlug.includes('sade-kahve')) {
          yedekTesis = {
            id: 3,
            ad: 'Ormanpark - Sade Kahve',
            slug: 'ormanpark-sade-kahve',
            kategori: 'Restoran & Kafe',
            renk: '#0284C7',
            harf: 'O',
            aciklama: 'Doğayla baş başa açık hava bahçe konseptine sahip Sade Kahve (Sade Bahçe); közde demlenmiş Rize çayı, geleneksel Türk kahvesi çeşitleri, meşhur Sakarya kabak tatlısı ve taze sıkılmış meyve suları ile doğa içinde huzurlu mola imkanı sunmaktadır.',
            adres: 'Ormanpark İçi, Şirinevler Mah. Adnan Menderes Cad. Adapazarı / Sakarya',
            telefon: '0264 291 08 78',
            resimUrl: '/images/tesisler/ormanpark-sade-kahve.jpg',
            konumUrl: 'https://maps.google.com/?q=Ormanpark+Sakarya',
            haftaIciSaat: '09:00 - 23:00',
            haftaSonuSaat: '09:00 - 23:00',
            aktif: true
          };
        } else if (currentSlug.includes('cark-i-dem')) {
          yedekTesis = {
            id: 4,
            ad: 'Çark-ı Dem (Aziz Durak Parkı)',
            slug: 'cark-i-dem',
            kategori: 'Restoran & Kafe',
            renk: '#0284C7',
            harf: 'Ç',
            aciklama: 'Adapazarı\'nın kalbinde yer alan Aziz Duran Parkı (Kentpark) gölet manzarası eşliğinde hizmet veren Çark-ı Dem; özel döküm tavada saç kavurma, çökertme kebabı, Sakarya ıslama köfte, kumpir, pizza ve geleneksel çay-kahve ikramlarıyla şehrin en sevilen mekanlarındandır.',
            adres: 'Aziz Duran Parkı (Kentpark) İçi, Mithatpaşa Mahallesi, Adapazarı / Sakarya',
            telefon: '0264 273 19 81',
            resimUrl: '/images/tesisler/cark-i-dem.jpg',
            konumUrl: 'https://maps.google.com/?q=Kentpark+Sakarya',
            haftaIciSaat: '09:00 - 23:00',
            haftaSonuSaat: '09:00 - 23:00',
            aktif: true
          };
        }

        this.tesis.set(yedekTesis);
        this.menuKategorileri.set(this.tesisService.getMockMenuForFacility(numericId, currentSlug));
        this.hata.set(false);
        this.yukleniyor.set(false);
      }
    });
  }
}