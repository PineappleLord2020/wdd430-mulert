import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsComponent } from '../app/documents/documents.component';
import { MessageListComponent } from '../app/messages/message-list/message-list.component';
import { ContactsComponent } from '../app/contacts/contacts.component';
import { DocumentEditComponent } from '../app/documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from '../app/documents/document-detail/document-detail.component';

const appRoutes: Routes =[
  { path: '', redirectTo: '/documents', pathMatch: 'full'},
  { path: 'documents', component: DocumentsComponent, children: [
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent },
  ] },
  { path: 'documents/:id/edit', component: DocumentEditComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent},
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