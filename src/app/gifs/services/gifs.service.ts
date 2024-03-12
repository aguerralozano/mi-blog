import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse, The480_WStill } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];


  public gifList: Gif[] = [];

  private apiKey: string = 'YnsuI0C5VUSNAHWHuL4ORi1NwaDcUfsC';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const temporal = localStorage.getItem('history');

    if(!temporal) return;

    this._tagsHistory = JSON.parse(temporal);

    if(this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);

  }

  /*
  async searchTag(tag: string): Promise<void> {
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    fetch('https://api.giphy.com/v1/gifs/search?api_key=YnsuI0C5VUSNAHWHuL4ORi1NwaDcUfsC&q=cheeseburgers&limit=10')
      .then(resp => resp.json())
      .then(data => console.log(data));

  }
  */

  /*
  async searchTag(tag: string): Promise<void> {
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=YnsuI0C5VUSNAHWHuL4ORi1NwaDcUfsC&q=cheeseburgers&limit=10')
    const data = resp.json();
    console.log(data);
  }
  */


  searchTag(tag: string): void {

    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
      .subscribe( resp => {
        this.gifList = resp.data;
        console.log(this.gifList);
      });
  }

}
