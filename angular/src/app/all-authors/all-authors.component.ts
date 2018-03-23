import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.css']
})
export class AllAuthorsComponent implements OnInit {
    // authors: [];
    authors: any;
    id: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {
      this.getAuthorsFromService();
  }

  getAuthorsFromService() {
        let observable = this._httpService.getAuthors()
        observable.subscribe(data => {
            console.log("List of Authors:", data)
            this.authors = data['authors'];
        })
    }

    delete(id){
        console.log("Deleted Task", id);
        let observable = this._httpService.deleteAuthor(id);
        observable.subscribe(data => {
            console.log("From observable, task has beeb deleted")
        })
        this.getAuthorsFromService()
    }

    viewQuote(id) {
        console.log("clicked view quote", id);
        this._router.navigate(['/author_quotes/' + id])
    }

    showEdit(id) {
        this._router.navigate(['/edit_author/' + id])
    }


}
