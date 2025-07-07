import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-author-edit',
  standalone: false,
  templateUrl: './author-edit.component.html',
  styleUrl: './author-edit.component.css'
})
export class AuthorEditComponent implements OnInit {

  originalAuthor: Author;
  author: Author;
  groupAuthors: Author[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe (
      (params: Params) => {
        const id = params["id"];
        if (id === undefined || id === null){
          this.editMode = false;
          return;
        }

        this.originalAuthor = this.authorService.getAuthor(id);

        if (this.originalAuthor === undefined || this.originalAuthor === null){
          return
        }

        this.editMode = true;
        this.author = JSON.parse(JSON.stringify(this.originalAuthor));

        if (this.author.group) {
          this.groupAuthors = JSON.parse(JSON.stringify(this.originalAuthor.group));
        }
      }
    )
  }

   onSubmit(form: NgForm){
    const value = form.value;
    const newAuthor: Author = {
      id: this.editMode && this.originalAuthor ? this.originalAuthor.id : '',
      name: value.name,
      email: value.email,
      age: value.phone,
      imageUrl: value.imageUrl,
      group: value.group,
    };

    if (this.editMode === true){
      this.authorService.updateAuthor(this.originalAuthor as Author, newAuthor)
    } else {
      this.authorService.addAuthor(newAuthor)
    }
    
    this.router.navigate(['/authors'])
  }

  onCancel(){
    this.router.navigate(['/authors']);
  }

  isInvalidAuthor(newAuthor: Author) {
    if(!newAuthor){
      return true;
    }
    if(this.author && newAuthor.id === this.author.id) {
      return true;
    }

    for(let i = 0; i < this.groupAuthors.length; i++){
      if(newAuthor.id === this.groupAuthors[i].id) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    const selectedAuthor: Author = $event.dragData;
    const invalidGroupAuthor = this.isInvalidAuthor(selectedAuthor);
    if (invalidGroupAuthor){
      return;
    }
    this.groupAuthors.push(selectedAuthor);
  }

  onRemoveItem(index: number){
    if(index < 0 || index >= this.groupAuthors.length) {
      return;
    }
    this.groupAuthors.splice(index, 1);
  }
}
