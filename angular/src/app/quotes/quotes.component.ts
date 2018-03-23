import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
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
          // console.log("Id:", this.id);
      });
      this.getQuotesFromAuthor(this.id);
  }


  getQuotesFromAuthor(id) {
      // console.log("From quotes component", id);
      let observable = this._httpService.findAuthor(this.id);
      observable.subscribe(data => {
          console.log("from quotes component", data);
          // console.log(data['data']['full_name']);
          this.full_name = data['data']['full_name'];
          this.quotes = data['data']['quote'];
          // console.log(data['data']['quote']);
      })
  }

  addQuote(id) {
      this._router.navigate(['/author_quotes/new/' + id])
  }

  voteUp(quoteID) {
      let observable = this._httpService.upvote(this.id, quoteID);
      observable.subscribe(data => {
          console.log(data);
      })
      this.getQuotesFromAuthor(this.id);
  }

  voteDown(quoteID) {
      let observable = this._httpService.downvote(this.id, quoteID);
      observable.subscribe(data => {
          console.log(data);
      })
      this.getQuotesFromAuthor(this.id);
  }

  deleteQuote(quoteID) {
    // console.log("Deleted Quote", quoteID);
    let observable = this._httpService.deleteQuote(this.id, quoteID);
    observable.subscribe(data => {
        console.log(data);
    })
    this.getQuotesFromAuthor(this.id);
  }

}
