import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title: string = 'MyApp';

  constructor() {

    // bind sur les objets de type function permet de créer une copie de la fonction
    // reliée à un contexte spécifique (le this dans la fonction) et de retourner cette copie.
    this.myFunction = this.myFunction.bind(this);

    this.myFunction(); // Logs the AppComponent instance
    setTimeout(this.myFunction, 1000);
  }

  // on a donc une fonction qui est liée à l'instance de AppComponent, même lorsqu'elle est appelée dans un contexte différent (comme dans setTimeout). Cela garantit que le this à l'intérieur de myFunction fait toujours référence à l'instance de AppComponent, ce qui permet d'accéder aux propriétés et méthodes de la classe sans perdre le contexte.
  // comme alternative, on pourrait aussi utiliser une fonction fléchée 
  // public myFunction = (): void => {
  
  public myFunction (): void {
    console.log(this);
  }
}
