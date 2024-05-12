export abstract class ConfidentalClient {
  protected readonly clientId: string;
  protected readonly clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  abstract getAccessToken(): Promise<string>;
}