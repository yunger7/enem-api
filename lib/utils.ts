import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSearchParamsAsObject(searchParams: URLSearchParams) {
    return Object.fromEntries(searchParams.entries());
}
