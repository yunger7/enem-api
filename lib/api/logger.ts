import { NextRequest } from 'next/server';
import { ipAddress, geolocation } from '@vercel/functions';
import { PrismaClient } from '@prisma/client';

export async function logger(request: NextRequest) {
    if (process.env.NODE_ENV === 'development') {
        return;
    }

    const prisma = new PrismaClient();

    try {
        const vercelGeo = geolocation(request);

        const { method, url, headers, geo } = request;

        const ip =
            ipAddress(request) ||
            headers.get('x-forwarded-for') ||
            request.headers.get('cf-connecting-ip') ||
            request.ip;
        const userAgent = headers.get('user-agent');
        const referer = headers.get('referer');

        const country = vercelGeo?.country || geo?.country;
        const region = vercelGeo?.region || geo?.region;
        const city = vercelGeo?.city || geo?.city;
        const latitude = vercelGeo?.latitude || geo?.latitude;
        const longitude = vercelGeo?.longitude || geo?.longitude;

        const timestamp = new Date().toISOString();

        const logEntry = {
            url,
            method,
            ip: ip || null,
            userAgent,
            referer,
            country: country ? decodeURIComponent(country) : null,
            region: region ? decodeURIComponent(region) : null,
            city: city ? decodeURIComponent(city) : null,
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null,
            timestamp,
        };

        await prisma.log.create({
            data: logEntry,
        });
    } catch (error) {
        console.error('Failed to save log', error);
    }
}
