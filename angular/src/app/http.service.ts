import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }


    getAuthors(){
      return this._http.get('/authors')
    }

    addAuthor(newAuthor){
      return this._http.post('/authors/new', newAuthor)
    }

    findAuthor(id){
        return this._http.get('/authors/'+id)
    }

    submitAuthor(id, data) {
      return this._http.put('/authors/update/'+id, data)
    }

    deleteAuthor(id){
      return this._http.delete('/authors/remove/'+id)
    }

    getQuotes(id){
      return this._http.get('/author_quotes/:id')
    }

    addQuote(id, newQuote){
        console.log("From Service: ", newQuote);
        return this._http.put('/author_quotes/new/'+id, {data: newQuote})
    }

    deleteQuote(id, quoteID) {
        console.log('FROM SERVICE: DELETE QUOTE', quoteID)
        return this._http.post('/author_quotes/delete/'+id, {data: quoteID})
    }

    upvote(id, quoteID) {
        // console.log("service received quote to upvote", id, quoteID);
        return this._http.post('/author_quotes/upvote/'+id, {data: quoteID})
    }

    downvote(id, quoteID) {
        // console.log("service received quote to upvote", id, quoteID);
        return this._http.post('/author_quotes/downvote/'+id, {data: quoteID})
    }


}
