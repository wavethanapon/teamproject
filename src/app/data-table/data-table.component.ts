import { Component, OnInit } from '@angular/core'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';  // ✅ นำเข้า HttpClient และ HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,  // ✅ ใช้ Standalone Component
  imports: [CommonModule, HttpClientModule],  // ✅ เพิ่ม HttpClientModule ใน imports
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  tableData: any[] = []; // ✅ เปลี่ยนชื่อตัวแปรเป็น tableData

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/showscorefull')
      .subscribe((data) => {
        this.tableData = data; // ✅ อัปเดตข้อมูลเข้า tableData
      });
  }
}