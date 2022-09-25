import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QueryEncoderService } from '../query-encoder/query-encoder.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private queryBuilder: QueryEncoderService
  ) {}

  getSchema() {
    return this.http.get<any>(`${environment.API_URL}/dataset/schema`);
  }

  getAggregate(query: { fields: string[]; method: 'count' | 'avg' }) {
    const _query = this.queryBuilder.encodeUrlFromObject(query);
    return this.http.get<any>(
      `${environment.API_URL}/dataset/aggregate?${_query}`
    );
  }
}
