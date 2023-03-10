import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { User } from '../entities/user.entity';

export function UniqueInDatabase(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'UniqueInDatabase',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: string | number, args: ValidationArguments) {
          const user = await User.findOne({
            where: { [args.property]: value },
          });
          return !user;
        },
      },
    });
  };
}
