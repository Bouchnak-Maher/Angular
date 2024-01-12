import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool.service';
import { Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css']
})
export class ToolsCreateComponent implements OnInit {
  members : Member[] = []
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ToolsCreateComponent>,
    private TS: ToolService,
    private MS: MemberService,
    private router: Router,
    ) {}


  ngOnInit(): void {
    this.MS.getMembers().subscribe((members)=>{this.members = members});
    this.form = this.fb.group({
      nom: new FormControl(null, []),
      date: new FormControl(null, []),
      createur: new FormControl(null, []),
      source: new FormControl(null, [])
    })
  }

  close(){
    this.dialogRef.close();
  }

  save(){

    this.dialogRef.close(this.form.value);

  }
}
