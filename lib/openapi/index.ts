import { createDocument } from 'zod-openapi';
import { examsPaths } from './exams';
import { questionsPaths } from './questions';

export const document = createDocument({
    openapi: '3.0.3',
    info: {
        title: 'ENEM API',
        description: 'API publica para consulta de provas e questões do ENEM',
        version: '1.0.0',
        contact: {
            name: 'yunger',
            url: 'https://github.com/yunger7',
        },
    },
    servers: [
        {
            url: 'https://api.enem.dev/v1',
            description: 'API de produção',
        },
    ],
    paths: {
        ...examsPaths,
        ...questionsPaths,
    },
});
