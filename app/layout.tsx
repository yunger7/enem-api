import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

import type { Metadata, Viewport } from 'next';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const viewport: Viewport = {
    themeColor: 'black',
    colorScheme: 'dark',
};

const TITLE = 'API ENEM';
const DESCRIPTION = 'API para consulta de provas e questões do ENEM';

export const metadata: Metadata = {
    title: TITLE,
    applicationName: TITLE,
    generator: 'Next.js',
    description: DESCRIPTION,
    creator: 'yunger7',
    keywords: ['ENEM', 'API', 'Open Source', 'Provas', 'Questões'],
    authors: [{ name: 'yunger7', url: 'https://github.com/yunger7' }],
    openGraph: {
        title: TITLE,
        siteName: TITLE,
        description: DESCRIPTION,
        type: 'website',
        url: 'https://enem.dev',
        locale: 'pt_BR',
        countryName: 'Brazil',
    },
    twitter: {
        title: TITLE,
        description: DESCRIPTION,
        card: 'summary_large_image',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'bg-background min-h-screen font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <Analytics />
                <SpeedInsights />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
