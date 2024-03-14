import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsEmailExistOrPasswordMatchConstraint } from './email-exist-validation';

import { Type } from '@nestjs/common';
import { MatchConstraint } from './passwords';

export function customValidator(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    let validateClass: Type;

    if (
      (propertyName == 'email' && property == 'password') ||
      propertyName == 'email'
    ) {
      validateClass = IsEmailExistOrPasswordMatchConstraint;
    } else if (property == 'password' && propertyName == 'confirmPassword') {
      validateClass = MatchConstraint;
    }

    if (validateClass == undefined) {
      console.log({
        validateClass,
        file: object.constructor,
        propertyName: propertyName,
      });
    }

    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: validateClass,
    });
  };
}
