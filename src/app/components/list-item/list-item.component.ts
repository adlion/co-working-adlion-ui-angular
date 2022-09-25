import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FieldDataType } from 'src/app/models/models';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  //if this is to be removed make sure to change isChecked. 
  //!performance degradation
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Output() emitCheck = new EventEmitter();
  @Input() item!: FieldDataType;
  @Input() selectedItems: string[] = [];

  constructor() {}

  itemOnClick() {
    this.emitCheck.emit();
  }

  public get isChecked(): boolean {
    return this.selectedItems.indexOf(this.item.navKeyId) > -1;
  }
}
