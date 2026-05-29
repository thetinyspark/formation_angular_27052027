import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreloaderComponent } from '../preloader/preloader.component';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, PreloaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title: string = 'MyApp';

  constructor() {}
}
