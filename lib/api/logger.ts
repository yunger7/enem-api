import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function logger(request: NextRequest) {
    if (process.env.NODE_ENV === 'development') {
        return;
    }

    const prisma = new PrismaClient();

    try {
        const { method, url, headers, geo } = request;

        const ip =
            request.ip ||
            headers.get('x-forwarded-for') ||
            request.headers.get('cf-connecting-ip') ||
            '0.0.0.0';
        const userAgent = headers.get('user-agent');
        const referer = headers.get('referer');
        const timestamp = new Date().toISOString();

        const logEntry = {
            ip,
            url,
            method,
            userAgent,
            referer,
            timestamp,
            country: geo?.country || null,
            region: geo?.region || null,
            city: geo?.city || null,
            ll:
                geo?.latitude && geo?.longitude
                    ? `${(geo.latitude, geo.longitude)}`
                    : null,
        };

        await prisma.log.create({
            data: logEntry,
        });
    } catch (error) {
        console.error('Failed to save log', error);
    }
}
