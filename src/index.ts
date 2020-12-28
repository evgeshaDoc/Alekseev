import { Worker, parentPort } from 'worker_threads';
import { Queue } from './queue';
import { Patient } from './patient';

interface resultPatient {
  value: Patient;
  type: String;
}

interface resultDelete {
  type: String;
  indexToDelete?: number;
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
  console.log(queue.fullArr);

  if (queue.length > 0 && available) {
    const fastesIdx = queue.fastest;
    workerReg.postMessage({
      type: 'add',
      patient: queue.byIndex(fastesIdx),
      indexToDelete: fastesIdx,
    });
  }
});

workerReg.on('message', (result) => {
  if (result.type === 'wait') available = false;
  else if (result.type === 'free') available = true;
  if (result.type === 'free') {
    console.log(queue.fullArr);
    queue.remove(result.indexToDelete);
    console.log(`\t Удалено! Осталось: ${queue.length}`);
  }
  if (available && queue.length > 0) {
    const fastesIdx = queue.fastest;
    workerReg.postMessage({
      type: 'add',
      serverTime: queue.byIndex(fastesIdx),
    });
  }
});
