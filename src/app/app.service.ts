import { Injectable } from "@angular/core";

const TODOS = [
  {
    title: "珍珠奶茶",
    price: 50,
    comment: "- 微糖去冰最好喝<br/>- 轉角路口那家手搖店很推",
    isDone: false
  },
  { title: "綠茶", price: 30, comment: "", isDone: false }
];

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor() {}

  get() {
    return new Promise(resolve => resolve(TODOS));
  }

  add(data) {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }

  put(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].title = changed.title;
      resolve(changed);
    });
  }

  putPrice(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].price = changed.price;
      resolve(changed);
    });
  }

  putComment(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].comment = changed.comment;
      TODOS[index].comment = TODOS[index].comment.replace(/\n/g, "");
      resolve(changed);
    });
  }

  delete(selected) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === selected);
      TODOS.splice(index, 1);
      resolve(true);
    });
  }
}
