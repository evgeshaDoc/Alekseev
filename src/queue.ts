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

  remove() {
    this.queue.shift();
  }
}
