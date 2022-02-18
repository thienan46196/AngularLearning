import { AccountComponent } from "./account/account.component";
import { AccountsService } from "./accounts.service";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { LoggingService } from "./logging.service";
import { NewAccountComponent } from "./new-account/new-account.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule, FormsModule],
  providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
