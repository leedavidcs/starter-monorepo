import type { TypedDocumentNode as DocumentNode } from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: Json;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type DateTimeNullableFilter = {
  readonly gt?: InputMaybe<Scalars['DateTime']>;
  readonly gte?: InputMaybe<Scalars['DateTime']>;
  readonly lt?: InputMaybe<Scalars['DateTime']>;
  readonly lte?: InputMaybe<Scalars['DateTime']>;
};

/** Root mutation type */
export type Mutation = {
  readonly __typename: 'Mutation';
  readonly ok: Scalars['Boolean'];
  readonly viewer?: Maybe<User>;
};

export type Node = {
  readonly id: Scalars['ID'];
};

/** Root query type */
export type Query = {
  readonly __typename: 'Query';
  readonly ok: Scalars['Boolean'];
  readonly viewer?: Maybe<User>;
};

export type StringNullableFilter = {
  readonly contains?: InputMaybe<Scalars['String']>;
  readonly endsWith?: InputMaybe<Scalars['String']>;
  readonly equals?: InputMaybe<Scalars['String']>;
  readonly in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly not?: InputMaybe<StringNullableFilter>;
  readonly notIn?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly startsWith?: InputMaybe<Scalars['String']>;
};

export type User = Node & {
  readonly __typename: 'User';
  readonly email: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly image?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
};

export type OkQueryVariables = Exact<{ [key: string]: never; }>;


export type OkQuery = { readonly __typename: 'Query', readonly ok: boolean };


export const OkDocument = /*#__PURE__*/ {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ok"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]} as unknown as DocumentNode<OkQuery, OkQueryVariables>;