import { Component } from "@angular/core";



@Component ({
    selector: 'app-post-create',
    templateUrl: '../posts/post-create.component.html'

})
export class PostCreateComponent {

    newPost = '';
    newVal = "Two way binding !!";

    onAddPost() {
        this.newPost = this.newVal;

    }
}