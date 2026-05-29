import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  public isLoading$ = signal(false);
}
