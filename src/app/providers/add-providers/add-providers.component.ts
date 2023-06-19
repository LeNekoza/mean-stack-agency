import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ProviderClass } from 'src/app/models/providers.class';
import { providers } from 'src/app/models/providers.data';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styles: [
  ]
})
export class AddProvidersComponent implements OnInit {
  submitted = false;
  emailError = false;
  emailErrorMsg = "Invalid email. Try again or contact us."
  providers: ProviderClass[];
  provider = new ProviderClass();
  providersForm!: FormGroup;

  constructor(private providerService: ProviderService){}

  ngOnInit(): void {
    this.buildFormControls();
    this.loadData();

  }

  //Method to easy access form controls

  get f(){return this.providersForm.controls;}
  

  handleSubmit(){
 console.log( this.providersForm.value);
  
    this.buildProvider();

    if(!this.isInvalidEmail()){
      this.providerService.addProvider(this.provider)
      .subscribe(
        data => {
          this.submitted = true;
          this.emailError = false;
        },
        error => console.log(error)
      )
    } 
}
//Get All Records from DB
loadData(){
  this.providerService.getProviders()
  .subscribe(
    data => {
      this.providers = data
    },
    error => {
      console.log(error)
    }
  )
}
//Check for duplicate emails
isInvalidEmail(){

  let email = this.providersForm.controls['email'].value;
  if(this.providers.filter(el=> el.company.email == email).length > 0){
    this.emailError = true;
    return true;
  }
  return false;
}
//Generate new ID
getNewId(){
  
  let newId: number;
  while(true){
    newId = Math.floor(Math.random()*10000)+99999;
    if(this.providers.findIndex(el => el.id == newId) == -1){
      return newId;
    }
  }
}

//Build new Provider Object
buildProvider(){
     
  let p = this.providersForm.value;
  this.provider.id = this.getNewId();
  this.provider.firstname = p.firstname;
  this.provider.lastname = p.lastname;
  this.provider.position = p.position;
  this.provider.company = {
    company_name : p.company_name,
    phone : p.phone,
    email : p.email,
    address : p.address,
    address2 : p.address2,
    city : p.city,
    state : p.state,
    postal_code: p.postal_code,
    description : p.description,
    tagline : p.tagline,
  };

}

//Build Form Controls
buildFormControls(){
  this.providersForm = new FormGroup({
    firstname: new FormControl("Kazuki", [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl("Nekoza", [Validators.required, Validators.minLength(2)]),
    position: new FormControl("",[Validators.required, Validators.minLength(2)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{5}-[0-9]{5}$')]),
    company_name: new FormControl(),
    address: new FormControl(),
    address2: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    postal_code: new FormControl(),
    description: new FormControl(),
    tagline: new FormControl(),

  });
}
 }
  
