export interface USER{
    id?:number;
    username:string;
    password:string;
    email:string;
    first_name:string;
    last_name:string;
    mobile:string;
    department:string;
    role:string;
    location:string;
    is_verified:boolean;
    is_active:boolean;
    is_staff:boolean;
    date_created:string;
    date_updated:string;

}

export class USERCLASS{
    id!:number;
    username:string='';
    password:string='';
    email:string='';
    first_name:string='';
    last_name:string='';
    mobile:string='';
    department:string='';
    role:string='';
    location:string='';
    is_verified:boolean=false;
    is_active:boolean=false;
    is_staff:boolean=false;
    date_created:string='';
    date_updated:string='';

}
