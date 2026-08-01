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
      { id: 1, adSoyad: 'ERTUĞRUL ÖZCAN', unvan: 'GENEL MÜDÜR', departman: 'Yönetim Kurulu', sira: 1, aktif: true },
      { id: 2, adSoyad: 'MUZAFFER GÜL', unvan: 'GENEL MÜDÜR YARDIMCISI', departman: 'İdari ve Sosyal İşler', sira: 2, aktif: true },
      { id: 3, adSoyad: 'MEHMET ERDOĞAN', unvan: 'GENEL MÜDÜR YARDIMCISI', departman: 'Mali ve Finansal İşler', sira: 3, aktif: true },
      { id: 4, adSoyad: 'YASİN KORKUT', unvan: 'GENEL MÜDÜR YARDIMCISI', departman: 'Teknik ve Operasyonel İşler', sira: 4, aktif: true }
    ];
  }
}
