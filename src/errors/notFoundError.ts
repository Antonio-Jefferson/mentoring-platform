import { ApplicationError } from '../http/protcols';

export function notFoundError(message: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message,
  };
}
