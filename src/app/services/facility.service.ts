import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tesis {
  id: number;
  ad: string;
  kategori: string;
  renk: string;
  harf: string;
  aciklama: string;
  adres: string;
  telefon: string;
  resimUrl: string;
  konumUrl: string;
  haftaIciSaat: string;
  haftaSonuSaat: string;
  aktif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5050/api/Tesisler';

  getTesisler(): Observable<Tesis[]> {
    return this.http.get<Tesis[]>(this.apiUrl);
  }

  getTesis(id: number): Observable<Tesis> {
    return this.http.get<Tesis>(`${this.apiUrl}/${id}`);
  }
}
