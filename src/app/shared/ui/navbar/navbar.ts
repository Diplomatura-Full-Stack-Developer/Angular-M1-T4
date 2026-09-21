import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Users } from '../../../features/users/services/users.service';
import { inject } from '@angular/core';

import { computed } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {

  private usersService = inject(Users);

  session = computed(() => this.usersService.session());

  logout = () => {
    this.usersService.logoutUser();
  };

}
