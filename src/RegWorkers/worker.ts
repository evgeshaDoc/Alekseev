require('dotenv').config();
import { parentPort } from 'worker_threads';
import random from 'random';
import { Patient } from '../patient';

interface recievedVal {
  type: String;
  patient: Patient;
  indexToDelete: number;
}

const rand: Function = random.exponential(2 / 60000);
const perLog = (num: number) => {
  console.log('Регистратура ' + num);
  return num;
};
const snooze = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

parentPort?.on('message', async (val: recievedVal) => {
  if (val.type === 'add') {
    parentPort?.postMessage({ type: 'wait' });
    // console.log('snooze start');
    await snooze(perLog(val.patient.serveTime));
    // console.log('snooze end');
    parentPort?.postMessage({ type: 'free', indexToDelete: val.indexToDelete });
  }
});
