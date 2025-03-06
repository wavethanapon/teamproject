import { Component } from '@angular/core';
import { AppInfoComponent } from './app-info/app-info.component';  // นำเข้า app-info component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [AppInfoComponent],  // นำเข้า app-info ที่นี่
})
export class AppComponent {
  // โค้ดคอมโพเนนต์
}
