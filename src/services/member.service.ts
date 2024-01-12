import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, GLOBAL } from 'src/app/app-config';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { Member } from 'src/models/member';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {

  }

  saveMember(type:string, member: Member): Observable<Member>{
    if (type == "etudiant") {
      return this.httpClient.post<Member>(`${API.url}/members/etudiant/create`, member);
    } else if (type == "enseignant") {
      return this.httpClient.post<Member>(`${API.url}/members/enseignant/create`, member);
    } else {
      return new Observable(observer => observer.error('Invalid member type'));
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateMember(type:string, member: Member): Observable<Member>{
    if (type == "etudiant") {
      return this.httpClient.put<Member>(`${API.url}/members/etudiant/${member.id}/update`, member);
    } else if (type == "enseignant") {
      return this.httpClient.put<Member>(`${API.url}/members/enseignant/${member.id}/update`, member);
    } else {
      return new Observable(observer => observer.error('Invalid member type'));
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  getMemberById(id: number): Observable<Member>{
    return this.httpClient.get<Member>(`${API.url}/members/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getMembers(): Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${API.url}/members`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getEnseignants(): Observable<Enseignant[]>{
    return this.httpClient.get<Enseignant[]>(`${API.url}/members/enseignants`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getEtudiants(): Observable<Etudiant[]>{
    return this.httpClient.get<Etudiant[]>(`${API.url}/members/etudiants`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  affectEtudiantToEnseignant(etudiant : Member, enseignant : Member) : Observable<void>
  {
    return this.httpClient.put<void>(`${API.url}/members/affect-encadrant/${enseignant.id}`, etudiant.id);
  }


  getNbPubMembers(): Observable<number[]>
  {
    return this.httpClient.get<number[]>(`${API.url}/members/numberpublications`);
  }


  getNumberPerMemberType(): Observable<Map<string, number>> {
    return this.httpClient.get<any>(`${API.url}/members/members-per-role`)
      .pipe(
        map(response => {
          if (response && typeof response === 'object') {
            const resultMap = new Map<string, number>();
            Object.keys(response).forEach(key => {
              if (typeof response[key] === 'number') {
                resultMap.set(key, response[key]);
              }
            });
            return resultMap;
          } else {
            throw new Error('Invalid response format');
          }
        })
      );
  }

  affectMemberToEvent(idMember: number, idEvent: number): Observable<void>
  {
    return this.httpClient.post<void>(`${API.url}/members/affect-event/${idEvent}`,idMember);
  }
  affectMemberToTool(idMember: number, idTool: number): Observable<void>
  {
    return this.httpClient.post<void>(`${API.url}/members/affect-tool/${idTool}`,idMember);
  }
  affectMemberToPub(idMember: number, idPub: number): Observable<void>
  {
    return this.httpClient.post<void>(`${API.url}/members/affect-pub/${idPub}`,idMember);
  }

  getMemberByOutil(idOutil: number) : Observable<Member>
  {
    return this.httpClient.get<Member>(`${API.url}/members/members-outil/${idOutil}`);
  }

  getMembersByEvent(idEvent: number) : Observable<Member[]>{
    return this.httpClient.get<Member[]>(`${API.url}/members/per-event/${idEvent}`);
  }
  deleteEnseignant(memberId: number): Observable<void>{
    return this.httpClient.delete<void>(`${API.url}/members/enseignant/${memberId}/delete`);
  }

  deleteEtudiant(memberId: number): Observable<void>{
    return this.httpClient.delete<void>(`${API.url}/members/etudiant/${memberId}/delete`);
  }
}
