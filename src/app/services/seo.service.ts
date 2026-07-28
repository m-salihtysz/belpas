import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Google SEO Standartlarına Uygun Başlık Biçimlendirici (Strict 40 - 60 Karakter Target)
   */
  private formatTitle(rawTitle: string): string {
    if (!rawTitle) return 'BELPAŞ | Sakarya Büyükşehir Sosyal Tesisler';

    let clean = rawTitle.trim();

    // 1. Zaten 40 - 60 karakter arasındaysa ve marka içeriyorsa doğrudan kullan
    if (clean.length >= 40 && clean.length <= 60 && clean.includes('BELPAŞ')) {
      return clean;
    }

    // 2. Marka eklenmeden önceki hali aşırı uzunsa (60 karakterden fazlaysa) kırp
    if (clean.length > 55) {
      let trimmed = clean.substring(0, 46).trim();
      const lastSpace = trimmed.lastIndexOf(' ');
      if (lastSpace > 32) {
        trimmed = trimmed.substring(0, lastSpace);
      }
      return `${trimmed}... | Sakarya BELPAŞ`.substring(0, 60);
    }

    // 3. Markasız başlığa "| Sakarya BELPAŞ" ekle
    const withFullBrand = clean.includes('BELPAŞ') ? clean : `${clean} | Sakarya BELPAŞ`;
    if (withFullBrand.length >= 40 && withFullBrand.length <= 60) {
      return withFullBrand;
    }

    // 4. Eklendiğinde 60'ı geçiyorsa "| BELPAŞ" dene
    const withShortBrand = clean.includes('BELPAŞ') ? clean : `${clean} | BELPAŞ`;
    if (withShortBrand.length >= 40 && withShortBrand.length <= 60) {
      return withShortBrand;
    }

    // 5. Halen 60'ı geçiyorsa başlığı akıllıca kırpıp "| BELPAŞ" ekle (hedef 40-60 karakter)
    if (withShortBrand.length > 60) {
      let trimmed = clean.substring(0, 44).trim();
      const lastSpace = trimmed.lastIndexOf(' ');
      if (lastSpace > 30) {
        trimmed = trimmed.substring(0, lastSpace);
      }
      return `${trimmed}... | BELPAŞ`;
    }

    // 6. Halen 40 karakterden kısaysa SEO tamamlayıcı ekle
    if (withFullBrand.length < 40) {
      const padded = `${clean} Tesisleri | Sakarya BELPAŞ`;
      return padded.length <= 60 ? padded : padded.substring(0, 60);
    }

    return withFullBrand.substring(0, 60);
  }

  /**
   * Google SEO Standartlarına Uygun Meta Description Biçimlendirici (Strict 140 - 160 Karakter Target)
   */
  private formatDescription(rawDescription: string): string {
    const defaultFallback = 'Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ; sosyal tesisler, kafeteryalar, restoranlar ve kurumsal hizmetlerle Sakaryalılara leziz ikramlar sunar.';
    if (!rawDescription) return defaultFallback;

    let desc = rawDescription.trim().replace(/\s+/g, ' ');

    // 1. Zaten 140 - 160 karakter arasındaysa aynen dön
    if (desc.length >= 140 && desc.length <= 160) {
      return desc;
    }

    // 2. 160 karakterden uzunsa akıllıca kelime sınırından kırp
    if (desc.length > 160) {
      let trimmed = desc.substring(0, 155);
      const lastSpace = trimmed.lastIndexOf(' ');
      if (lastSpace > 125) {
        trimmed = trimmed.substring(0, lastSpace);
      }
      return `${trimmed}...`;
    }

    // 3. 140 karakterden kısaysa kurumsal tamamlama cümlesi ekle
    if (desc.length < 140) {
      const appendText = ' Sakarya Büyükşehir Belediyesi iştiraki BELPAŞ güvencesiyle kaliteli hizmet sunar.';
      let combined = desc + appendText;
      if (combined.length >= 140 && combined.length <= 160) {
        return combined;
      }
      if (combined.length > 160) {
        let trimmed = combined.substring(0, 155);
        const lastSpace = trimmed.lastIndexOf(' ');
        if (lastSpace > 130) {
          trimmed = trimmed.substring(0, lastSpace);
        }
        return `${trimmed}...`;
      }
    }

    return desc;
  }

  generateTags(config: SeoConfig) {
    const finalTitle = this.formatTitle(config.title);
    const finalDescription = this.formatDescription(config.description);

    // 1. Sayfa Başlığı
    this.title.setTitle(finalTitle);

    // 2. Temel Meta Etiketleri
    this.meta.updateTag({ name: 'description', content: finalDescription });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // 3. Open Graph (Facebook, LinkedIn vb.) Etiketleri
    this.meta.updateTag({ property: 'og:title', content: finalTitle });
    this.meta.updateTag({ property: 'og:description', content: finalDescription });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.setCanonicalUrl(config.url);
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    // 4. Twitter Card Etiketleri
    this.meta.updateTag({ name: 'twitter:card', content: config.twitterCard || (config.image ? 'summary_large_image' : 'summary') });
    this.meta.updateTag({ name: 'twitter:title', content: finalTitle });
    this.meta.updateTag({ name: 'twitter:description', content: finalDescription });
  }

  /**
   * Dinamik Canonical URL Etiketi Ekleme / Güncelleme
   */
  setCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * Google Rich Snippets için JSON-LD Yapılandırılmış Veri Ekleme
   */
  setJsonLd(schemaData: object) {
    let script: HTMLScriptElement | null = this.document.querySelector("script[type='application/ld+json']");
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.text = JSON.stringify(schemaData);
  }
}