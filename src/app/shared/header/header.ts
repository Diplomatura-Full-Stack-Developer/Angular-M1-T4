import { Component } from '@angular/core';
import { Navbar } from '../ui/navbar/navbar';
@Component({
  selector: 'app-header',
  imports: [Navbar],
  templateUrl: './header.html',
})
export class Header {
  title: string = 'Angular';
  subtitle: string = 'Modulo 1 - Tarea 4';
}
