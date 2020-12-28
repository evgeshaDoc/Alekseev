require('dotenv').config();
import { parentPort } from 'worker_threads';
import random from 'random';
import { Patient } from '../patient';

const rand: Function = random.exponential(1 / 60000);
const rand2: Function = random.exponential(2 / 60000);
const perLog = (num: number) => {
  console.log('Очередь ' + num);
  return num;
};

parentPort?.postMessage({
  value: new Patient(
    perLog(Math.round(rand2() / (Number(process.env.SPEEDUP) || 60)))
  ),
  type: 'patient',
});

setTimeout(function run() {
  parentPort?.postMessage({
    value: new Patient(
      perLog(Math.round(rand2() / (Number(process.env.SPEEDUP) || 60)))
    ),
    type: 'patient',
  });
  setTimeout(
    run,
    perLog(Math.round(rand() / (Number(process.env.SPEEDUP) || 60)))
  );
}, perLog(Math.round(rand() / (Number(process.env.SPEEDUP) || 60))));
