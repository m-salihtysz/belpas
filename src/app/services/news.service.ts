import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Haber {
  id: number;
  baslik: string;
  kategori: string;
  ozet: string;
  icerik: string;
  resimUrl: string;
  olusturmaTarihi: string;
  aktif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/Haberler';

  getHaberler(): Observable<Haber[]> {
    return this.http.get<Haber[]>(this.apiUrl);
  }

  getHaber(id: number): Observable<Haber> {
    return this.http.get<Haber>(`${this.apiUrl}/${id}`);
  }
}
