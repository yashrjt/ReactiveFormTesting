import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponent } from './customer.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComponent ],
      imports:[ReactiveFormsModule],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a `FormGroup`', () => {
    component.ngOnInit();
    expect(component.customerForm instanceof FormGroup).toBe(true);
  });
  it('form is not invalid when some fields are empty',() =>{
    /*let firstName=component.customerForm.controls['firstName'];*/
    expect(component.customerForm.valid).toBeFalsy();
  })

  it('firstName field required and minlength 3',()=>{
    let fName=component.customerForm.controls['firstName'];
    expect(fName.valid).toBeFalsy();
    fName.setValue('yasodha');
    fixture.detectChanges();
    expect(fName.valid).toBeTruthy();
    })

  it('email should be valid',()=>{
    let emailGroup=component.customerForm.controls['emailGroup'];
    let email= emailGroup.controls['email'];
    let confirmEmail= emailGroup.controls['confirmEmail'];
    email.setValue('yash');
    expect(email.valid).toBeFalsy();
  })
  it('emailGroup should have same emails',()=>{
    let emailGroup=component.customerForm.controls['emailGroup'];
    let email= emailGroup.controls['email'];
    let confirmEmail= emailGroup.controls['confirmEmail'];
    expect(email.value).toEqual(confirmEmail.value);
    email.setValue('yasodha@gmail.com');
    confirmEmail.setValue('yash@gmail.com');
    fixture.detectChanges();
    expect(email.value).not.toEqual(confirmEmail.value);
  })

  it('rating should expect from 1 to 5',()=>{
    let rating=component.customerForm.controls['rating'];
    rating.setValue(4);
    expect(rating.value).toMatch('^[1-5]');
  })


});
