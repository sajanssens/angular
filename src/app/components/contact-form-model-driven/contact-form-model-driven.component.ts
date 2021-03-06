import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-form-model-driven',
  templateUrl: './contact-form-model-driven.component.html',
  styleUrls: ['./contact-form-model-driven.component.css']
})
export class ContactFormModelDrivenComponent {
  @Output() addEvent = new EventEmitter<Contact>();
  addContactForm: FormGroup;

  newContact = {} as Contact;

  constructor(private fb: FormBuilder) {
    this.addContactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z -]+$')]],
      email: ['', [Validators.required, emailValidator]]
    });
  }

  addContact(): void {
    this.addEvent.emit(this.newContact);
    // this.contacts.push(this.newContact);
    this.newContact = {} as Contact;
  }

}

function emailValidator(control: AbstractControl) {
  // required validator should handle empty values
  if (!control.value) {
    return null;
  }
  let regex = /^.+@.+\.[a-zA-Z]+$/;
  return regex.test(control.value) ? null : { email: { valid: false } };
}

