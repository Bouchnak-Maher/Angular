import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EvenementService } from 'src/services/event.service';
import { Evenement } from 'src/models/event';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ConsulterInvitesComponent } from '../consulter-invites/consulter-invites.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AffecterMemberComponent } from '../affecter-member/affecter-member.component';
import { MemberService } from 'src/services/member.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ["id", "titre", "dateDebut", "dateFin", "lieu"];
  dataSource: MatTableDataSource<Evenement>;
  isAuthenticated: boolean = false;

  obs: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ES: EvenementService, private MS: MemberService, private router:Router, private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,public authService: AuthService) {}

  loadEvents(): void {
    this.ES.getEvenements().subscribe(events => {
      this.dataSource = new MatTableDataSource(events);
      this.obs = this.dataSource.connect();

      // Move paginator initialization inside the subscription block
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  ngOnInit() {
    this.loadEvents();
    this.authService.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngAfterViewInit() {
    // No additional logic needed for ngAfterViewInit at the moment
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  consulter(eventId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { eventId };
    const dialogRef = this.dialog.open(ConsulterInvitesComponent, dialogConfig);
  }

  affecter(eventId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>
    {
      console.log(data);
      this.MS.affectMemberToEvent(data.member.id, eventId).subscribe(()=>{
      

      });
    });



  }

  delete(id : number): void{
    this.ES.deleteEvenement(id).subscribe(()=>{
      this.loadEvents();
    })

  }


  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}

