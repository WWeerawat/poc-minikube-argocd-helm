// src/app.resolver.ts
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    setTimeout(() => {
}, 1000);
    return 'Hello, World!';
  }
}
