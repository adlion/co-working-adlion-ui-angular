import { Injectable } from '@angular/core';
import { HttpParameterCodec, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QueryEncoderService {
  encodeUrlFromObject(urlObject: any) {
    return new HttpParams({
      encoder: new CustomHttpParamEncoder(),
      fromObject: urlObject,
    }).toString();
  }
}

class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
