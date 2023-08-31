import { Component } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(public link: LinksService) { }
}
