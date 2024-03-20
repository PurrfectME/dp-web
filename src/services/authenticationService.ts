import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  LogInRequest,
  SignUpRequest, TokenPair
} from '../models';
import { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import { InitChangePasswordRequest } from '../models/InitChangePasswordRequest';
import { httpClient } from './httpClient';

export const logIn = async (request: LogInRequest): Promise<TokenPair> => {
  await new Promise(r => setTimeout(r, 2000));

  return await httpClient.post('auth/login', {
    json: request
  }).json<TokenPair>();
}

export const signUp = async (request: SignUpRequest): Promise<void> => {
  await new Promise(r => setTimeout(r, 2000));

  await httpClient.post('auth/register', {
    json: request
  });
}

export const validateLogInToken = async (token: string): Promise<TokenPair> => {
  await new Promise(r => setTimeout(r, 2000));

  return await httpClient.post('auth/confirm-registration', {
    json: {
      jwt: token
    }
  }).json<TokenPair>();
}

export const refreshToken = async (token: string): Promise<TokenPair> => {
  await new Promise(r => setTimeout(r, 2000));

  return await httpClient.post('auth/refresh-token', {
    json: {
      jwt: token
    }
  }).json<TokenPair>();
}

export const initResetPassword = async (request: InitChangePasswordRequest): Promise<void> => {
  await httpClient.post('auth/reset-password', {
    json: {
      email: request.email
    }
  });
}

export const confirmResetPassword = async (request: ResetPasswordRequest): Promise<TokenPair> => {
  return await httpClient.post('auth/confirm-reset-password', {
    json: request
  }).json<TokenPair>();
}

export const changePassword = async (request: ChangePasswordRequest): Promise<void> => {
  await httpClient.post('auth/change-password', {
    json: request
  });
}

export const changeEmail = async (request: ChangeEmailRequest): Promise<void> => {
  await httpClient.post('auth/change-email', {
    json: request
  });
}

export const confirmEmailChange = async (jwt: string): Promise<void> => {
  await httpClient.post('auth/confirm-change-email', {
    json: {
      jwt
    }
  });
}