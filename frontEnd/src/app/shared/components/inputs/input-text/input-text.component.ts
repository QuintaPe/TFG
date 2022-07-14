import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})

export class InputTextComponent implements OnInit {
  @Input() class:string ='';
  @Input() preText:string = '';
  @Input() placeholder:string = '';
  @Input() isRequired:boolean = false;
  @Input() isDisabled:boolean = false;
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() error: string = '';
  @Output() valueChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }
  
  emitEvent() {
    this.valueChange.emit(this.value);
    console.log(this.value)
  }

}
