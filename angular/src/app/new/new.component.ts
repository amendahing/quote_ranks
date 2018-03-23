import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent implements OnInit {
    newAuthor: any;
    authors: any;
    errors: any;


    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this.newAuthor = {full_name: ""}
        this.getAuthorsFromService()
    }

    addAuthor() {
        let observable = this._httpService.addAuthor(this.newAuthor);
        observable.subscribe(data => {
            console.log("Got data from post back", data);
            if (data['errors']) {
                console.log(data['errors']);
                this.errors = data['errors'];
            }
            else {
                console.log("Author successfully added", data)
                this.newAuthor = {full_name: ""}
                this._router.navigate(['/'])
            }
        })
        this.getAuthorsFromService()
    }


    getAuthorsFromService() {
        let observable = this._httpService.getAuthors()
        observable.subscribe(data => {
            // console.log("List of Authors:", data)
            this.authors = data['authors'];
        })
    }

}
