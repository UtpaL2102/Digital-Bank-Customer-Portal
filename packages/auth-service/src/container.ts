import "reflect-metadata";
import { container } from "tsyringe";
import { PrismaClient } from '@prisma/client';
import { prisma } from './db/prismaClient';

// Register Prisma instance
container.registerInstance('PrismaClient', prisma);

export { container };