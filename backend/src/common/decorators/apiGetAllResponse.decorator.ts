import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiGetAllResponse<T>(model: Type<T>) {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        properties: {
                            count: {
                                example: 1,
                                type: 'number',
                            },
                            items: {
                                items: { $ref: getSchemaPath(model) },
                                type: 'array',
                            },
                        },
                    },
                ],
            },
        }),
    );
}
