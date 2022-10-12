import { ChangeDetectionStrategy, Component,ElementRef,EventEmitter,HostListener, OnInit, Output} from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import { Movie } from 'src/app/model/movie';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @Output() inputSearch = new EventEmitter<string>();
  langFr:string = "fr";
  langUs:string = "us";
  opacityFr:string="0.5";
  opacityUs:string = "0.5";
  newNav:boolean = true;
  displayItem:boolean = true;
  displayIconClose:boolean = false;
  displayIconSearch:boolean = true;

  myGroup = new FormGroup({
    title: new FormControl()
  })

  constructor(private service : MoviesService, public translate: TranslateService, private router :Router ,private el : ElementRef){
    translate.addLangs(['fr', 'us']);
    translate.setDefaultLang('fr');
    this.opacityFr = "1";
    
  } 

  @HostListener('keydown') onKeydown() { 
  let part = this.el.nativeElement.querySelector('.inputsearch').value;
  this.service.emitEvent(part);
  }


  ngOnInit(): void {
    
  }

  chooseLanguage(lang:string){   
    this.translate.use(lang);
    if(lang == 'fr'){
      this.opacityFr = "1";
      this.opacityUs = "0.5";
    } else{
      this.opacityUs = "1";
      this.opacityFr = "0.5";
    }
  }

   
  displaySmall(){
    if(screen.width < 576){
      this.newNav = !this.newNav;
      this.displayItem = !this.displayItem;
      this.displayIconClose = !this.displayIconClose
      this.displayIconSearch = !this.displayIconSearch;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(window.innerWidth < 576){
      this.newNav = true;
    }
}

}
