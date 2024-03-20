import { IdentityDetails, TokenPair, TokenPayload } from '../models';
import jwt from 'jwt-decode';
import { Nullable } from '../utils/Nullable';

let cachedTokenPairDetails: Nullable<IdentityDetails> = null;

export const getIdentityDetails = (): Nullable<IdentityDetails> => {
  if (cachedTokenPairDetails !== null) {
    return cachedTokenPairDetails;
  }

  const item = localStorage.getItem('tokenPairDetails');

  if (!item) {
    return null;
  }

  const tokenPairDetails: IdentityDetails = JSON.parse(item!) as IdentityDetails
  cachedTokenPairDetails = tokenPairDetails;

  return tokenPairDetails;
}

export const setTokenPairDetails = (tokenPair: TokenPair): void => {
  const accessTokenPayload: TokenPayload = jwt(tokenPair.accessToken!);
  const refreshTokenPayload: TokenPayload = jwt(tokenPair.refreshToken!);

  const tokenPairDetails: IdentityDetails = {
    accessToken: tokenPair.accessToken,
    refreshToken: tokenPair.refreshToken,
    accessTokenExpiresIn: accessTokenPayload.exp,
    refreshTokenExpiresIn: refreshTokenPayload.exp,
    username: accessTokenPayload.username
  }

  localStorage.setItem('tokenPairDetails', JSON.stringify(tokenPairDetails));
  cachedTokenPairDetails = tokenPairDetails;
}

export const clearIdentityDetails = (): void => {
  localStorage.removeItem('tokenPairDetails');
  cachedTokenPairDetails = null;
}