import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHomeCardComponent } from './article-home-card.component';

describe('ArticleHomeCardComponent', () => {
  let component: ArticleHomeCardComponent;
  let fixture: ComponentFixture<ArticleHomeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleHomeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleHomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
