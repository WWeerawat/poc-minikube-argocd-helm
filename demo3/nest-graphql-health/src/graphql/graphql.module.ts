// src/graphql.module.ts
import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';

@Module({
  imports: [],
  providers: [AppResolver],
})
export class GraphqlModule {}
