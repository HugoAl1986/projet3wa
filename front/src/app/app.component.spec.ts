import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MoviesComponent } from './component/movies/movies.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers : [AppComponent, {provide:TranslateService, MoviesComponent}]
    })
  });

  it('when clicking on displaySmall() function datas must be !', () => {
    const comp = TestBed.inject(AppComponent);
      expect(comp.newNav).withContext("before function").toBe(true);
      expect(comp.displayItem).withContext("before function").toBe(true);
      expect(comp.displayIconClose).withContext("before function").toBe(false);
      expect(comp.displayIconSearch).withContext("before function").toBe(true);
    comp.displaySmall();
    if(screen.width < 576){
      expect(comp.newNav).withContext("after displaysmall").toBe(false);
      expect(comp.displayItem).withContext("after displaysmall").toBe(false);
      expect(comp.displayIconClose).withContext("after displaysmall").toBe(true);
      expect(comp.displayIconSearch).withContext("after displaysmall").toBe(false);
    }
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});