import { Component, Input, OnInit } from "@angular/core";

import { AccountModel } from "./account.model";
import { AccountsService } from "./accounts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AccountsService],
})
export class AppComponent implements OnInit {
  accounts: AccountModel[];

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }
}
