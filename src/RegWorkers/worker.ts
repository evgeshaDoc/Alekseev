require('dotenv').config();
import { parentPort } from 'worker_threads';
import random from 'random';

const rand: Function = random.exponential(1 / 60000);
const perLog = (num: number) => {
  console.log('Регистратура' + num);
  return num;
};
const snooze = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

parentPort?.on('message', async (val) => {
  if (val === 'add') {
    parentPort?.postMessage('wait');
    console.log('snooze start');
    await snooze(
      perLog(Math.round(rand() / (Number(process.env.SPEEDUP) || 60)))
    );
    console.log('snooze end');
    parentPort?.postMessage('free');
  }
});
