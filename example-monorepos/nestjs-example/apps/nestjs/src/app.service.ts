import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<{ message: string }> {
    return { message: 'Hello World' };
  }
}
