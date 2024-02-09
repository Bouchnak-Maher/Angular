import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool.service';
import { Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/models/tool';

@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css']
})
export class ToolsCreateComponent implements OnInit {
  members : Member[] = []
  form!: FormGroup;
  idCourant1: number;
  toolGlobal!: Tool;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ToolsCreateComponent>,
    private TS: ToolService,
    private MS: MemberService,
    private router: Router,private activatedRoute: ActivatedRoute
    ) {}


  ngOnInit(): void {
    console.log(this.data);
    
    if (!!this.data) {
      // if truly idCourant  // je suis dans edit
      this.TS.getToolById(this.data.arg).subscribe((event) => {
        this.toolGlobal = event;
        console.log(event)
       this.initForm2(event);
      });
    }
    else{ // je suis dans create
      this.initForm();
    }
    this.MS.getMembers().subscribe((members)=>{this.members = members});}
    initForm(): void{
    this.form = this.fb.group({
      nom: new FormControl(null, []),
      date: new FormControl(null, []),
      createur: new FormControl(null, []),
      source: new FormControl(null, [])
    })
  }
  initForm2(tool: Tool): void {

    this.form = new FormGroup({
      nom: new FormControl(tool.nom, [Validators.required]),
      date: new FormControl(tool.date, [Validators.required]),
      createur: new FormControl(tool.createur, []),
      source: new FormControl(tool.source, [Validators.required]),
    });
    console.log('Form values after initialization:', this.form.value);

  }
 

  close(){
    this.dialogRef.close();
  }

  save(){

    this.dialogRef.close(this.form.value);

  }
}
