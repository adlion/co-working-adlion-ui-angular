import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FieldDataType } from 'src/app/models/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() listItems: FieldDataType[] = [];
  @Output() emitListExpand = new EventEmitter();
  @Output() emitFields = new EventEmitter<string[]>();
  constructor() {}
  expandGroup: string[] = [];
  selectedFields: string[] = [];

  sidebarExpanded = false;

  itemOnClick(id: string) {
    // const elIndex = this.selectedFields.indexOf(id);
    // elIndex > -1
    //   ? this.selectedFields.splice(elIndex, 1)
    //   : this.selectedFields.push(id);
    // this.selectedFields = [...this.selectedFields];

    //Pie charts need on filed
    //For multiple selections uncomment and remove the following line
    this.selectedFields.splice(0, 1, id);

    //trigger angular on push strategy 
    this.selectedFields = [...this.selectedFields];
    this.emitFields.emit(this.selectedFields);
  }

  groupOnClick(id: string) {
    const elIndex = this.expandGroup.indexOf(id);
    elIndex > -1
      ? this.expandGroup.splice(elIndex, 1)
      : this.expandGroup.push(id);

    if (id.split('__')[0] === '0') {
      this.emitListExpand.emit((this.sidebarExpanded = !this.sidebarExpanded));
    }
  }
}
