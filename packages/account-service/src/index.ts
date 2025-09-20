import 'reflect-metadata';
import './container.js';  // Import container first to ensure dependencies are registered
import { app } from './app.js';
import { startCronJobs } from './cron.js';

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`Account service listening on port ${port}`);
  startCronJobs();
});
