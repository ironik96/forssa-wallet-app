import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: 'transfer', component: TransferComponent }],
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
