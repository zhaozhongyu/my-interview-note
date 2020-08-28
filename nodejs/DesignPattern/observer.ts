/**
 * @description 观察者模式
 */

 // 观察者
class Observer {
  constructor() {

  }
  update(val: any) {

  }
}
// 观察者列表
class ObserverList {
  observerList: Observer[];
  constructor() {
      this.observerList = []
  }
  add(observer: Observer): number {
      return this.observerList.push(observer);
  }
  remove(observer: Object): void {
      this.observerList = this.observerList.filter(ob => ob !== observer);
  }
  count(): number {
      return this.observerList.length;
  }
  get(index): any {
      return this.observerList[index];
  }
}
// 目标
class Subject {
  observers: ObserverList;
  constructor() {
      this.observers = new ObserverList();
  }
  addObserver(observer: Observer): void {
      this.observers.add(observer);
  }
  removeObserver(observer: Observer): void {
      this.observers.remove(observer);
  }
  notify(...args): any {
      let obCount = this.observers.count();
      for (let index: number = 0; index < obCount; index++) {
          this.observers.get(index).update(...args);
      }
  }
}