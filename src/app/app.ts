import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-m1-t3');


  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        localStorage.setItem('lastUrl', event.urlAfterRedirects);
      });
  }

  ngOnInit(): void {
    const lastUrl = localStorage.getItem('lastUrl');

    if (lastUrl) {
      this.router.navigateByUrl(lastUrl);
    }
  }
}
