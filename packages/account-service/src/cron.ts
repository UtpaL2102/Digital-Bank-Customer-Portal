import cron from 'node-cron';
import { TransferService } from './services/transfer.service.js';
import { MonitoringService } from './services/monitoring.service.js';
import { container } from './container.js';

export const setupScheduledTransfers = () => {
  const monitoringService = container.resolve('MonitoringService');
  const transferService = container.resolve(TransferService);


  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      await transferService.executeScheduledTransfers();
    } catch (error) {
      console.error('Failed to execute scheduled transfers:', error);
    }
  });
};

export const startCronJobs = () => {
  console.log('Starting cron jobs...');
  setupScheduledTransfers();
};