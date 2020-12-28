import { Patient } from './patient';
export class Queue {
  private queue: Array<Patient> = [];

  constructor() {}

  get length(): number {
    return this.queue.length;
  }

  add(value: any) {
    this.queue.push(value);
  }

  remove(idx: number) {
    this.queue.splice(idx, 1);
  }

  get fullArr(): Array<Patient> {
    return this.queue;
  }

  byIndex(idx: number): Patient {
    return this.queue[idx];
  }

  get fastest(): number {
    let min = 1000000;
    let indexMin = 0;
    this.queue.forEach((el, idx) => {
      if (el.serveTime < min) {
        min = el.serveTime;
        indexMin = idx;
      }
    });
    return indexMin;
  }
}
