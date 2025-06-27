import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
  id?: number;
  sku: string;
  name: string;
  price: number;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
}

  getAll(): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl, {
    headers: this.getAuthHeaders(),
  });
}

create(product: Product): Observable<Product> {
  return this.http.post<Product>(this.apiUrl, product, {
    headers: this.getAuthHeaders(),
  });
}

update(id: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {
    headers: this.getAuthHeaders(),
  });
}

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`, {
    headers: this.getAuthHeaders(),
  });
}

getOne(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`, {
    headers: this.getAuthHeaders(),
  });
}


  uploadImage(image: File): Observable<{ imageUrl: string }> {
  const formData = new FormData();
  formData.append('image', image);

  return this.http.post<{ imageUrl: string }>(
    `${this.apiUrl}/upload`,
    formData,
    { headers: this.getAuthHeaders() }   // wrap in an options object
  );
}

deleteImage(filename: string): Observable<any> {
  return this.http.delete(
    `${this.apiUrl}/delete-image/${filename}`,
    { headers: this.getAuthHeaders() }   // wrap in an options object
  );
}

}
