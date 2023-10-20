import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public isActiveModal: boolean = false;

  constructor() { }

  toggleModal(): void {
    this.isActiveModal = !this.isActiveModal;
  }
}
