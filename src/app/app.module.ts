import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { TransferComponent } from './transfer/transfer.component';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    TransferComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
