import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {ProviderClass} from '../models/providers.class'
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  //URL Endpoint to our Express app
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  //GET all records
  getProviders() : Observable<any>{
    return this.http.get(this.apiUrl);
  }
  //POST - add a new record
  addProvider(newProvider : ProviderClass) : Observable<any>{
    return this.http.post(this.apiUrl, newProvider);
  }
}
