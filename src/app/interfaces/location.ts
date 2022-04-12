export interface LOCATION{
    id?:number;
    name:string;
    date_created:string;
    date_updated:string;
 
}

export class LOCATIONCLASS{
    id!:number;
    name:string='';
    date_created:string='';
    date_updated:string='';
 
}