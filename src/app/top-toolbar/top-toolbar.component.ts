import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {Observable} from "rxjs";

import {UserService} from "../../users/user.service";
import {LayoutService} from "../layout.service";

import {IntroductionDialogComponent} from "../../components/introduction-dialog.component";
import {LoginDialogComponent} from "../../users/login-dialog.component";
import {RasterRepositoryComponent} from "../../components/raster-repository.component";
import {AbcdRepositoryComponent} from "../../components/abcd-repository.component";
import {CsvRepositoryComponent} from "../../components/csv-repository.component";
import {GfbioBasketsComponent} from "../../baskets/gfbio-baskets.component";
import {OperatorRepositoryComponent} from "../../components/operator-repository.component";

import Config from '../config.model';

@Component({
  selector: 'wave-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
    private username$: Observable<string>;

    private RRC = RasterRepositoryComponent; // tslint:disable-line:no-unused-variable variable-name
    private ARC = AbcdRepositoryComponent; // tslint:disable-line:no-unused-variable variable-name
    private CSV = CsvRepositoryComponent; // tslint:disable-line:no-unused-variable variable-name
    private GBC = GfbioBasketsComponent; // tslint:disable-line:no-unused-variable variable-name
    private ORC = OperatorRepositoryComponent; // tslint:disable-line:no-unused-variable variable-name
    private Config = Config; // tslint:disable-line:no-unused-variable variable-name

  constructor(
      public dialog: MdDialog,
      private userService: UserService,
      private layoutService: LayoutService
  ) { }

  ngOnInit() {
      this.username$ = this.userService.getSessionStream().map(
          session =>  session.user === Config.USER.GUEST.NAME ? 'login' : session.user
      );
  }

  ngAfterContentInit() {
      if (this.userService.shouldShowIntroductoryPopup()) {
          setTimeout(() => {
              this.dialog.open(IntroductionDialogComponent, {});
          });
      }
  }

  openUserDialog() {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
          disableClose: false
      });
  }

}