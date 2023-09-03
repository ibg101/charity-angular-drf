import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],  
})
export class InputComponent {
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public labelCustomFont: string = '';
  @Input() public isCheckbox: boolean = false;
  @Input() public control: FormControl<any> = new FormControl();

  constructor(
    private auth: AuthService,
  ) { }

  toggleCheckboxState(event: Event): void {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.auth.getControl('rememberMe').setValue(checked);
  }
}
