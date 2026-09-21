import { Component, inject } from '@angular/core';
import { Navbar } from '../ui/navbar/navbar';
import { UserService } from '../../features/users/services/user.service';
import { computed } from '@angular/core';
@Component({
  selector: 'app-header',
  imports: [Navbar],
  templateUrl: './header.html',
})
export class Header {

  private userService = inject(UserService);

  session = computed(() => this.userService.session());

  setTitle = computed(() => this.session()?.name ? `Hola, ${this.session()?.name}` : 'Angular');


}
