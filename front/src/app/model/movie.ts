import { Category } from "./category";

export class Movie {
    id : string;
    name : string;
    duration : number;
    isAdult : string;
    year : number;
    categories?: Array<Category>;

   

    public setName(name:string):void{
        this.name = name;
    }
    public setDuration(duration:number):void{
        this.duration = duration;
    }
    public setIsAdult(isAdult:string):void{
        this.isAdult = isAdult;
    }
    public setYear(year:number):void{
        this.year = year;
    }
    public setCategories(categories:Array<Category>):void{
        this.categories = categories;
    }

}
