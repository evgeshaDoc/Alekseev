import { parentPort, workerData } from 'worker_threads';
import { sleep } from 'sleep';

const snooze = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

parentPort?.on('message', async (val) => {
  if (val === 'add') {
    parentPort?.postMessage('wait');
    console.log('snooze start');
    await snooze(500);
    console.log('snooze end');
    parentPort?.postMessage('free');
  }
});
