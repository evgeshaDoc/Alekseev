import { Worker, parentPort } from 'worker_threads';
import { Queue } from './queue';
import { Patient } from './patient';

interface resultPatient {
  value: Patient;
  type: String;
}

const queue = new Queue();
let available = true;

const workerPatient: Worker = new Worker('./src/PatientWorkers/worker.js', {
  workerData: {
    path: './worker.ts',
  },
});

const workerReg: Worker = new Worker('./src/RegWorkers/worker.js', {
  workerData: { path: './worker.ts', queue },
});

workerPatient.on('message', (result: resultPatient) => {
  //Добавление в очередь
  queue.add(result.value);
  console.log(`Добавлено! В очереди: ${queue.length}`);
  if (available) workerReg.postMessage('add');
});

workerReg.on('message', (result) => {
  if (result === 'wait') available = false;
  else if (result === 'free') available = true;
  if (result === 'free') {
    queue.remove();
    console.log(`\t Удалено! Осталось: ${queue.length}`);
  }
  if (available && queue.length > 0) workerReg.postMessage('add');
});
