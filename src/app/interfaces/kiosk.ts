export interface KIOSK{
    id?:number;
    location:string;
    macaddress:string;
    kioskname:string;
    kioskaddress:string;
    date_created:string;
    date_updated:string;
 
}

export class KIOSKCLASS{
    id!:number;
    location:string='';
    macaddress:string='';
    kioskname:string='';
    kioskaddress:string='';
    date_created:string='';
    date_updated:string='';
 
}