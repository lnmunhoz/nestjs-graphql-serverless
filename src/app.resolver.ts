import { Resolver, Query } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('world');
      }, 3000);
    });
  }
}

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(returns => String)
  async hello() {
    return await this.appService.getHello();
  }
}
