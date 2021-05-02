import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Data } from '../../../shared/data';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() data: Data;
  @Output() updateEvent = new EventEmitter<Data>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group(
      {
        idControl: ['', Validators.required],
        BuchnameControl: ['', Validators.required],
        AutorControl: ['', Validators.required],
        InhaltControl: ['', Validators.required],
        SeiteControl: ['', Validators.required],
        NoteControl: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.form.patchValue({
      idControl: this.data?.id,
      BuchnameControl: this.data?.Buchname,
      AutorControl: this.data?.Autor,
      InhaltControl: this.data?.Inhalt,
      SeiteControl: this.data?.Seite,
      NoteControl: this.data?.Note
    });
  }

  onSubmit(): void {
    const values = this.form.value;
    this.data.id = values.idControl;
    this.data.Buchname = values.BuchnameControl;
    this.data.Autor = values.AutorControl;
    this.data.Inhalt = values.InhaltControl;
    this.data.Seite= values.SeiteControl;
    this.data.Note = values.NoteControl
    this.updateEvent.emit(this.data);
  }

  cancel(): void {
    this.location.back();
  }
}
