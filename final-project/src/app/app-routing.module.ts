import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { AuthorsComponent } from './authors/authors.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';

const appRoutes: Routes =[
  { path: '', redirectTo: '/documents', pathMatch: 'full'},
  { path: 'documents', component: DocumentsComponent, children: [
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent},
    { path: ':id/edit', component: DocumentEditComponent },
    ],
  },
  { path: 'messages', component: MessageListComponent },
  { path: 'authors', component: AuthorsComponent, children: [
    { path: 'new', component: AuthorEditComponent},
    { path: ':id', component: AuthorDetailComponent},
    { path: ':id/edit', component: AuthorEditComponent}
  ]},
];

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }