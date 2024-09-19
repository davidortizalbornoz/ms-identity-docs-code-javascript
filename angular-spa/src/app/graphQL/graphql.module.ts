import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: 'https://api.fabric.microsoft.com/v1/workspaces/f183bf12-d919-4fee-b56e-48f3c2b03163/graphqlapis/34312ba3-e3d1-44e9-a267-e1e8cccd2231/graphql'
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
