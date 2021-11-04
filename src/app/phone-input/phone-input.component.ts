import { Component, OnInit } from '@angular/core';
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
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  input($event) {
    this.onChange((<HTMLTextAreaElement>$event.target).value);
    this.onTouched();
  }
}
