import { ApplicationError } from '../http/protcols';

export function notFoundError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'No result for this search!',
  };
}
