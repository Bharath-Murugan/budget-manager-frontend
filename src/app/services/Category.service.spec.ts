import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoryService } from './CategoryService';
import { Category } from '../models/Category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store categories loaded from the API', () => {
    const mockCategories: Category[] = [
      { categoryId: 1, categoryName: 'Food', createdAt: new Date() }
    ];

    service.loadCategories();

    const req = httpMock.expectOne('http://localhost:8080/categories');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockCategories });

    service.categories$.subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });
  });
});
