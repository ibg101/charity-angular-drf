import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public labelCustomFont: string = '';
  @Input() public isCheckbox: boolean = false;
  @Input() public control: FormControl = new FormControl();
  public inputType: string = '';

  ngOnInit(): void {
    this.isCheckbox ? this.inputType = 'checkbox' : this.inputType = 'text'; 
  }
}
