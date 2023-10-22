import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/shared/services/links/links.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ModalService } from 'src/app/shared/ui-components/modal/serivces/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainProfileComponent implements OnInit {
  constructor(
    public user: UserService,
    public link: LinksService,
    public modal: ModalService,
  ) { }
  
  ngOnInit(): void {
    this.user.getUser();
  }

  deleteAccount(): void {
    
  }
}
