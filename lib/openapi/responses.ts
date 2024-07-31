import { errorSchemaFactory } from '@/lib/api/errors';
import { ZodOpenApiComponentsObject } from 'zod-openapi';

export const openApiErrorResponses: ZodOpenApiComponentsObject['responses'] = {
    '400': errorSchemaFactory(
        'bad_request',
        'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
    ),

    '404': errorSchemaFactory(
        'not_found',
        'The server cannot find the requested resource.',
    ),

    '422': errorSchemaFactory(
        'unprocessable_entity',
        'The request was well-formed but was unable to be followed due to semantic errors.',
    ),

    '429': errorSchemaFactory(
        'rate_limit_exceeded',
        `The user has sent too many requests in a given amount of time`,
    ),

    '500': errorSchemaFactory(
        'internal_server_error',
        'The server has encountered a situation it does not know how to handle.',
    ),
};
