import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/components/header/header.component";
import { NavigationComponent } from "./core/components/navigation/navigation.component";
import { ErrorHandlingService } from './core/services/error-handling.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private errorHandlingService = inject(ErrorHandlingService);
  hasError = this.errorHandlingService.hasError;
}
