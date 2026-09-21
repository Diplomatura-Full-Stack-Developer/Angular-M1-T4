import { Component, inject } from '@angular/core';
import { Navbar } from '../ui/navbar/navbar';
import { Users } from '../../features/users/services/users.service';
import { computed } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [Navbar],
  templateUrl: './header.html',
})
export class Header {

  private usersService = inject(Users);

  session = computed(() => this.usersService.session());

  setTitle = computed(() => this.session()?.name ? `Hola, ${this.session()?.name}` : 'Angular');


}
