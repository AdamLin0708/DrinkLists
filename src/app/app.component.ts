import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { isNull } from "util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;

  constructor(private appService: AppService) {}

  getTodos() {
    return this.appService.get().then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
    });
  }

  ngOnInit() {
    this.getTodos();
  }

  addTodo() {
    this.appService
      .add({ title: this.newTodo, isDone: false })
      .then(() => {
        return this.getTodos();
      })
      .then(() => {
        this.newTodo = ""; // clear input form value
      });
  }

  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.appService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  updateTodoPrice(todo, newValue) {
    todo.price = newValue;
    return this.appService.putPrice(todo).then(() => {
      todo.editingPrice = false;
      return this.getTodos();
    });
  }

  updateTodoComment(todo, newValue) {
    newValue = newValue.replace(/\r?\n/g, "<br />");
    todo.comment = newValue;
    return this.appService.putComment(todo).then(() => {
      todo.editingComment = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo) {
    this.appService.delete(todo).then(() => {
      return this.getTodos();
    });
  }

  submitForm(form: any): void {
    var check = false;
    if (form.title === "" || form.price === "") {
      check = false;
    } else {
      check = true;
    }

    if (check) {
      form.comment = form.comment.replace(/\r?\n/g, "<br />");
      this.appService
        .add({
          title: form.title,
          price: form.price,
          comment: form.comment,
          isDone: false
        })
        .then(() => {
          return this.getTodos();
        })
        .then(() => {
          form = ""; // clear input form value
        });
    }
  }
}
