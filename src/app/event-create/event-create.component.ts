import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/models/event';
import { EvenementService } from 'src/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent {
  form!: FormGroup;
  eventGlobal!: Evenement;
  idCourant1: number;
 
  constructor(
    private ES: EvenementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  initForm(): void{
    this.form = new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      dateDebut: new FormControl<string | null>(null, [Validators.required]),
      dateFin: new FormControl<string | null>(null),
      lieu: new FormControl(null, [Validators.required]),
    });
    }
  initForm2(event: Evenement): void {

    this.form = new FormGroup({
      titre: new FormControl(event.titre, [Validators.required]),
      dateDebut: new FormControl(event.dateDebut, [Validators.required]),
      dateFin: new FormControl(event.dateFin, []),
      lieu: new FormControl(event.lieu, [Validators.required]),
    });
    console.log('Form values after initialization:', this.form.value);

  }
  ngOnInit(): void {
    this.idCourant1 = this.activatedRoute.snapshot.params['id']; // "1234"
    console.log(this.idCourant1);
    if (!!this.idCourant1) {
      // if truly idCourant  // je suis dans edit
      this.ES.getEvenementById(this.idCourant1).subscribe((event) => {
        this.eventGlobal = event;
        this.initForm2(event);
      });
    }
    else{ // je suis dans create
      this.initForm();
    }
  }

  OnSubmit(): void {
    // récupérer le contenu
    console.log(this.form.value);

    var event = { ...this.eventGlobal , ...this.form.value,};
    
    if (!!this.idCourant1) // if truly idCourant  // je suis dans edit
    {       
      event = {id:this.idCourant1, ...event};
      

      this.ES.updateEvenement(event).subscribe(() => {
        this.router.navigate(['/events']);
      });}
      else{
    this.ES.saveEvenement(event).subscribe(() => {
      this.router.navigate(['/events']);
    });
      }
    }
}
