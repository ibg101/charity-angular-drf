import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../serivces/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() submitEvent: EventEmitter<void> = new EventEmitter<void>(); 

  constructor(
    public modal: ModalService,
  ) { }

  actionOnClick() {
    this.submitEvent.emit();
    this.modal.toggleModal();
  }
}
