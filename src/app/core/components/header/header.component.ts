import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
navigation = [
  { name: 'Overzicht', link: '/transactions' },
  { name: 'Inzicht', link: '/transactions' },
  { name: 'Store', link: '/transactions' },
  { name: 'Service', link: '/transactions' },
]
}
