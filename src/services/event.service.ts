import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, GLOBAL } from 'src/app/app-config';
import { Observable } from 'rxjs';
import { Evenement } from 'src/models/event';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  // tab: enseEvenementignant[] = GLOBAL._DB.events;
  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {}

  getEvenements(): Observable<Evenement[]>{
    return this.httpClient.get<Evenement[]>(`${API.url}/${API.event}/evenements`);
    //return new Observable((observer) => {observer.next(this.tab)});
  }

  saveEvenement(event: Evenement): Observable<Evenement>{

    return this.httpClient.post<Evenement>(`${API.url}/${API.event}/evenements/add`, event);

  }

  updateEvenement(event: Evenement): Observable<Evenement>{
    return this.httpClient.put<Evenement>(`${API.url}/${API.event}/evenements/update/${event.id}`, event);
  }

  deleteEvenement(id: number): Observable<void>{
    this.httpClient.delete<void>(`${API.url}/${API.member}/members-per-event/${id}/delete`);
    return this.httpClient.delete<void>(`${API.url}/${API.event}/events/${id}/delete`);
  }

  getEvenementById(id: number): Observable<Evenement>{
    return this.httpClient.get<Evenement>(`${API.url}/${API.event}/evenements/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((event)=>event.id === id))});
  }

  


}

