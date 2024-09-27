import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async getAccessToken(code: string) {
    const tokenEndpoint = this.configService.get<string>('TOKEN_ENDPOINT');
    const clientId = this.configService.get<string>('CLIENT_ID');
    const clientSecret = this.configService.get<string>('CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('REDIRECT_URI');

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('grant_type', 'authorization_code');
    //params.append('scope', 'openid profile email');
    params.append('scope', 'https://analysis.windows.net/powerbi/api/.default');
    try {
      const response = await axios.post(tokenEndpoint, params);
      return response.data;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }
}
