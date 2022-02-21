import { CanComponentDeactivate } from "./can-deactivate-guard.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(parseInt(id));

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });

    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
