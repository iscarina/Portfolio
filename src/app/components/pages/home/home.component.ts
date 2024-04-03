import { Component, Renderer2} from '@angular/core';
import { ShaderArt } from 'shader-art';
import { UniformPlugin } from '@shader-art/plugin-uniform';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _renderer: Renderer2){
    ShaderArt.register([() => new UniformPlugin()]);
  }

  ngOnInit(){
    this._renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy(): void {
    this._renderer.removeStyle(document.body, 'overflow');
  }

}
