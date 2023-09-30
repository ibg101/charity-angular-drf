import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public donation: number = 0;
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser();
  }
}
