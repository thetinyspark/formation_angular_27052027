import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent {
  public isLoading$ = inject(PreloaderService).isLoading$;
  constructor() {}
}
