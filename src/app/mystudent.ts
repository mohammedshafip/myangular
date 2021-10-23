import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

export interface Mystudent {
    std_ID:number;
    std_firstname: string;
    std_lastname: string;
    std_clasID:number;
    std_dateofbirth: NgbDate;
    std_status:string;

}
