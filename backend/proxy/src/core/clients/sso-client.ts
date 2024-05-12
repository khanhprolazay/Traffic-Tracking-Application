import { Injectable } from '@nestjs/common';
import { HttpClient } from './http-client';
import { JwtService } from '@nestjs/jwt';
import { ConfidentalClient } from '../util/interfaces/oauth.interface';

@Injectable()
export class SsoClient extends ConfidentalClient {
  private server: string;

  constructor(private readonly httpClient: HttpClient) {
    super(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    this.server = process.env.SSO_SERVER;
  }

  async getAccessToken() {
    return await this.requestAccessToken();
  }

  private async requestAccessToken() {
    const response = await this.httpClient.post(
      `${this.server}/protocol/openid-connect/token`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      },
      { encoded: true },
    );
    return response.data.access_token as string;
  }
}
