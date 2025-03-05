import { Routes } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'table',component:DataTableComponent},
    {path:'login',component:LoginComponent},
];
