import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarNavbarComponent } from './calendar-navbar/calendar-navbar.component';
import { CalendarCelDateComponent } from './calendar-celdate/calendar-celdate.component';
import { CalendarCelTimeComponent } from './calendar-celtime/calendar-celtime.component';
import { CalendarAttivityComponent } from './calendar-attivity/calendar-attivity.component';
import { CelHighlightDirective } from './directive/celhighlight.directive';

import {
  MatButtonModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatIconModule,
  MatDatepickerModule,
  NativeDateModule
} from '@angular/material';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarNavbarComponent,
    CalendarCelDateComponent,
    CalendarCelTimeComponent,
    CalendarAttivityComponent,
    CelHighlightDirective
  ],
  exports: [
    CalendarComponent,
    CalendarNavbarComponent,
    CalendarCelDateComponent,
    CalendarCelTimeComponent,
    CalendarAttivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    NativeDateModule
  ]
})
export class ShedulerModule { }
