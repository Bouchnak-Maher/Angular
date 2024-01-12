import { Component } from '@angular/core';
import {Publication} from "../../models/publication";
import {PublicationService} from "../../services/publication.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  publications: Publication[] = [];

  constructor(private PS: PublicationService,private dialog: MatDialog) {}
  loadPub() : void{
    // pubs
    this.PS.getPublications().subscribe(
      (publications) => {
        this.publications = publications;
      },
      (error) => {
        console.error('Error fetching publications:', error);
      }
    );
  }

  ngOnInit() {
   this.loadPub();
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
