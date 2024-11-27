import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsService } from '../../services/utils.service';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [UtilsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 50;
    component.limit = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders correct pagination', () => {
    const pageContainer = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );
    expect(pageContainer.length).toBe(5);
    expect(pageContainer[0].nativeElement.textContent).toBe(' 1 ');
  });

  it('should emit a clicked page event', () => {
    const pageContainer = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );
    // create a variable to store the clicked page
    let clickedPage: number | undefined;
    // subscribe to the output event
    component.pageChangeEvent
      .pipe(first())
      .subscribe((page) => (clickedPage = page));
    // click on the first page
    // pageContainer[0].nativeElement.click();
    pageContainer[0].triggerEventHandler('click', null);
    // assert that the clicked page is 1
    expect(clickedPage).toEqual(1);
  });
});
