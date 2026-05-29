import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title: string = 'MyApp';
  public counter:number = 0;
  public stockPrice:number = 0;
  private _lastUpdateTime:number = 0;
  private _detectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private ngZone:NgZone = inject(NgZone)



  constructor() {
    // const customComponent = new ExampleComponent();

    // customComponent.update({name: "toto", age: 30}); 
    // console.log(customComponent.isUpdated());
    // console.log(customComponent.isUpdated());

    // customComponent.update({name: "Merlin"});
    // console.log(customComponent.isUpdated());
    // console.log(customComponent.isUpdated());
    // console.log(customComponent.getState());

    this.ngZone.runOutsideAngular( 
      ()=>{
        setInterval( 
          ()=>{
            this.stockPrice = Math.round( Math.random() * 100 );
            if( Date.now() - this._lastUpdateTime > 1000){
              this.ngZone.run( 
                ()=>{
                  this._detectorRef.markForCheck();
                  this._lastUpdateTime = Date.now();
                  // this._detectorRef.detectChanges();
                }
              )
            }
          }, 
          10
        )
      }
    )


  }

  public increment(){
    this.counter++;
    // this._detectorRef.markForCheck();
    // this._detectorRef.detectChanges();
  }

  ngOnInit(){
    // this._detectorRef.detach();
  }
}
