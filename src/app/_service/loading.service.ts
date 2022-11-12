import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show() {
    setTimeout(() => this.visibility.next(true));
  }

  hide() {
    setTimeout(() => this.visibility.next(false));
  }
}
