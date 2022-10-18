export class Category{
    id:number;
    name:string

    constructor(name:string){
        this.name = name;
    }

    public setName(name:string):void{
        this.name= name;
    }
    public getName():string{
        return this.name;
    }
}