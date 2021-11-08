import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PhoneInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PhoneInputComponent,
    },
  ],
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
  @ViewChild('inputref') inputref;
  value: string;
  onChange = (phone) => {};
  onTouched = () => {};
  onValidatorChange = () => {};
  touched = false;
  disabled = false;

  constructor() {}

  writeValue(phone: string): void {
    this.value = phone;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.touched) {
      return null;
    }

    const pattern = /^0(5[0123458])\d{7}$/;
    const value = control.value;
    if (!pattern.test(value)) {
      return { pattern: true };
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  input($event) {
    const value = (<HTMLTextAreaElement>$event.target).value;
    console.log(value);
    const sanitizedValue = this.sanitizePhoneNumber(value);
    console.log(sanitizedValue);

    if (value != sanitizedValue) {
      this.inputref.nativeElement.value = sanitizedValue;
    }

    this.onChange(sanitizedValue);
    this.onTouched();
  }

  private sanitizePhoneNumber(value: string) {
    return value.replace(/^[+]?972[0]?/g, '0').replace(/[^0-9]/g, '');
  }
}
