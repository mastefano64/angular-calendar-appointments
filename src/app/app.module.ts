import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';
import { AppMaterialModule } from './app.material.module';

import { AppComponent } from './app.component';
import { PageSchedulerComponent } from './components/page-scheduler/page-scheduler.component';
import { FormActivityComponent } from './components/form-activity/form-activity.component';
import { ActivityService } from './service/activity-service';
import { ShedulerModule } from './scheduler/scheduler.module';

@NgModule({
  declarations: [
    AppComponent,
    PageSchedulerComponent,
    FormActivityComponent
  ],
  entryComponents: [
    FormActivityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    ShedulerModule,
    AppRoutingModule
  ],
  providers: [
    ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
