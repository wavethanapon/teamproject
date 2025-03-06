import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../footer/footer.component";
import { InfoComponent } from "../info/info.component";

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, FooterComponent, InfoComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
