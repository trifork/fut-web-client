import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  public removeItem(key: string): void {
    return localStorage.removeItem(key);
  }
}
