import "reflect-metadata";
import { container } from "tsyringe";
import { PrismaClient } from '@prisma/client';
import { prisma } from './db/prismaClient.js';
import { MonitoringService } from './services/monitoring.service.js';
import { SystemConfigService } from './services/system.config.service.js';
import { TransferService } from './services/transfer.service.js';

// Register PrismaClient instance
container.register('PrismaClient', {
  useValue: prisma
});

// Register PrismaClient class token (for class-based injection)
container.register(PrismaClient, {
  useValue: prisma
});

// Register services as singleton instances
container.registerSingleton(MonitoringService);
container.registerSingleton(SystemConfigService);
container.registerSingleton('MonitoringService', MonitoringService);

// Register TransferService
container.registerSingleton(TransferService);

export { container };