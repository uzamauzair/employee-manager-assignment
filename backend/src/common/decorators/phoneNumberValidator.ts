import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isPhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
                    return typeof value === 'string' && phoneRegExp.test(value) && value.length === 10;
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Phone number is not valid';
                },
            },
        });
    };
}
