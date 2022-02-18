import { EventEmitter, Injectable } from "@angular/core";

import { AccountModel } from "./account.model";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  getAccounts() {
    return this.accounts;
  }

  addAccount(account: AccountModel) {
    this.accounts.push(account);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
