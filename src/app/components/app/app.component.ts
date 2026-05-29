import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, NgZone, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreloaderComponent } from '../preloader/preloader.component';
import { CatalogService } from '../../services/catalog.service';

// NgZone fonctionne sur le principe des composants à état immutable

// class ExampleComponent{

//   private _oldState:any = {};
//   private _currentState:any = {};

//   update( newState:any ):void{
//     this._oldState = this._currentState; 
//     this._currentState = {...this._currentState, ...newState};
//     Object.freeze(this._currentState);
//   }

//   getState():any{
//     return this._currentState;
//   }

//   isUpdated():boolean{
//     if( this._oldState === this._currentState){
//       return false;
//     }
//     else{
//       this._oldState = this._currentState;
//       return true;
//     }
//   }
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, PreloaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css', 

})
export class AppComponent {

  @Input()
  public title: string = 'MyApp';
  constructor() {}

  // en règle générale on ne sert pas trop de ce hook, car il est appelé trop fréquemment
  ngOnChanges(changes:SimpleChanges):void{
    if( changes["title"]){
      switch( changes["title"].currentValue){
        case "MyApp": 
          changes["title"].currentValue = "MySuperApp"; 
          break;
      }
    }
  }

  // lui est appelé quand le composant est initialisé et qu'il n'y a plus de changements sur les @Input après l'initialisaton du composant
  ngOnInit(){
    // this._detectorRef.detach();
  }

  // trop fréquemment appelé à éviter
  ngDoCheck():void{
    // est appelé chaque fois qu'il y a un changement d'état
  }

  ngOnDestroy():void{
    // est appelé avant que le composant ne soit détruit
  }

  // trop fréquemment appelé à éviter
  ngAfterContentInit():void{
    // est appelé lorsque le contenu projeté a été initialisé
  }

  // trop fréquemment appelé à éviter
  ngAfterContentChecked():void{
    // est appelé lorsque le contenu projeté a été vérifié
  }

  // trop fréquemment appelé à éviter
  ngAfterViewInit():void{
    // est appelé lorsque le dom du composant ainsi que celui de ses enfants est initialisé
  }

  // trop fréquemment appelé à éviter
  ngAfterViewChecked():void{
    // est appelé lorsque le dom du composant ainsi que celui de ses enfants est vérifié
  }
}
