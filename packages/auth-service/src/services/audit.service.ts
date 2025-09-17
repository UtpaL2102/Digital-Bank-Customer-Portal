import axios from 'axios';
import { prisma } from '../db/prismaClient';

// For local development
const accountServiceUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:4002/api/v1'
    : process.env.ACCOUNT_SVC_BASE_URL || 'http://account-service:4002/api/v1';

const accountClient = axios.create({ 
    baseURL: accountServiceUrl,
    timeout: 5000, // 5 second timeout
    headers: {
        'Content-Type': 'application/json',
        'X-Service-Name': 'auth-service'
    }
});

// Helper to retry failed requests
async function retryRequest(fn: () => Promise<any>, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i))); // Exponential backoff
        }
    }
}

export async function sendAuditEvent(userId: string, action: string, details?: string) {
    const timestamp = new Date();
    try {
        // First, save locally in auth service's database
        const localAudit = await prisma.auditLog.create({ 
            data: { 
                user_id: userId, 
                action, 
                details,
                performed_at: timestamp
            } 
        });

        console.log('Created local audit log:', {
            id: localAudit.id,
            action,
            userId,
            timestamp: timestamp.toISOString()
        });

        // Then send to account service with retries
        console.log('Sending audit event to account service:', {
            url: `${accountServiceUrl}/admin/audit-events`,
            userId,
            action
        });

        const response = await retryRequest(() => 
            accountClient.post('/admin/audit-events', {
                user_id: userId,
                action,
                details,
                performed_at: timestamp.toISOString()
            })
        );

        console.log('Successfully sent audit event to account service:', {
            status: response.status,
            action,
            userId
        });

        return { local: localAudit.id, remote: response.data?.id };
    } catch (err: any) {
        // Log full error with stack trace for better debugging
        console.error('Failed to send audit event:', {
            error: {
                message: err.message,
                code: err.code,
                response: err.response?.data,
            },
            context: {
                userId,
                action,
                details,
                timestamp: timestamp.toISOString(),
                accountServiceUrl
            }
        });
        // Don't throw - we don't want audit logging to break main flows
        return { local: null, remote: null, error: err.message };
    }
}