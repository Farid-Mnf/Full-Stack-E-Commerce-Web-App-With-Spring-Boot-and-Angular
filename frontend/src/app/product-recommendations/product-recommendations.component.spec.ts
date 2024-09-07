import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecommendationsComponent } from './product-recommendations.component';

describe('ProductRecommendationsComponent', () => {
  let component: ProductRecommendationsComponent;
  let fixture: ComponentFixture<ProductRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
