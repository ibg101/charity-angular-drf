import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],  
})
export class InputComponent implements OnInit {
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public labelCustomFont: string = '';
  @Input() public isCheckbox: boolean = false;
  @Input() public control: FormControl<any> = new FormControl();
  public inputType: string = '';

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.isCheckbox ? this.inputType = 'checkbox' : this.inputType = 'text'; 
  }

  toggleCheckboxState(event: Event): void {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.auth.getControl('rememberMe').setValue(checked);
  }
}
