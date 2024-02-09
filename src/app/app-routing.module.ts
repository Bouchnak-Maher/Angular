import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { ToolsComponent } from './tools/tools.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { ToolsCreateComponent } from './tools-create/tools-create.component';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import {ArticleFormComponent} from "./article-form/article-form.component";

// pathMatch : maycharjiha ella mayel9a kelmet 'members'
// lkol sinon yredirectih vers un path ena nakhtarou



const routes: Routes = [

  {path:'dashboard', pathMatch:'full', component:DashboardComponent},
  {path:'articles', children:[
      {path: '', pathMatch:'full', component:ArticlesComponent},
      {path:'create', pathMatch:'full', component:ArticleFormComponent},
      {path:'edit/:id', pathMatch:'full', component:ArticleFormComponent},
    ]},

  {path:'enseignant/create', pathMatch:'full', component:EnseignantFormComponent},
  {path:'etudiant/create', pathMatch:'full', component:EtudiantFormComponent},

  {path:'tools', children:[
    {path: '', pathMatch:'full', component:ToolsComponent},
    {path:'create', pathMatch:'full', component:ToolsCreateComponent},
    {path:'tool/:id/edit', pathMatch:'full', component:ToolsCreateComponent}]},

  {path:'events', children:[
    {path: '', pathMatch:'full', component:EventsComponent},
    {path:'create', pathMatch:'full', component:EventCreateComponent},
    {path:'event/:id/edit', pathMatch:'full', component:EventCreateComponent}
  ]},


  {path:'login', pathMatch:'full', component:LoginComponent},

  {path:'members',
  children:[
    {path: '', pathMatch:'full', component:MemberComponent},
    {path:'enseignant/:id/edit', pathMatch:'full', component:EnseignantFormComponent},
    {path:'enseignant/:id/delete', pathMatch:'full', component:EnseignantFormComponent},
    {path:'etudiant/:id/edit', pathMatch:'full', component:EtudiantFormComponent},
    {path:'etudiant/:id/delete', pathMatch:'full', component:EtudiantFormComponent},
    {path:'create', pathMatch:'full', component:MemberFormComponent},

  ]},


  // {path:':id/edit', pathMatch:'full', component:MemberFormComponent},
  // {path:':id/delete', pathMatch:'full', component:MemberFormComponent},
  // {path:'create', pathMatch:'full', component:MemberFormComponent},

  {path:'', pathMatch:'full', redirectTo:'login'},
  {path:'**', redirectTo:'members'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
