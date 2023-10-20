import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../serivces/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>(); 

  constructor(
    public modal: ModalService,
  ) { }

  actionOnClick() {
    this.clickEvent.emit();
    this.modal.toggleModal();
  }
}
