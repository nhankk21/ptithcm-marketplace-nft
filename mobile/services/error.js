import { ResponseMessage } from '@constants/messages';

const ErrorMessage = {
  500: ResponseMessage.error.InternalServer,
  409: ResponseMessage.error.Conflict,
  401: ResponseMessage.error.UnAuthentication,
  403: ResponseMessage.error.UnAuthorization,
  Network: ResponseMessage.error.Network,
  SomethingWhenWrong: ResponseMessage.error.SomethingWentWrong,
};

export const commonErrorHandler = ({ errorCode, customeErrorMsg = () => {} }) =>
  customeErrorMsg(ErrorMessage[errorCode]) || ErrorMessage[errorCode];
