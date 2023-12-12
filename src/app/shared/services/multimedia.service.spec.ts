import { TestBed } from '@angular/core/testing';

import { MultimediaService } from './multimedia.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MultimediaService', () => {
  let service: MultimediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MultimediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
