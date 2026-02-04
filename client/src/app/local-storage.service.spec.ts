import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let mockStorage: { [key: string]: string };

  beforeEach(() => {
    mockStorage = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return mockStorage[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockStorage[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete mockStorage[key];
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should store a string value', () => {
      service.setItem('testKey', 'testValue');
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', '"testValue"');
    });

    it('should store an object value as JSON', () => {
      const obj = { name: 'Test', value: 123 };
      service.setItem('objectKey', obj);
      expect(localStorage.setItem).toHaveBeenCalledWith('objectKey', JSON.stringify(obj));
    });

    it('should store an array value as JSON', () => {
      const arr = [1, 2, 3];
      service.setItem('arrayKey', arr);
      expect(localStorage.setItem).toHaveBeenCalledWith('arrayKey', JSON.stringify(arr));
    });

    it('should store null value', () => {
      service.setItem('nullKey', null);
      expect(localStorage.setItem).toHaveBeenCalledWith('nullKey', 'null');
    });
  });

  describe('getItem', () => {
    it('should retrieve a string value', () => {
      mockStorage['testKey'] = '"testValue"';
      const result = service.getItem<string>('testKey');
      expect(result).toBe('testValue');
    });

    it('should retrieve an object value', () => {
      const obj = { name: 'Test', value: 123 };
      mockStorage['objectKey'] = JSON.stringify(obj);
      const result = service.getItem<{ name: string; value: number }>('objectKey');
      expect(result).toEqual(obj);
    });

    it('should retrieve an array value', () => {
      const arr = [1, 2, 3];
      mockStorage['arrayKey'] = JSON.stringify(arr);
      const result = service.getItem<number[]>('arrayKey');
      expect(result).toEqual(arr);
    });

    it('should return null for non-existent key', () => {
      const result = service.getItem<string>('nonExistentKey');
      expect(result).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('should remove an item from storage', () => {
      mockStorage['keyToRemove'] = '"value"';
      service.removeItem('keyToRemove');
      expect(localStorage.removeItem).toHaveBeenCalledWith('keyToRemove');
    });
  });
});
