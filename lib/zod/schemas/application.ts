import z from '@/lib/zod';

export const ApplicationQuerySchema = z
    .enum(['regular', 'reaplicacao'])
    .default('regular')
    .describe(
        'A aplicação da prova: "regular" (aplicação padrão, valor default) ou ' +
            '"reaplicacao" (segunda aplicação). Quando "reaplicacao", retorna ' +
            'a prova da reaplicação do mesmo ano, se disponível.',
    )
    .openapi({ example: 'reaplicacao' });