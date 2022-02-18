import { Component, EventEmitter, Input, Output } from "@angular/core";

import { AccountModel } from "./../account.model";
import { AccountsService } from "./../accounts.service";
import { LoggingService } from "./../logging.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  // providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: AccountModel;
  @Input() id: number;

  constructor(
    private accountsService: AccountsService // private loggingService: LoggingService
  ) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountsService.statusUpdated.emit(status);
  }
}
