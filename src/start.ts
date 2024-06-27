import { exit } from 'process';
import server from './server';

const start = async (): Promise<void> => {
  const app = server();
};

void start();
