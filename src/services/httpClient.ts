import ky from 'ky';
import { getIdentityDetails } from './identityProvider';

export const httpClient = ky.create({
  prefixUrl: process.env.REACT_APP_API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const tokenPairDetails = getIdentityDetails();

        if (tokenPairDetails) {
          request.headers.set('Authorization', `Bearer ${tokenPairDetails.accessToken}`);
        }
      }
    ]
  }
});
