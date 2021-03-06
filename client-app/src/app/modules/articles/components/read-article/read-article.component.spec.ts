import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadArticleComponent } from './read-article.component';

describe('ModalDialogComponent', () => {
  let component: ReadArticleComponent;
  let fixture: ComponentFixture<ReadArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
