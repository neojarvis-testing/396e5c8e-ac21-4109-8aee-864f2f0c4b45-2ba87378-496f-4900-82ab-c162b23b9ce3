import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agrochemical-form',
  templateUrl: './agrochemical-form.component.html',
  styleUrls: ['./agrochemical-form.component.css']
})
export class AgrochemicalFormComponent implements OnInit {

  agrochemicalForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.agrochemicalForm = this.fb.group({
      name: ['', Validators.required]
    });
  }


}