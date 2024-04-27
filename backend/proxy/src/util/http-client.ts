import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface CustomConfig {
  encoded?: boolean;
}

@Injectable()
export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  get(url: string) {
    return this.client.get(url);
  }

  post(url: string, data: any, config: CustomConfig) {
    return this.client.post(url, data, this.buildConfig(config));
  }

  put(url: string, data: any) {
    return this.client.put(url, data);
  }

  delete(url: string) {
    return this.client.delete(url);
  }

  private buildConfig(customConfig: CustomConfig = {}): AxiosRequestConfig {
    const config: AxiosRequestConfig = {};
    if (customConfig.encoded) {
      config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }
    return config;
  }
}
