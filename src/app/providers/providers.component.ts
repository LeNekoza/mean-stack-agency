import { Component, OnInit } from '@angular/core';
import {providers} from '../models/providers.data'
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [
  ]
})
export class ProvidersComponent implements OnInit{
providers= providers;
constructor(){}
ngOnInit(): void {
  
}
}
