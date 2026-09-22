import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../features/users/services/user.service';
import { inject } from '@angular/core';

import { computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatIconModule, MatMenuModule, MatButtonModule, MatIcon],
  templateUrl: './navbar.html',
})
export class Navbar {

  private userService = inject(UserService);

  session = computed(() => this.userService.session());

  logout = () => {
    this.userService.logoutUser();
  };

}
