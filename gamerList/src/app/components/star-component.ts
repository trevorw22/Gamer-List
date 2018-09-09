import { Component, Input, Output, EventEmitter } from '@angular/core'
@Component({
    selector:'rating',
    templateUrl:'./star.component.html',
    styles:[
      `
      .rating {
    float:left;
    border:none;
}
/***************************
Hides the radio buttons
***************************/
.rating:not(:checked) > input {
    position:absolute;
    top:-9999px;
    clip:rect(0,0,0,0);
}
/***************************
Default stars styles
***************************/
.rating:not(:checked) > ion-icon {
    float:right;
    width:1em;
    padding-top:6px;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:160%;
    line-height:1.2;
    color:#ddd;
}
/***************************
Adds the star symbol to the labels
***************************/
.rating:not(:checked) > label:before {
    content: '★ ';
}
/***************************
Colour for the applied rating stars
***************************/
.rating > input:checked ~ ion-icon {
    color: darkorange;
}
/***************************
Colour for hovered stars when increasing the rating
***************************/
.rating:not(:checked) > ion-icon:hover,
.rating:not(:checked) > ion-icon:hover ~ ion-icon {
    color: darkorange;
}
/***************************
Colour for hovered stars when decreasing the rating
***************************/
.rating > input:checked ~ ion-icon:hover,
.rating > input:checked ~ ion-icon:hover ~ ion-icon,
.rating > ion-icon:hover ~ input:checked ~ ion-icon {
    color: darkorange;
}
  
      `
    ]
})
 
export class RatingComponent {
    @Input() rating: number; 
    @Input() itemId: number;    
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
    
    inpustName:string;
    ngOnInit() {
        this.inpustName = this.itemId + '_rating';
    }
    onClick(rating:number):void{

        this.rating = rating;
        this.ratingClick.next({
            itemId: this.itemId,
            rating: rating
        });
    }    
}