import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  phonemodel: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  get phone() {
    return this.form.get('phone');
  }
}
