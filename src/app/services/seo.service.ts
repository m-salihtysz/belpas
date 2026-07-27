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

  generateTags(config: SeoConfig) {
    // 1. Sayfa Başlığı
    const pageTitle = config.title.includes('BELPAŞ') ? config.title : `${config.title} | Sakarya BELPAŞ`;
    this.title.setTitle(pageTitle);

    // 2. Temel Meta Etiketleri
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // 3. Open Graph (Facebook, LinkedIn vb.) Etiketleri
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
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
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
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