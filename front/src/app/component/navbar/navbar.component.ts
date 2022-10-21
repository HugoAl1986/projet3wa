import { Component,ElementRef,HostListener,OnInit, TemplateRef} from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  authentication:string;
  langFr:string = "fr";
  langUs:string = "us";
  opacityFr:string="0.5";
  opacityUs:string = "0.5";

  modalRef?: BsModalRef;

  myGroup = new FormGroup({
    title: new FormControl()
  })

  constructor(private service : MoviesService,private router : Router, private userService : UserService, public translate: TranslateService,private el : ElementRef, private modalService: BsModalService){
    translate.addLangs(['fr', 'us']);
    translate.setDefaultLang('fr');
    this.opacityFr = "1";
    
  } 

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe(data => this.authentication = data);
    this.userService.token.subscribe(data => console.log(data));
  }

  @HostListener('keydown') onKeydown() { 
  let part = this.el.nativeElement.querySelector('.inputsearch').value;
  this.service.emitEvent(part);
  }

  unsubscribe():void{
    this.userService.token.next("none");
    this.userService.isAuthenticated.next("none");
    this.userService.isAuthenticated.subscribe(data=>this.authentication = data);
    this.router.navigate(['movies']);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
}
