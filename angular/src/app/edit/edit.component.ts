import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
    id: any;
    currentAuthor: any;
    full_name: any;
    errors: any;

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
      this.getAuthorEdit(this.id);
    }


    getAuthorEdit(id){
        let observable = this._httpService.findAuthor(this.id);
        observable.subscribe(data => {
            console.log("from getAuthorEdit in edit component", data);
            this.currentAuthor = data['data'];
            // this.full_name = data['data'];
            // console.log(this.currentAuthor.full_name);
        })
    }


    submitEdit(){
        console.log(this.currentAuthor._id)
        console.log(this.currentAuthor.full_name)
        let observable = this._httpService.submitAuthor(this.currentAuthor._id, this.currentAuthor);
        observable.subscribe(data => {
            console.log(data);
            if (data['errors']) {
                console.log(data['errors']);
                this.errors = data['errors'];
            }
            else {
                console.log("Author successfully updated", data)
                this._router.navigate(['/'])
            }
        })
    }


}
