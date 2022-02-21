import { ServerResolver } from "./servers/server/server-resolver.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { AuthGuard } from "./auth-guard.service";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "users/:id/:name", component: UserComponent },
  {
    path: "servers",
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },

  // Notice: Always on bottom
  // { path: "page-not-found", component: PageNotFoundComponent },
  {
    path: "page-not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" },
  },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
