import z from '@/lib/zod';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { generateErrorMessage } from 'zod-error';
import { ZodOpenApiResponseObject } from 'zod-openapi';

export const ErrorCode = z.enum([
    'bad_request',
    'not_found',
    'unprocessable_entity',
    'rate_limit_exceeded',
    'internal_server_error',
]);

const errorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
    bad_request: 400,
    not_found: 404,
    unprocessable_entity: 422,
    rate_limit_exceeded: 429,
    internal_server_error: 500,
};

const speakeasyErrorOverrides: Record<z.infer<typeof ErrorCode>, string> = {
    bad_request: 'BadRequest',
    not_found: 'NotFound',
    unprocessable_entity: 'UnprocessableEntity',
    rate_limit_exceeded: 'RateLimitExceeded',
    internal_server_error: 'InternalServerError',
};

const ErrorSchema = z.object({
    error: z.object({
        code: ErrorCode.openapi({
            description: 'A short code indicating the error code returned.',
            example: 'not_found',
        }),
        message: z.string().openapi({
            description: 'A human readable error message.',
            example: 'The requested resource was not found.',
        }),
        docUrl: z.string().optional().openapi({
            description:
                'A URL to more information about the error code reported.',
            example: 'https://enem.dev/docs',
        }),
    }),
});

export type ErrorResponse = z.infer<typeof ErrorSchema>;
export type ErrorCodes = z.infer<typeof ErrorCode>;

export class EnemApiError extends Error {
    public readonly code: z.infer<typeof ErrorCode>;
    public readonly docUrl?: string;
    public readonly headers?: Record<string, string>;

    constructor({
        code,
        message,
        docUrl,
        headers,
    }: {
        code: z.infer<typeof ErrorCode>;
        message: string;
        docUrl?: string;
        headers?: Record<string, string>;
    }) {
        super(message);
        this.code = code;
        this.headers = headers;
        this.docUrl = docUrl ?? `${docErrorUrl}#${code.replace('_', '-')}`;
    }
}

const docErrorUrl = 'https://enem.dev/docs/errors';

export function fromZodError(error: ZodError): ErrorResponse {
    return {
        error: {
            code: 'unprocessable_entity',
            message: generateErrorMessage(error.issues, {
                maxErrors: 1,
                delimiter: {
                    component: ': ',
                },
                path: {
                    enabled: true,
                    type: 'objectNotation',
                    label: '',
                },
                code: {
                    enabled: true,
                    label: '',
                },
                message: {
                    enabled: true,
                    label: '',
                },
            }),
            docUrl: `${docErrorUrl}#unprocessable-entity`,
        },
    };
}

export function handleApiError(
    error: any,
): ErrorResponse & { status: number; headers?: Record<string, string> } {
    console.error('API error occurred', error.message);

    // Zod errors
    if (error instanceof ZodError) {
        return {
            ...fromZodError(error),
            status: errorCodeToHttpStatus.unprocessable_entity,
        };
    }

    // EnemApiError errors
    if (error instanceof EnemApiError) {
        return {
            error: {
                code: error.code,
                message: error.message,
                docUrl: error.docUrl,
            },
            headers: error.headers,
            status: errorCodeToHttpStatus[error.code],
        };
    }

    // Fallback
    // Unhandled errors are not user-facing, so we don't expose the actual error
    return {
        error: {
            code: 'internal_server_error',
            message: 'An internal server error occurred.',
            docUrl: `${docErrorUrl}#internal-server-error`,
        },
        status: 500,
    };
}

export function handleAndReturnErrorResponse(
    err: unknown,
    headers?: Record<string, string>,
) {
    const { error, status, headers: errorHeaders } = handleApiError(err);

    return NextResponse.json<ErrorResponse>(
        { error },
        {
            headers: errorHeaders ?? headers,
            status,
        },
    );
}

export const errorSchemaFactory = (
    code: z.infer<typeof ErrorCode>,
    description: string,
): ZodOpenApiResponseObject => {
    return {
        description,
        content: {
            'application/json': {
                schema: {
                    'x-speakeasy-name-override': speakeasyErrorOverrides[code],
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'string',
                                    enum: [code],
                                    description:
                                        'A short code indicating the error code returned.',
                                    example: code,
                                },
                                message: {
                                    type: 'string',
                                    description:
                                        'A human readable explanation of what went wrong.',
                                    example: description,
                                },
                                docUrl: {
                                    type: 'string',
                                    description:
                                        'A link to our documentation with more details about this error code',
                                    example: `${docErrorUrl}#${code.replace('_', '-')}`,
                                },
                            },
                            required: ['code', 'message'],
                        },
                    },
                    required: ['error'],
                },
            },
        },
    };
};
