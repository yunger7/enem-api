import { NextRequest } from 'next/server';
import { EnemApiError } from './errors';

class RateLimiter {
    windowSize: number;
    maxRequests: number;
    idToWindows: Map<string, Array<number>>;

    constructor(windowSize?: number, maxRequests?: number) {
        this.windowSize = windowSize || 10000;
        this.maxRequests = maxRequests || 10;
        this.idToWindows = new Map<string, Array<number>>();
    }

    check(request: NextRequest) {
        const ip =
            request.ip ?? request.headers.get('X-Forwarded-For') ?? 'unknown';
        const now = Date.now();

        let queue = this.idToWindows.get(ip);

        if (!queue) {
            queue = [];
            this.idToWindows.set(ip, queue);
        }

        while (queue.length > 0 && now - queue[0] > this.windowSize) {
            queue.shift();
        }

        if (queue.length >= this.maxRequests) {
            const resetTime = queue[0] + this.windowSize - now;

            throw new EnemApiError({
                code: 'rate_limit_exceeded',
                message: `Rate limit exceeded. Try again in ${resetTime}ms.`,
                headers: {
                    'X-RateLimit-Limit': String(this.maxRequests),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': String(resetTime),
                    'Retry-After': String(resetTime),
                },
            });
        }

        queue.push(now);

        const rateLimitHeaders = {
            'X-RateLimit-Limit': String(this.maxRequests),
            'X-RateLimit-Remaining': String(this.maxRequests - queue.length),
            'X-RateLimit-Reset': String(this.windowSize),
        };

        return {
            rateLimitHeaders,
        };
    }
}

export { RateLimiter };
