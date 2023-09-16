import { Component, Input } from '@angular/core';
import { OpenProcess } from 'src/app/models/open-process';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() processes: OpenProcess[] = [];
  @Input() idCurrentProcess: number = 0;

  constructor() { }

}