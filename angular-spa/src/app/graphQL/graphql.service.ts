import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { ApolloQueryResult } from '@apollo/client/core';

interface Geography {
  GeographyID: string;
  ZipCodeBKey: string;
  County: string;
  City: string;
  State: string;
  Country: string;
  ZipCode: string;
}

interface GeographiesResponse {
  geographies: {
    items: Geography[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(
    private apollo: Apollo,
    private authService: MsalService
  ) {}

  getGeographies(): Observable<Geography[]> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        return this.apollo.watchQuery<GeographiesResponse>({
          query: gql`
            query {
              geographies(filter: { City: { eq: "Brooklyn" } }) {
                items {
                  GeographyID
                  ZipCodeBKey
                  County
                  City
                  State
                  Country
                  ZipCode
                }
              }
            }
          `,
          context: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }).valueChanges.pipe(
          map((result: ApolloQueryResult<GeographiesResponse>) => result.data.geographies.items)
        );
      })
    );
  }

  private getAccessToken(): Observable<string> {
    console.log("getAccessToken from this.authService.acquireTokenSilent(...)")
    const loginRequest = {
      scopes: ["https://analysis.windows.net/powerbi/api/Item.Execute.All","https://analysis.windows.net/powerbi/api/Datamart.ReadWrite.All"]
  };
    const access_token = from(this.authService.instance.acquireTokenSilent(loginRequest))
    .pipe(
      map(response => response.accessToken)
    );
    return access_token;
  }
}
