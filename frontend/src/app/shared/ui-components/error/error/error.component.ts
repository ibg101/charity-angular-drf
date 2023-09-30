import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() public error: HttpErrorResponse | null = null;
  
  get errorMsg(): string | null {
    const err = this.error;
    // additional catch statements based on status code
    if (err?.status === 0) {
      return 'Connection Error happened. Please, try again.'
    }
    return err ? err.error.detail : null; 
  }
}
