import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Data} from '../../shared/data';
import {BackendService} from '../../shared/backend.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
/*export class UpdateComponent implements OnInit {
  selectedId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
  }

}*/
export class UpdateComponent implements OnInit {
  form: FormGroup;
  data: Data;
  selectedId: number;

  constructor(
    private cs: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        BuchnameControl: ['', Validators.required],
        AutorControl: ['', Validators.required],
        InhaltControl: ['', Validators.required],
        SeiteControl: ['', Validators.required],
        NoteControl: ['', Validators.required],
      }
    );
    this.data = { id: 0, Buchname: '', Autor: '', Inhalt: '', Seite: 0, Note: ''};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.data.Buchname = values.BuchnameControl;
    this.data.Autor = values.AutorControl;
    this.data.Inhalt = values.InhaltControl;
    this.data.Seite= values.SeiteControl;
    this.data.Note= values.NoteControl
    console.log(this.data);
    this.cs.update(this.selectedId, this.data)
    this.router.navigate(['/read']);
  }

  cancel(): void {
    this.router.navigate(['/read']);
  }
}


