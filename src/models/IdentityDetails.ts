import { TokenPair } from './TokenPair';

export interface IdentityDetails extends TokenPair {
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  username: string;
}