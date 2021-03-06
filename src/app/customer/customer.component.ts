import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Customer} from './customer';
import 'rxjs/add/operator/debounceTime';
import {debounceTime} from 'rxjs/operators';


function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  if (emailControl.value === confirmControl.value) {
    return null;
  }
   return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return  (c: AbstractControl): {[key: string]: boolean} | null => {
    if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    };
    return null;
  };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customer: Customer = new Customer();
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.',
    minlength: 'Please enter at least 4 characters.'
  };

  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {
       this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email,
          Validators.minLength(4)]],
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: ['', ratingRange(1, 5)],
      sendCatalog: true
    });

    this.customerForm.get('notification').valueChanges
      .subscribe(value => this.setNotification(value));


  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

}
