import { asyncHandler } from './async-handler.util';
import { handleError } from './error-handler.util';
import { authUtils } from './auth.util';

export const utils = {
  asyncHandler: asyncHandler,
  handleError: handleError,
  authUtils: authUtils,
};
