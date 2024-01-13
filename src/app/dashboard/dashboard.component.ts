import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/services/publication.service';
import { EvenementService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  nb_members :number= 0;
  nb_articles :number= 0;
  nb_events:number= 0;
  nb_tools :number= 0;
  tab!: number[];

  // line
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'Tools par membre',
      data: [2,1,4,5,2,6,8]
    }
  ];
  chartData1: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'Events par membre',
      data: [6,2,1,8]
    }
  ];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};
  // pie
  chartTypeData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'Number',
      data: [1,2]
    }
  ];
  chartTypesLabel: string[] = ["etudiant", "enseignant"];


  constructor (private ES: EvenementService, private TS: ToolService, private PS: PublicationService, private MS: MemberService)
  {

     

   
    
    


  }
  ngOnInit(): void {
    const etudiantObservable = this.MS.getNumberPerMemberType().pipe(
      map((mapRole) => mapRole.get('etudiant'))
    );
    
    const enseignantObservable = this.MS.getNumberPerMemberType().pipe(
      map((mapRole) => mapRole.get('enseignant'))
    );
    
    forkJoin([etudiantObservable, enseignantObservable]).subscribe(([etudiantValue, enseignantValue]) => {
      if (etudiantValue !== undefined) {
        this.chartTypeData[0].data.push(etudiantValue);
      }
    
      if (enseignantValue !== undefined) {
        this.chartTypeData[0].data.push(enseignantValue);
    }
    });
    console.log( this.chartTypeData[0].data)
    this.MS.getMembers().subscribe(members =>{
      members.forEach(element => {
        this.chartLabels.push(element.nom + " " + element.prenom);
      });
      this.nb_members = members.length;
    })
    this.TS.getTools().subscribe(tools =>{
      tools.forEach(element => {
      });
      this.nb_tools = tools.length;
    })
  
    this.ES.getEvenements().subscribe(event =>{
      event.forEach(element => {
        
      });
      this.nb_events = event.length;
    })
     this.PS.getPublications().subscribe(publication =>{
      publication.forEach(element => {
       
      });
      this.nb_articles = publication.length;
    })
  
    this.MS.getEnseignants().subscribe(members => { members.forEach(element => {
     
    });
    this.nb_events = members.length;
  
    
     })
  }

}
