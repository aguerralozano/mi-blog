import { Component, Input, OnInit } from '@angular/core';
import { Gif, Type } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-gif-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class GifCardComponent implements OnInit {

  ngOnInit(): void {
    if (!this.gifCard) throw new Error('Gif property is requiresd');
  }

  @Input()
  public gifCard!: Gif;
 //public gifCard: Gif = { };

}
