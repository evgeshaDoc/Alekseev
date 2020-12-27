require('dotenv').config();
import { parentPort } from 'worker_threads';
import random from 'random';
import { Patient } from '../patient';

const rand: Function = random.exponential(2 / 60000);
const perLog = (num: number) => {
  console.log('Очередь' + num);
  return num;
};

parentPort?.postMessage({ value: new Patient(), type: 'patient' });

setTimeout(function run() {
  parentPort?.postMessage({ value: new Patient(), type: 'patient' });
  setTimeout(
    run,
    perLog(Math.round(rand() / (Number(process.env.SPEEDUP) || 60)))
  );
}, perLog(Math.round(rand() / (Number(process.env.SPEEDUP) || 60))));

// setInterval(() => {
// }, perLog(Math.round(rand()) / (Number(process.env.SPEEDUP) || 60)));
