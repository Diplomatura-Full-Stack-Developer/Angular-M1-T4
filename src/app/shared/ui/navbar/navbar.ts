import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../features/users/services/user.service';
import { inject } from '@angular/core';

import { computed } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {

  private userService = inject(UserService);

  session = computed(() => this.userService.session());

  logout = () => {
    this.userService.logoutUser();
  };

}
