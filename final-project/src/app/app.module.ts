import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorItemComponent } from './authors/author-item/author-item.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorsFilterPipe } from './authors/authors-filter.pipe';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component'
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationItemComponent } from './locations/location-item/location-item.component';
import { LocationEditComponent } from './locations/location-edit/location-edit.component';
import { LocationDetailComponent } from './locations/location-detail/location-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorsComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorItemComponent,
    AuthorEditComponent,
    AuthorsFilterPipe,
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    LocationsComponent,
    LocationListComponent,
    LocationEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    RouterModule,
    LocationItemComponent,
    LocationDetailComponent,
    BookEditComponent,
    DropdownDirective,

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
