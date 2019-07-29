import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(returns => String)
  async hello() {
    return 'world';
  }
}
