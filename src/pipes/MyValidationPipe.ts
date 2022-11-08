import {ArgumentMetadata, HttpException, HttpStatus, PipeTransform, ValidationError} from "@nestjs/common";
import {createEvalAwarePartialHost} from "ts-node/dist/repl";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

export class MyValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToClass(metadata.metatype, value)
        if(typeof object !== 'object'){
            return value
        }
        const errors = await validate(object)
        if (!errors.length) {
            return value
        }
        throw new HttpException({errors:this.formatError(errors)},HttpStatus.UNPROCESSABLE_ENTITY);
    }

    formatError(errors: ValidationError[]) {
        return errors.reduce((acc, err) => {
            acc[err.property] = Object.values(err.constraints)
            return acc
        }, {})
    }

}