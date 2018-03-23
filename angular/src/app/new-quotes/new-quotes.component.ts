import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-quotes',
  templateUrl: './new-quotes.component.html',
  styleUrls: ['./new-quotes.component.css']
})
export class NewQuotesComponent implements OnInit {
    newQuote: {
        content: String,
        vote: Number
    }
    quotes: any;
    id: any;
    full_name: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params.subscribe( params => {
            this.id = params['id'];
            console.log(" id : ", this.id);
        });
    }

    addQuote(){
        console.log("Quote added!", this.newQuote);
        let observable = this._httpService.addQuote(this.id, this.newQuote);
        observable.subscribe(data => {
            console.log("Got data from post", data)
        })
        this._router.navigate(['/author_quotes/' + this.id])
    }

}
