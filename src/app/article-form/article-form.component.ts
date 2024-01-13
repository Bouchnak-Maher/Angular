import { Component } from '@angular/core';
import {MyErrorStateMatcher} from "../app.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../models/member";
import {Enseignant} from "../../models/enseignant";
import {MemberService} from "../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Publication} from "../../models/publication";
import {PublicationService} from "../../services/publication.service";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
  form!: FormGroup;
  publicationGlobal!: Publication;
  idCourant1: number;
  constructor(private PS: PublicationService, private router:Router, private activatedRoute: ActivatedRoute) { }

  initForm(): void{
    this.form = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      lien: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      sourcePdf: new FormControl(null, [Validators.required]),
    })
  }

  initForm2(pub: Publication): void{
    this.form = new FormGroup({
      titre: new FormControl(pub.titre, [Validators.required]),
      type: new FormControl(pub.type, [Validators.required]),
      lien: new FormControl(pub.lien, [Validators.required]),
      date: new FormControl(pub.date, [Validators.required]),
      sourcePdf: new FormControl(pub.sourcePdf, [Validators.required]),


    })

  }
  ngOnInit():void{

    this.idCourant1 = this.activatedRoute.snapshot.params['id']; // "1234"
    console.log(this.idCourant1);
    if (!!this.idCourant1) // if truly idCourant  // je suis dans edit
    {
      this.PS.getPublicationById(this.idCourant1).subscribe((pub)=>{
        this.publicationGlobal = pub;
        this.initForm2(pub);
      })

    }else{ // je suis dans create
      this.initForm();
    }
  }

  OnSubmit():void{
    // récupérer le contenu

    var pub = {...this.publicationGlobal, ...this.form.value};
    console.log(pub)
    // const etudiantNew = {...etudiant,
    //   //  id: etudiant.id ?? Math.ceil(Math.random()*1000),
    //     // createdDate: etudiant.createdDate ?? new Date().toISOString()
    // };
    if (!!this.idCourant1) // if truly idCourant  // je suis dans edit
    {
      pub = {id:this.idCourant1, ...pub};
      this.PS.updatePublication(pub).subscribe(()=> {this.router.navigate(['/articles'])});
    }else{
      this.PS.savePublication(pub).subscribe(()=> {this.router.navigate(['/articles'])});
    }





  }
}
