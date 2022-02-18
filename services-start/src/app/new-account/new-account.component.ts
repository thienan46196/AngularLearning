import { Component, EventEmitter, Output } from "@angular/core";

import { AccountModel } from "./../account.model";
import { AccountsService } from "./../accounts.service";
import { LoggingService } from "./../logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
  // providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accountsService: AccountsService
  ) {
    this.accountsService.statusUpdated.subscribe((status: string) =>
      alert(status)
    );
  }

  onCreateAccount(newAccount: AccountModel) {
    this.accountsService.addAccount(newAccount);
    // this.loggingService.logStatusChange(newAccount.status); //Move into AccountService
  }
}
