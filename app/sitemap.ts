import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function sitemap(): MetadataRoute.Sitemap {
    const headersList = headers();
    let domain = headersList.get('host') as string;

    return [
        {
            url: `https://${domain}/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];
}
