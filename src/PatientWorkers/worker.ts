import { parentPort } from 'worker_threads';
import { Patient } from '../patient';

setInterval(() => {
  parentPort?.postMessage({ value: new Patient(), type: 'patient' });
}, 1000);
