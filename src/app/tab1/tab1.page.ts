import { Component} from '@angular/core';
import { TasksService } from "../services/tasks.service";
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(public tasksService: TasksService) {}

  addTask() {
    this.tasksService.addTaskToList();
  }

  deleteTask(position: number) {
    this.tasksService.deleteTaskFromList(position);
  }

  change(checkedStatus: boolean, index: number) {
    this.tasksService.onChange(checkedStatus, index);
  }

  reorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.tasksService.doReorder(ev);
  }

  async ngOnInit() {
    await this.tasksService.loadSavedList();
  }

}
