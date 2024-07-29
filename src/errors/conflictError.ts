import { ApplicationError } from '../http/protcols';

export function conflictError(message: string): ApplicationError {
  return {
    name: 'ConflictError',
    message,
  };
}
