import * as Operations from './operations.gen';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export function useOkQuery(options?: Omit<Urql.UseQueryArgs<Operations.OkQueryVariables>, 'query'>) {
  return Urql.useQuery<Operations.OkQuery>({ query: Operations.OkDocument, ...options });
};