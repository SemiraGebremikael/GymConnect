import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

@Output() searchEvent = new EventEmitter<string>();
  searchText = '';

  onSearchInput() {
    this.searchEvent.emit(this.searchText.trim());
  }

  clearSearch() {
    this.searchText = '';
  }

}