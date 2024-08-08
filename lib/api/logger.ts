import geoip from 'geoip-lite';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function logger(request: NextRequest) {
    if (process.env.NODE_ENV === 'development') {
        return;
    }

    try {
        const { method, url, headers } = request;

        const ip =
            headers.get('x-forwarded-for') ||
            request.ip ||
            request.headers.get('cf-connecting-ip') ||
            '0.0.0.0';
        const userAgent = headers.get('user-agent');
        const referer = headers.get('referer');
        const timestamp = new Date().toISOString();
        const geo = geoip.lookup(ip);

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
            ll: geo?.ll ? geo.ll.join(', ') : null,
        };

        await prisma.log.create({
            data: logEntry,
        });
    } catch (error) {
        console.error('Failed to save log', error);
    }
}