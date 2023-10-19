import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    public user: UserService,
    public link: LinksService,
  ) { }

  ngOnInit(): void {
    this.user.getUser();
  }
}
