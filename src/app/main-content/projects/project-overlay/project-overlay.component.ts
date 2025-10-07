import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss',
})
export class ProjectOverlayComponent {
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();
  open = true;

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) {
      this.open = false;
      this.closed.emit();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.open = false;
      this.closed.emit();
    }
  }

  close() {
    this.open = false;
    this.closed.emit();
  }
}

