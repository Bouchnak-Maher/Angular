import { Component, OnInit } from '@angular/core';
import { Publication } from "../../models/publication";
import { PublicationService } from "../../services/publication.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  publications: Publication[] = [];
  constructor(private PS: PublicationService, private dialog: MatDialog, public authService: AuthService) {}
  isAuthenticated: boolean = false;

  ngOnInit() {
    this.loadPub();
    this.authService.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }


  loadPub(): void {
    this.PS.getPublications().subscribe(
      (publications) => {
        this.publications = publications;
      },
      (error) => {
        console.error('Error fetching publications:', error);
      }
    );
  }

  deletePublication(publicationId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this publication?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.PS.deletePublication(publicationId).subscribe(() => {
          this.loadPub();
        });
      }
    });
  }
}
