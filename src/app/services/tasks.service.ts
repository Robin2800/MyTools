import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ItemReorderEventDetail } from '@ionic/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  
  public task: string;
  public taskList = [];
  private TODO_STORAGE: string = "todos";

  constructor() { }

  private async setLocalStorage() {
    Storage.set({
      key: this.TODO_STORAGE,
      value: JSON.stringify(this.taskList)
    })
  }

  public async addTaskToList() {
    if (this.task.length > 0) {
      this.taskList.unshift([this.task, false]);
      this.task = "";
      this.setLocalStorage();
    }
  }

  public async deleteTaskFromList(index: number) {
    this.taskList.splice(index, 1);
    this.setLocalStorage();
  }

  public async onChange(isChecked: boolean, i: number) {
    if (isChecked == false) {
      this.taskList[i][1] = true;
      this.taskList.push(this.taskList[i]);
      this.deleteTaskFromList(i);

      this.setLocalStorage();
    } else {
      this.taskList[i][1] = false;
      var temp = this.taskList[i];
      this.deleteTaskFromList(i);
      this.taskList.unshift(temp);

      this.setLocalStorage();
    }
  }

  public doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.taskList = ev.detail.complete(this.taskList);
    this.setLocalStorage();
  }

  public async loadSavedList() {
    const todoList = await Storage.get({key: this.TODO_STORAGE});
    this.taskList = JSON.parse(todoList.value) || [];
  }
}
