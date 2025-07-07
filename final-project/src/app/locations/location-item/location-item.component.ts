import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../location.model'
import { Author } from '../../authors/author.model'
import { AuthorService } from '../../authors/author.service'

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrl: './location-item.component.css'
})
export class LocationItemComponent implements OnInit {
  @Input() location: Location;

  locationPhone: string;

  constructor(private authorService: AuthorService){};

  ngOnInit(): void {
    const author: Author | undefined = this.authorService.getAuthor(this.location.phone);
    if (author) {
      this.locationPhone = author.name;
    } else {
      this.locationPhone = 'Unknown Sender';
    }
  }
}
