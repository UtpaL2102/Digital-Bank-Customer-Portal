
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model UserMfa
 * 
 */
export type UserMfa = $Result.DefaultSelection<Prisma.$UserMfaPayload>
/**
 * Model UserMfaBackupCode
 * 
 */
export type UserMfaBackupCode = $Result.DefaultSelection<Prisma.$UserMfaBackupCodePayload>
/**
 * Model KycDetails
 * 
 */
export type KycDetails = $Result.DefaultSelection<Prisma.$KycDetailsPayload>
/**
 * Model KycDocument
 * 
 */
export type KycDocument = $Result.DefaultSelection<Prisma.$KycDocumentPayload>
/**
 * Model NotificationPrefs
 * 
 */
export type NotificationPrefs = $Result.DefaultSelection<Prisma.$NotificationPrefsPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model AdminInvite
 * 
 */
export type AdminInvite = $Result.DefaultSelection<Prisma.$AdminInvitePayload>
/**
 * Model AdminApiKey
 * 
 */
export type AdminApiKey = $Result.DefaultSelection<Prisma.$AdminApiKeyPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs>;

  /**
   * `prisma.userMfa`: Exposes CRUD operations for the **UserMfa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserMfas
    * const userMfas = await prisma.userMfa.findMany()
    * ```
    */
  get userMfa(): Prisma.UserMfaDelegate<ExtArgs>;

  /**
   * `prisma.userMfaBackupCode`: Exposes CRUD operations for the **UserMfaBackupCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserMfaBackupCodes
    * const userMfaBackupCodes = await prisma.userMfaBackupCode.findMany()
    * ```
    */
  get userMfaBackupCode(): Prisma.UserMfaBackupCodeDelegate<ExtArgs>;

  /**
   * `prisma.kycDetails`: Exposes CRUD operations for the **KycDetails** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KycDetails
    * const kycDetails = await prisma.kycDetails.findMany()
    * ```
    */
  get kycDetails(): Prisma.KycDetailsDelegate<ExtArgs>;

  /**
   * `prisma.kycDocument`: Exposes CRUD operations for the **KycDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KycDocuments
    * const kycDocuments = await prisma.kycDocument.findMany()
    * ```
    */
  get kycDocument(): Prisma.KycDocumentDelegate<ExtArgs>;

  /**
   * `prisma.notificationPrefs`: Exposes CRUD operations for the **NotificationPrefs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationPrefs
    * const notificationPrefs = await prisma.notificationPrefs.findMany()
    * ```
    */
  get notificationPrefs(): Prisma.NotificationPrefsDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.adminInvite`: Exposes CRUD operations for the **AdminInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminInvites
    * const adminInvites = await prisma.adminInvite.findMany()
    * ```
    */
  get adminInvite(): Prisma.AdminInviteDelegate<ExtArgs>;

  /**
   * `prisma.adminApiKey`: Exposes CRUD operations for the **AdminApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminApiKeys
    * const adminApiKeys = await prisma.adminApiKey.findMany()
    * ```
    */
  get adminApiKey(): Prisma.AdminApiKeyDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    UserMfa: 'UserMfa',
    UserMfaBackupCode: 'UserMfaBackupCode',
    KycDetails: 'KycDetails',
    KycDocument: 'KycDocument',
    NotificationPrefs: 'NotificationPrefs',
    AuditLog: 'AuditLog',
    Notification: 'Notification',
    AdminInvite: 'AdminInvite',
    AdminApiKey: 'AdminApiKey'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "refreshToken" | "userMfa" | "userMfaBackupCode" | "kycDetails" | "kycDocument" | "notificationPrefs" | "auditLog" | "notification" | "adminInvite" | "adminApiKey"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      UserMfa: {
        payload: Prisma.$UserMfaPayload<ExtArgs>
        fields: Prisma.UserMfaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserMfaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserMfaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>
          }
          findFirst: {
            args: Prisma.UserMfaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserMfaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>
          }
          findMany: {
            args: Prisma.UserMfaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>[]
          }
          create: {
            args: Prisma.UserMfaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>
          }
          createMany: {
            args: Prisma.UserMfaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserMfaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>[]
          }
          delete: {
            args: Prisma.UserMfaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>
          }
          update: {
            args: Prisma.UserMfaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>
          }
          deleteMany: {
            args: Prisma.UserMfaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserMfaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserMfaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaPayload>
          }
          aggregate: {
            args: Prisma.UserMfaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserMfa>
          }
          groupBy: {
            args: Prisma.UserMfaGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserMfaGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserMfaCountArgs<ExtArgs>
            result: $Utils.Optional<UserMfaCountAggregateOutputType> | number
          }
        }
      }
      UserMfaBackupCode: {
        payload: Prisma.$UserMfaBackupCodePayload<ExtArgs>
        fields: Prisma.UserMfaBackupCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserMfaBackupCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserMfaBackupCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>
          }
          findFirst: {
            args: Prisma.UserMfaBackupCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserMfaBackupCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>
          }
          findMany: {
            args: Prisma.UserMfaBackupCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>[]
          }
          create: {
            args: Prisma.UserMfaBackupCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>
          }
          createMany: {
            args: Prisma.UserMfaBackupCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserMfaBackupCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>[]
          }
          delete: {
            args: Prisma.UserMfaBackupCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>
          }
          update: {
            args: Prisma.UserMfaBackupCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>
          }
          deleteMany: {
            args: Prisma.UserMfaBackupCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserMfaBackupCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserMfaBackupCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMfaBackupCodePayload>
          }
          aggregate: {
            args: Prisma.UserMfaBackupCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserMfaBackupCode>
          }
          groupBy: {
            args: Prisma.UserMfaBackupCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserMfaBackupCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserMfaBackupCodeCountArgs<ExtArgs>
            result: $Utils.Optional<UserMfaBackupCodeCountAggregateOutputType> | number
          }
        }
      }
      KycDetails: {
        payload: Prisma.$KycDetailsPayload<ExtArgs>
        fields: Prisma.KycDetailsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KycDetailsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KycDetailsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>
          }
          findFirst: {
            args: Prisma.KycDetailsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KycDetailsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>
          }
          findMany: {
            args: Prisma.KycDetailsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>[]
          }
          create: {
            args: Prisma.KycDetailsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>
          }
          createMany: {
            args: Prisma.KycDetailsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KycDetailsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>[]
          }
          delete: {
            args: Prisma.KycDetailsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>
          }
          update: {
            args: Prisma.KycDetailsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>
          }
          deleteMany: {
            args: Prisma.KycDetailsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KycDetailsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KycDetailsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDetailsPayload>
          }
          aggregate: {
            args: Prisma.KycDetailsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKycDetails>
          }
          groupBy: {
            args: Prisma.KycDetailsGroupByArgs<ExtArgs>
            result: $Utils.Optional<KycDetailsGroupByOutputType>[]
          }
          count: {
            args: Prisma.KycDetailsCountArgs<ExtArgs>
            result: $Utils.Optional<KycDetailsCountAggregateOutputType> | number
          }
        }
      }
      KycDocument: {
        payload: Prisma.$KycDocumentPayload<ExtArgs>
        fields: Prisma.KycDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KycDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KycDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>
          }
          findFirst: {
            args: Prisma.KycDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KycDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>
          }
          findMany: {
            args: Prisma.KycDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>[]
          }
          create: {
            args: Prisma.KycDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>
          }
          createMany: {
            args: Prisma.KycDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KycDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>[]
          }
          delete: {
            args: Prisma.KycDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>
          }
          update: {
            args: Prisma.KycDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>
          }
          deleteMany: {
            args: Prisma.KycDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KycDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KycDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KycDocumentPayload>
          }
          aggregate: {
            args: Prisma.KycDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKycDocument>
          }
          groupBy: {
            args: Prisma.KycDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<KycDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.KycDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<KycDocumentCountAggregateOutputType> | number
          }
        }
      }
      NotificationPrefs: {
        payload: Prisma.$NotificationPrefsPayload<ExtArgs>
        fields: Prisma.NotificationPrefsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationPrefsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationPrefsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>
          }
          findFirst: {
            args: Prisma.NotificationPrefsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationPrefsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>
          }
          findMany: {
            args: Prisma.NotificationPrefsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>[]
          }
          create: {
            args: Prisma.NotificationPrefsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>
          }
          createMany: {
            args: Prisma.NotificationPrefsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationPrefsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>[]
          }
          delete: {
            args: Prisma.NotificationPrefsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>
          }
          update: {
            args: Prisma.NotificationPrefsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>
          }
          deleteMany: {
            args: Prisma.NotificationPrefsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationPrefsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationPrefsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPrefsPayload>
          }
          aggregate: {
            args: Prisma.NotificationPrefsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationPrefs>
          }
          groupBy: {
            args: Prisma.NotificationPrefsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationPrefsGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationPrefsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationPrefsCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      AdminInvite: {
        payload: Prisma.$AdminInvitePayload<ExtArgs>
        fields: Prisma.AdminInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>
          }
          findFirst: {
            args: Prisma.AdminInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>
          }
          findMany: {
            args: Prisma.AdminInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>[]
          }
          create: {
            args: Prisma.AdminInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>
          }
          createMany: {
            args: Prisma.AdminInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>[]
          }
          delete: {
            args: Prisma.AdminInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>
          }
          update: {
            args: Prisma.AdminInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>
          }
          deleteMany: {
            args: Prisma.AdminInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminInvitePayload>
          }
          aggregate: {
            args: Prisma.AdminInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminInvite>
          }
          groupBy: {
            args: Prisma.AdminInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminInviteCountArgs<ExtArgs>
            result: $Utils.Optional<AdminInviteCountAggregateOutputType> | number
          }
        }
      }
      AdminApiKey: {
        payload: Prisma.$AdminApiKeyPayload<ExtArgs>
        fields: Prisma.AdminApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>
          }
          findFirst: {
            args: Prisma.AdminApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>
          }
          findMany: {
            args: Prisma.AdminApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>[]
          }
          create: {
            args: Prisma.AdminApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>
          }
          createMany: {
            args: Prisma.AdminApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>[]
          }
          delete: {
            args: Prisma.AdminApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>
          }
          update: {
            args: Prisma.AdminApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.AdminApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminApiKeyPayload>
          }
          aggregate: {
            args: Prisma.AdminApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminApiKey>
          }
          groupBy: {
            args: Prisma.AdminApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<AdminApiKeyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number
    backupCodes: number
    kycDocuments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    backupCodes?: boolean | UserCountOutputTypeCountBackupCodesArgs
    kycDocuments?: boolean | UserCountOutputTypeCountKycDocumentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBackupCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserMfaBackupCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountKycDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KycDocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone_number: string | null
    password_hash: string | null
    role: string | null
    status: string | null
    refresh_token_hash: string | null
    refresh_token_expires: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone_number: string | null
    password_hash: string | null
    role: string | null
    status: string | null
    refresh_token_hash: string | null
    refresh_token_expires: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone_number: number
    password_hash: number
    role: number
    status: number
    refresh_token_hash: number
    refresh_token_expires: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone_number?: true
    password_hash?: true
    role?: true
    status?: true
    refresh_token_hash?: true
    refresh_token_expires?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone_number?: true
    password_hash?: true
    role?: true
    status?: true
    refresh_token_hash?: true
    refresh_token_expires?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone_number?: true
    password_hash?: true
    role?: true
    status?: true
    refresh_token_hash?: true
    refresh_token_expires?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    phone_number: string | null
    password_hash: string
    role: string
    status: string
    refresh_token_hash: string | null
    refresh_token_expires: Date | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone_number?: boolean
    password_hash?: boolean
    role?: boolean
    status?: boolean
    refresh_token_hash?: boolean
    refresh_token_expires?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    mfa?: boolean | User$mfaArgs<ExtArgs>
    backupCodes?: boolean | User$backupCodesArgs<ExtArgs>
    kyc?: boolean | User$kycArgs<ExtArgs>
    kycDocuments?: boolean | User$kycDocumentsArgs<ExtArgs>
    notificationPrefs?: boolean | User$notificationPrefsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone_number?: boolean
    password_hash?: boolean
    role?: boolean
    status?: boolean
    refresh_token_hash?: boolean
    refresh_token_expires?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone_number?: boolean
    password_hash?: boolean
    role?: boolean
    status?: boolean
    refresh_token_hash?: boolean
    refresh_token_expires?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    mfa?: boolean | User$mfaArgs<ExtArgs>
    backupCodes?: boolean | User$backupCodesArgs<ExtArgs>
    kyc?: boolean | User$kycArgs<ExtArgs>
    kycDocuments?: boolean | User$kycDocumentsArgs<ExtArgs>
    notificationPrefs?: boolean | User$notificationPrefsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      mfa: Prisma.$UserMfaPayload<ExtArgs> | null
      backupCodes: Prisma.$UserMfaBackupCodePayload<ExtArgs>[]
      kyc: Prisma.$KycDetailsPayload<ExtArgs> | null
      kycDocuments: Prisma.$KycDocumentPayload<ExtArgs>[]
      notificationPrefs: Prisma.$NotificationPrefsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone_number: string | null
      password_hash: string
      role: string
      status: string
      refresh_token_hash: string | null
      refresh_token_expires: Date | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany"> | Null>
    mfa<T extends User$mfaArgs<ExtArgs> = {}>(args?: Subset<T, User$mfaArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    backupCodes<T extends User$backupCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$backupCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "findMany"> | Null>
    kyc<T extends User$kycArgs<ExtArgs> = {}>(args?: Subset<T, User$kycArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    kycDocuments<T extends User$kycDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, User$kycDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findMany"> | Null>
    notificationPrefs<T extends User$notificationPrefsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationPrefsArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly refresh_token_hash: FieldRef<"User", 'String'>
    readonly refresh_token_expires: FieldRef<"User", 'DateTime'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly deleted_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.mfa
   */
  export type User$mfaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    where?: UserMfaWhereInput
  }

  /**
   * User.backupCodes
   */
  export type User$backupCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    where?: UserMfaBackupCodeWhereInput
    orderBy?: UserMfaBackupCodeOrderByWithRelationInput | UserMfaBackupCodeOrderByWithRelationInput[]
    cursor?: UserMfaBackupCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserMfaBackupCodeScalarFieldEnum | UserMfaBackupCodeScalarFieldEnum[]
  }

  /**
   * User.kyc
   */
  export type User$kycArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    where?: KycDetailsWhereInput
  }

  /**
   * User.kycDocuments
   */
  export type User$kycDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    where?: KycDocumentWhereInput
    orderBy?: KycDocumentOrderByWithRelationInput | KycDocumentOrderByWithRelationInput[]
    cursor?: KycDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KycDocumentScalarFieldEnum | KycDocumentScalarFieldEnum[]
  }

  /**
   * User.notificationPrefs
   */
  export type User$notificationPrefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    where?: NotificationPrefsWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    user_agent: string | null
    ip: string | null
    created_at: Date | null
    expires_at: Date | null
    revoked_at: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    user_agent: string | null
    ip: string | null
    created_at: Date | null
    expires_at: Date | null
    revoked_at: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    user_id: number
    token_hash: number
    user_agent: number
    ip: number
    created_at: number
    expires_at: number
    revoked_at: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    user_agent?: true
    ip?: true
    created_at?: true
    expires_at?: true
    revoked_at?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    user_agent?: true
    ip?: true
    created_at?: true
    expires_at?: true
    revoked_at?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    user_agent?: true
    ip?: true
    created_at?: true
    expires_at?: true
    revoked_at?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    user_id: string
    token_hash: string
    user_agent: string | null
    ip: string | null
    created_at: Date
    expires_at: Date
    revoked_at: Date | null
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    user_agent?: boolean
    ip?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked_at?: boolean
  }

  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token_hash: string
      user_agent: string | null
      ip: string | null
      created_at: Date
      expires_at: Date
      revoked_at: Date | null
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */ 
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly user_id: FieldRef<"RefreshToken", 'String'>
    readonly token_hash: FieldRef<"RefreshToken", 'String'>
    readonly user_agent: FieldRef<"RefreshToken", 'String'>
    readonly ip: FieldRef<"RefreshToken", 'String'>
    readonly created_at: FieldRef<"RefreshToken", 'DateTime'>
    readonly expires_at: FieldRef<"RefreshToken", 'DateTime'>
    readonly revoked_at: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model UserMfa
   */

  export type AggregateUserMfa = {
    _count: UserMfaCountAggregateOutputType | null
    _min: UserMfaMinAggregateOutputType | null
    _max: UserMfaMaxAggregateOutputType | null
  }

  export type UserMfaMinAggregateOutputType = {
    user_id: string | null
    type: string | null
    secret_encrypted: string | null
    enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMfaMaxAggregateOutputType = {
    user_id: string | null
    type: string | null
    secret_encrypted: string | null
    enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMfaCountAggregateOutputType = {
    user_id: number
    type: number
    secret_encrypted: number
    enabled: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMfaMinAggregateInputType = {
    user_id?: true
    type?: true
    secret_encrypted?: true
    enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMfaMaxAggregateInputType = {
    user_id?: true
    type?: true
    secret_encrypted?: true
    enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMfaCountAggregateInputType = {
    user_id?: true
    type?: true
    secret_encrypted?: true
    enabled?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserMfaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMfa to aggregate.
     */
    where?: UserMfaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfas to fetch.
     */
    orderBy?: UserMfaOrderByWithRelationInput | UserMfaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserMfaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserMfas
    **/
    _count?: true | UserMfaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMfaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMfaMaxAggregateInputType
  }

  export type GetUserMfaAggregateType<T extends UserMfaAggregateArgs> = {
        [P in keyof T & keyof AggregateUserMfa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserMfa[P]>
      : GetScalarType<T[P], AggregateUserMfa[P]>
  }




  export type UserMfaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserMfaWhereInput
    orderBy?: UserMfaOrderByWithAggregationInput | UserMfaOrderByWithAggregationInput[]
    by: UserMfaScalarFieldEnum[] | UserMfaScalarFieldEnum
    having?: UserMfaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserMfaCountAggregateInputType | true
    _min?: UserMfaMinAggregateInputType
    _max?: UserMfaMaxAggregateInputType
  }

  export type UserMfaGroupByOutputType = {
    user_id: string
    type: string
    secret_encrypted: string
    enabled: boolean
    created_at: Date
    updated_at: Date
    _count: UserMfaCountAggregateOutputType | null
    _min: UserMfaMinAggregateOutputType | null
    _max: UserMfaMaxAggregateOutputType | null
  }

  type GetUserMfaGroupByPayload<T extends UserMfaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserMfaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserMfaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserMfaGroupByOutputType[P]>
            : GetScalarType<T[P], UserMfaGroupByOutputType[P]>
        }
      >
    >


  export type UserMfaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    type?: boolean
    secret_encrypted?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMfa"]>

  export type UserMfaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    type?: boolean
    secret_encrypted?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMfa"]>

  export type UserMfaSelectScalar = {
    user_id?: boolean
    type?: boolean
    secret_encrypted?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserMfaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserMfaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserMfaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserMfa"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      type: string
      secret_encrypted: string
      enabled: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["userMfa"]>
    composites: {}
  }

  type UserMfaGetPayload<S extends boolean | null | undefined | UserMfaDefaultArgs> = $Result.GetResult<Prisma.$UserMfaPayload, S>

  type UserMfaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserMfaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserMfaCountAggregateInputType | true
    }

  export interface UserMfaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserMfa'], meta: { name: 'UserMfa' } }
    /**
     * Find zero or one UserMfa that matches the filter.
     * @param {UserMfaFindUniqueArgs} args - Arguments to find a UserMfa
     * @example
     * // Get one UserMfa
     * const userMfa = await prisma.userMfa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserMfaFindUniqueArgs>(args: SelectSubset<T, UserMfaFindUniqueArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserMfa that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserMfaFindUniqueOrThrowArgs} args - Arguments to find a UserMfa
     * @example
     * // Get one UserMfa
     * const userMfa = await prisma.userMfa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserMfaFindUniqueOrThrowArgs>(args: SelectSubset<T, UserMfaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserMfa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaFindFirstArgs} args - Arguments to find a UserMfa
     * @example
     * // Get one UserMfa
     * const userMfa = await prisma.userMfa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserMfaFindFirstArgs>(args?: SelectSubset<T, UserMfaFindFirstArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserMfa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaFindFirstOrThrowArgs} args - Arguments to find a UserMfa
     * @example
     * // Get one UserMfa
     * const userMfa = await prisma.userMfa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserMfaFindFirstOrThrowArgs>(args?: SelectSubset<T, UserMfaFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserMfas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserMfas
     * const userMfas = await prisma.userMfa.findMany()
     * 
     * // Get first 10 UserMfas
     * const userMfas = await prisma.userMfa.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userMfaWithUser_idOnly = await prisma.userMfa.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserMfaFindManyArgs>(args?: SelectSubset<T, UserMfaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserMfa.
     * @param {UserMfaCreateArgs} args - Arguments to create a UserMfa.
     * @example
     * // Create one UserMfa
     * const UserMfa = await prisma.userMfa.create({
     *   data: {
     *     // ... data to create a UserMfa
     *   }
     * })
     * 
     */
    create<T extends UserMfaCreateArgs>(args: SelectSubset<T, UserMfaCreateArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserMfas.
     * @param {UserMfaCreateManyArgs} args - Arguments to create many UserMfas.
     * @example
     * // Create many UserMfas
     * const userMfa = await prisma.userMfa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserMfaCreateManyArgs>(args?: SelectSubset<T, UserMfaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserMfas and returns the data saved in the database.
     * @param {UserMfaCreateManyAndReturnArgs} args - Arguments to create many UserMfas.
     * @example
     * // Create many UserMfas
     * const userMfa = await prisma.userMfa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserMfas and only return the `user_id`
     * const userMfaWithUser_idOnly = await prisma.userMfa.createManyAndReturn({ 
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserMfaCreateManyAndReturnArgs>(args?: SelectSubset<T, UserMfaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserMfa.
     * @param {UserMfaDeleteArgs} args - Arguments to delete one UserMfa.
     * @example
     * // Delete one UserMfa
     * const UserMfa = await prisma.userMfa.delete({
     *   where: {
     *     // ... filter to delete one UserMfa
     *   }
     * })
     * 
     */
    delete<T extends UserMfaDeleteArgs>(args: SelectSubset<T, UserMfaDeleteArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserMfa.
     * @param {UserMfaUpdateArgs} args - Arguments to update one UserMfa.
     * @example
     * // Update one UserMfa
     * const userMfa = await prisma.userMfa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserMfaUpdateArgs>(args: SelectSubset<T, UserMfaUpdateArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserMfas.
     * @param {UserMfaDeleteManyArgs} args - Arguments to filter UserMfas to delete.
     * @example
     * // Delete a few UserMfas
     * const { count } = await prisma.userMfa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserMfaDeleteManyArgs>(args?: SelectSubset<T, UserMfaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserMfas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserMfas
     * const userMfa = await prisma.userMfa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserMfaUpdateManyArgs>(args: SelectSubset<T, UserMfaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserMfa.
     * @param {UserMfaUpsertArgs} args - Arguments to update or create a UserMfa.
     * @example
     * // Update or create a UserMfa
     * const userMfa = await prisma.userMfa.upsert({
     *   create: {
     *     // ... data to create a UserMfa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserMfa we want to update
     *   }
     * })
     */
    upsert<T extends UserMfaUpsertArgs>(args: SelectSubset<T, UserMfaUpsertArgs<ExtArgs>>): Prisma__UserMfaClient<$Result.GetResult<Prisma.$UserMfaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserMfas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaCountArgs} args - Arguments to filter UserMfas to count.
     * @example
     * // Count the number of UserMfas
     * const count = await prisma.userMfa.count({
     *   where: {
     *     // ... the filter for the UserMfas we want to count
     *   }
     * })
    **/
    count<T extends UserMfaCountArgs>(
      args?: Subset<T, UserMfaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserMfaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserMfa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserMfaAggregateArgs>(args: Subset<T, UserMfaAggregateArgs>): Prisma.PrismaPromise<GetUserMfaAggregateType<T>>

    /**
     * Group by UserMfa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserMfaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserMfaGroupByArgs['orderBy'] }
        : { orderBy?: UserMfaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserMfaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserMfaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserMfa model
   */
  readonly fields: UserMfaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserMfa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserMfaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserMfa model
   */ 
  interface UserMfaFieldRefs {
    readonly user_id: FieldRef<"UserMfa", 'String'>
    readonly type: FieldRef<"UserMfa", 'String'>
    readonly secret_encrypted: FieldRef<"UserMfa", 'String'>
    readonly enabled: FieldRef<"UserMfa", 'Boolean'>
    readonly created_at: FieldRef<"UserMfa", 'DateTime'>
    readonly updated_at: FieldRef<"UserMfa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserMfa findUnique
   */
  export type UserMfaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * Filter, which UserMfa to fetch.
     */
    where: UserMfaWhereUniqueInput
  }

  /**
   * UserMfa findUniqueOrThrow
   */
  export type UserMfaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * Filter, which UserMfa to fetch.
     */
    where: UserMfaWhereUniqueInput
  }

  /**
   * UserMfa findFirst
   */
  export type UserMfaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * Filter, which UserMfa to fetch.
     */
    where?: UserMfaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfas to fetch.
     */
    orderBy?: UserMfaOrderByWithRelationInput | UserMfaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMfas.
     */
    cursor?: UserMfaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMfas.
     */
    distinct?: UserMfaScalarFieldEnum | UserMfaScalarFieldEnum[]
  }

  /**
   * UserMfa findFirstOrThrow
   */
  export type UserMfaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * Filter, which UserMfa to fetch.
     */
    where?: UserMfaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfas to fetch.
     */
    orderBy?: UserMfaOrderByWithRelationInput | UserMfaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMfas.
     */
    cursor?: UserMfaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMfas.
     */
    distinct?: UserMfaScalarFieldEnum | UserMfaScalarFieldEnum[]
  }

  /**
   * UserMfa findMany
   */
  export type UserMfaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * Filter, which UserMfas to fetch.
     */
    where?: UserMfaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfas to fetch.
     */
    orderBy?: UserMfaOrderByWithRelationInput | UserMfaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserMfas.
     */
    cursor?: UserMfaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfas.
     */
    skip?: number
    distinct?: UserMfaScalarFieldEnum | UserMfaScalarFieldEnum[]
  }

  /**
   * UserMfa create
   */
  export type UserMfaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * The data needed to create a UserMfa.
     */
    data: XOR<UserMfaCreateInput, UserMfaUncheckedCreateInput>
  }

  /**
   * UserMfa createMany
   */
  export type UserMfaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserMfas.
     */
    data: UserMfaCreateManyInput | UserMfaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserMfa createManyAndReturn
   */
  export type UserMfaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserMfas.
     */
    data: UserMfaCreateManyInput | UserMfaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserMfa update
   */
  export type UserMfaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * The data needed to update a UserMfa.
     */
    data: XOR<UserMfaUpdateInput, UserMfaUncheckedUpdateInput>
    /**
     * Choose, which UserMfa to update.
     */
    where: UserMfaWhereUniqueInput
  }

  /**
   * UserMfa updateMany
   */
  export type UserMfaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserMfas.
     */
    data: XOR<UserMfaUpdateManyMutationInput, UserMfaUncheckedUpdateManyInput>
    /**
     * Filter which UserMfas to update
     */
    where?: UserMfaWhereInput
  }

  /**
   * UserMfa upsert
   */
  export type UserMfaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * The filter to search for the UserMfa to update in case it exists.
     */
    where: UserMfaWhereUniqueInput
    /**
     * In case the UserMfa found by the `where` argument doesn't exist, create a new UserMfa with this data.
     */
    create: XOR<UserMfaCreateInput, UserMfaUncheckedCreateInput>
    /**
     * In case the UserMfa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserMfaUpdateInput, UserMfaUncheckedUpdateInput>
  }

  /**
   * UserMfa delete
   */
  export type UserMfaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
    /**
     * Filter which UserMfa to delete.
     */
    where: UserMfaWhereUniqueInput
  }

  /**
   * UserMfa deleteMany
   */
  export type UserMfaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMfas to delete
     */
    where?: UserMfaWhereInput
  }

  /**
   * UserMfa without action
   */
  export type UserMfaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfa
     */
    select?: UserMfaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaInclude<ExtArgs> | null
  }


  /**
   * Model UserMfaBackupCode
   */

  export type AggregateUserMfaBackupCode = {
    _count: UserMfaBackupCodeCountAggregateOutputType | null
    _min: UserMfaBackupCodeMinAggregateOutputType | null
    _max: UserMfaBackupCodeMaxAggregateOutputType | null
  }

  export type UserMfaBackupCodeMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    code_hash: string | null
    used_at: Date | null
  }

  export type UserMfaBackupCodeMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    code_hash: string | null
    used_at: Date | null
  }

  export type UserMfaBackupCodeCountAggregateOutputType = {
    id: number
    user_id: number
    code_hash: number
    used_at: number
    _all: number
  }


  export type UserMfaBackupCodeMinAggregateInputType = {
    id?: true
    user_id?: true
    code_hash?: true
    used_at?: true
  }

  export type UserMfaBackupCodeMaxAggregateInputType = {
    id?: true
    user_id?: true
    code_hash?: true
    used_at?: true
  }

  export type UserMfaBackupCodeCountAggregateInputType = {
    id?: true
    user_id?: true
    code_hash?: true
    used_at?: true
    _all?: true
  }

  export type UserMfaBackupCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMfaBackupCode to aggregate.
     */
    where?: UserMfaBackupCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfaBackupCodes to fetch.
     */
    orderBy?: UserMfaBackupCodeOrderByWithRelationInput | UserMfaBackupCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserMfaBackupCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfaBackupCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfaBackupCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserMfaBackupCodes
    **/
    _count?: true | UserMfaBackupCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMfaBackupCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMfaBackupCodeMaxAggregateInputType
  }

  export type GetUserMfaBackupCodeAggregateType<T extends UserMfaBackupCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserMfaBackupCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserMfaBackupCode[P]>
      : GetScalarType<T[P], AggregateUserMfaBackupCode[P]>
  }




  export type UserMfaBackupCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserMfaBackupCodeWhereInput
    orderBy?: UserMfaBackupCodeOrderByWithAggregationInput | UserMfaBackupCodeOrderByWithAggregationInput[]
    by: UserMfaBackupCodeScalarFieldEnum[] | UserMfaBackupCodeScalarFieldEnum
    having?: UserMfaBackupCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserMfaBackupCodeCountAggregateInputType | true
    _min?: UserMfaBackupCodeMinAggregateInputType
    _max?: UserMfaBackupCodeMaxAggregateInputType
  }

  export type UserMfaBackupCodeGroupByOutputType = {
    id: string
    user_id: string
    code_hash: string
    used_at: Date | null
    _count: UserMfaBackupCodeCountAggregateOutputType | null
    _min: UserMfaBackupCodeMinAggregateOutputType | null
    _max: UserMfaBackupCodeMaxAggregateOutputType | null
  }

  type GetUserMfaBackupCodeGroupByPayload<T extends UserMfaBackupCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserMfaBackupCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserMfaBackupCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserMfaBackupCodeGroupByOutputType[P]>
            : GetScalarType<T[P], UserMfaBackupCodeGroupByOutputType[P]>
        }
      >
    >


  export type UserMfaBackupCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    code_hash?: boolean
    used_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMfaBackupCode"]>

  export type UserMfaBackupCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    code_hash?: boolean
    used_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMfaBackupCode"]>

  export type UserMfaBackupCodeSelectScalar = {
    id?: boolean
    user_id?: boolean
    code_hash?: boolean
    used_at?: boolean
  }

  export type UserMfaBackupCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserMfaBackupCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserMfaBackupCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserMfaBackupCode"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      code_hash: string
      used_at: Date | null
    }, ExtArgs["result"]["userMfaBackupCode"]>
    composites: {}
  }

  type UserMfaBackupCodeGetPayload<S extends boolean | null | undefined | UserMfaBackupCodeDefaultArgs> = $Result.GetResult<Prisma.$UserMfaBackupCodePayload, S>

  type UserMfaBackupCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserMfaBackupCodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserMfaBackupCodeCountAggregateInputType | true
    }

  export interface UserMfaBackupCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserMfaBackupCode'], meta: { name: 'UserMfaBackupCode' } }
    /**
     * Find zero or one UserMfaBackupCode that matches the filter.
     * @param {UserMfaBackupCodeFindUniqueArgs} args - Arguments to find a UserMfaBackupCode
     * @example
     * // Get one UserMfaBackupCode
     * const userMfaBackupCode = await prisma.userMfaBackupCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserMfaBackupCodeFindUniqueArgs>(args: SelectSubset<T, UserMfaBackupCodeFindUniqueArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserMfaBackupCode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserMfaBackupCodeFindUniqueOrThrowArgs} args - Arguments to find a UserMfaBackupCode
     * @example
     * // Get one UserMfaBackupCode
     * const userMfaBackupCode = await prisma.userMfaBackupCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserMfaBackupCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserMfaBackupCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserMfaBackupCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeFindFirstArgs} args - Arguments to find a UserMfaBackupCode
     * @example
     * // Get one UserMfaBackupCode
     * const userMfaBackupCode = await prisma.userMfaBackupCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserMfaBackupCodeFindFirstArgs>(args?: SelectSubset<T, UserMfaBackupCodeFindFirstArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserMfaBackupCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeFindFirstOrThrowArgs} args - Arguments to find a UserMfaBackupCode
     * @example
     * // Get one UserMfaBackupCode
     * const userMfaBackupCode = await prisma.userMfaBackupCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserMfaBackupCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserMfaBackupCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserMfaBackupCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserMfaBackupCodes
     * const userMfaBackupCodes = await prisma.userMfaBackupCode.findMany()
     * 
     * // Get first 10 UserMfaBackupCodes
     * const userMfaBackupCodes = await prisma.userMfaBackupCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userMfaBackupCodeWithIdOnly = await prisma.userMfaBackupCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserMfaBackupCodeFindManyArgs>(args?: SelectSubset<T, UserMfaBackupCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserMfaBackupCode.
     * @param {UserMfaBackupCodeCreateArgs} args - Arguments to create a UserMfaBackupCode.
     * @example
     * // Create one UserMfaBackupCode
     * const UserMfaBackupCode = await prisma.userMfaBackupCode.create({
     *   data: {
     *     // ... data to create a UserMfaBackupCode
     *   }
     * })
     * 
     */
    create<T extends UserMfaBackupCodeCreateArgs>(args: SelectSubset<T, UserMfaBackupCodeCreateArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserMfaBackupCodes.
     * @param {UserMfaBackupCodeCreateManyArgs} args - Arguments to create many UserMfaBackupCodes.
     * @example
     * // Create many UserMfaBackupCodes
     * const userMfaBackupCode = await prisma.userMfaBackupCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserMfaBackupCodeCreateManyArgs>(args?: SelectSubset<T, UserMfaBackupCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserMfaBackupCodes and returns the data saved in the database.
     * @param {UserMfaBackupCodeCreateManyAndReturnArgs} args - Arguments to create many UserMfaBackupCodes.
     * @example
     * // Create many UserMfaBackupCodes
     * const userMfaBackupCode = await prisma.userMfaBackupCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserMfaBackupCodes and only return the `id`
     * const userMfaBackupCodeWithIdOnly = await prisma.userMfaBackupCode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserMfaBackupCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, UserMfaBackupCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserMfaBackupCode.
     * @param {UserMfaBackupCodeDeleteArgs} args - Arguments to delete one UserMfaBackupCode.
     * @example
     * // Delete one UserMfaBackupCode
     * const UserMfaBackupCode = await prisma.userMfaBackupCode.delete({
     *   where: {
     *     // ... filter to delete one UserMfaBackupCode
     *   }
     * })
     * 
     */
    delete<T extends UserMfaBackupCodeDeleteArgs>(args: SelectSubset<T, UserMfaBackupCodeDeleteArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserMfaBackupCode.
     * @param {UserMfaBackupCodeUpdateArgs} args - Arguments to update one UserMfaBackupCode.
     * @example
     * // Update one UserMfaBackupCode
     * const userMfaBackupCode = await prisma.userMfaBackupCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserMfaBackupCodeUpdateArgs>(args: SelectSubset<T, UserMfaBackupCodeUpdateArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserMfaBackupCodes.
     * @param {UserMfaBackupCodeDeleteManyArgs} args - Arguments to filter UserMfaBackupCodes to delete.
     * @example
     * // Delete a few UserMfaBackupCodes
     * const { count } = await prisma.userMfaBackupCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserMfaBackupCodeDeleteManyArgs>(args?: SelectSubset<T, UserMfaBackupCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserMfaBackupCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserMfaBackupCodes
     * const userMfaBackupCode = await prisma.userMfaBackupCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserMfaBackupCodeUpdateManyArgs>(args: SelectSubset<T, UserMfaBackupCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserMfaBackupCode.
     * @param {UserMfaBackupCodeUpsertArgs} args - Arguments to update or create a UserMfaBackupCode.
     * @example
     * // Update or create a UserMfaBackupCode
     * const userMfaBackupCode = await prisma.userMfaBackupCode.upsert({
     *   create: {
     *     // ... data to create a UserMfaBackupCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserMfaBackupCode we want to update
     *   }
     * })
     */
    upsert<T extends UserMfaBackupCodeUpsertArgs>(args: SelectSubset<T, UserMfaBackupCodeUpsertArgs<ExtArgs>>): Prisma__UserMfaBackupCodeClient<$Result.GetResult<Prisma.$UserMfaBackupCodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserMfaBackupCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeCountArgs} args - Arguments to filter UserMfaBackupCodes to count.
     * @example
     * // Count the number of UserMfaBackupCodes
     * const count = await prisma.userMfaBackupCode.count({
     *   where: {
     *     // ... the filter for the UserMfaBackupCodes we want to count
     *   }
     * })
    **/
    count<T extends UserMfaBackupCodeCountArgs>(
      args?: Subset<T, UserMfaBackupCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserMfaBackupCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserMfaBackupCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserMfaBackupCodeAggregateArgs>(args: Subset<T, UserMfaBackupCodeAggregateArgs>): Prisma.PrismaPromise<GetUserMfaBackupCodeAggregateType<T>>

    /**
     * Group by UserMfaBackupCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMfaBackupCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserMfaBackupCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserMfaBackupCodeGroupByArgs['orderBy'] }
        : { orderBy?: UserMfaBackupCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserMfaBackupCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserMfaBackupCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserMfaBackupCode model
   */
  readonly fields: UserMfaBackupCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserMfaBackupCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserMfaBackupCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserMfaBackupCode model
   */ 
  interface UserMfaBackupCodeFieldRefs {
    readonly id: FieldRef<"UserMfaBackupCode", 'String'>
    readonly user_id: FieldRef<"UserMfaBackupCode", 'String'>
    readonly code_hash: FieldRef<"UserMfaBackupCode", 'String'>
    readonly used_at: FieldRef<"UserMfaBackupCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserMfaBackupCode findUnique
   */
  export type UserMfaBackupCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserMfaBackupCode to fetch.
     */
    where: UserMfaBackupCodeWhereUniqueInput
  }

  /**
   * UserMfaBackupCode findUniqueOrThrow
   */
  export type UserMfaBackupCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserMfaBackupCode to fetch.
     */
    where: UserMfaBackupCodeWhereUniqueInput
  }

  /**
   * UserMfaBackupCode findFirst
   */
  export type UserMfaBackupCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserMfaBackupCode to fetch.
     */
    where?: UserMfaBackupCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfaBackupCodes to fetch.
     */
    orderBy?: UserMfaBackupCodeOrderByWithRelationInput | UserMfaBackupCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMfaBackupCodes.
     */
    cursor?: UserMfaBackupCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfaBackupCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfaBackupCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMfaBackupCodes.
     */
    distinct?: UserMfaBackupCodeScalarFieldEnum | UserMfaBackupCodeScalarFieldEnum[]
  }

  /**
   * UserMfaBackupCode findFirstOrThrow
   */
  export type UserMfaBackupCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserMfaBackupCode to fetch.
     */
    where?: UserMfaBackupCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfaBackupCodes to fetch.
     */
    orderBy?: UserMfaBackupCodeOrderByWithRelationInput | UserMfaBackupCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMfaBackupCodes.
     */
    cursor?: UserMfaBackupCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfaBackupCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfaBackupCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMfaBackupCodes.
     */
    distinct?: UserMfaBackupCodeScalarFieldEnum | UserMfaBackupCodeScalarFieldEnum[]
  }

  /**
   * UserMfaBackupCode findMany
   */
  export type UserMfaBackupCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * Filter, which UserMfaBackupCodes to fetch.
     */
    where?: UserMfaBackupCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMfaBackupCodes to fetch.
     */
    orderBy?: UserMfaBackupCodeOrderByWithRelationInput | UserMfaBackupCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserMfaBackupCodes.
     */
    cursor?: UserMfaBackupCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMfaBackupCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMfaBackupCodes.
     */
    skip?: number
    distinct?: UserMfaBackupCodeScalarFieldEnum | UserMfaBackupCodeScalarFieldEnum[]
  }

  /**
   * UserMfaBackupCode create
   */
  export type UserMfaBackupCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserMfaBackupCode.
     */
    data: XOR<UserMfaBackupCodeCreateInput, UserMfaBackupCodeUncheckedCreateInput>
  }

  /**
   * UserMfaBackupCode createMany
   */
  export type UserMfaBackupCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserMfaBackupCodes.
     */
    data: UserMfaBackupCodeCreateManyInput | UserMfaBackupCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserMfaBackupCode createManyAndReturn
   */
  export type UserMfaBackupCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserMfaBackupCodes.
     */
    data: UserMfaBackupCodeCreateManyInput | UserMfaBackupCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserMfaBackupCode update
   */
  export type UserMfaBackupCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserMfaBackupCode.
     */
    data: XOR<UserMfaBackupCodeUpdateInput, UserMfaBackupCodeUncheckedUpdateInput>
    /**
     * Choose, which UserMfaBackupCode to update.
     */
    where: UserMfaBackupCodeWhereUniqueInput
  }

  /**
   * UserMfaBackupCode updateMany
   */
  export type UserMfaBackupCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserMfaBackupCodes.
     */
    data: XOR<UserMfaBackupCodeUpdateManyMutationInput, UserMfaBackupCodeUncheckedUpdateManyInput>
    /**
     * Filter which UserMfaBackupCodes to update
     */
    where?: UserMfaBackupCodeWhereInput
  }

  /**
   * UserMfaBackupCode upsert
   */
  export type UserMfaBackupCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserMfaBackupCode to update in case it exists.
     */
    where: UserMfaBackupCodeWhereUniqueInput
    /**
     * In case the UserMfaBackupCode found by the `where` argument doesn't exist, create a new UserMfaBackupCode with this data.
     */
    create: XOR<UserMfaBackupCodeCreateInput, UserMfaBackupCodeUncheckedCreateInput>
    /**
     * In case the UserMfaBackupCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserMfaBackupCodeUpdateInput, UserMfaBackupCodeUncheckedUpdateInput>
  }

  /**
   * UserMfaBackupCode delete
   */
  export type UserMfaBackupCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
    /**
     * Filter which UserMfaBackupCode to delete.
     */
    where: UserMfaBackupCodeWhereUniqueInput
  }

  /**
   * UserMfaBackupCode deleteMany
   */
  export type UserMfaBackupCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMfaBackupCodes to delete
     */
    where?: UserMfaBackupCodeWhereInput
  }

  /**
   * UserMfaBackupCode without action
   */
  export type UserMfaBackupCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMfaBackupCode
     */
    select?: UserMfaBackupCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMfaBackupCodeInclude<ExtArgs> | null
  }


  /**
   * Model KycDetails
   */

  export type AggregateKycDetails = {
    _count: KycDetailsCountAggregateOutputType | null
    _avg: KycDetailsAvgAggregateOutputType | null
    _sum: KycDetailsSumAggregateOutputType | null
    _min: KycDetailsMinAggregateOutputType | null
    _max: KycDetailsMaxAggregateOutputType | null
  }

  export type KycDetailsAvgAggregateOutputType = {
    verification_score: number | null
  }

  export type KycDetailsSumAggregateOutputType = {
    verification_score: number | null
  }

  export type KycDetailsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    document_type: string | null
    document_number: string | null
    issue_date: Date | null
    expiry_date: Date | null
    verified: boolean | null
    status: string | null
    verification_score: number | null
    failure_reason: string | null
    created_at: Date | null
  }

  export type KycDetailsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    document_type: string | null
    document_number: string | null
    issue_date: Date | null
    expiry_date: Date | null
    verified: boolean | null
    status: string | null
    verification_score: number | null
    failure_reason: string | null
    created_at: Date | null
  }

  export type KycDetailsCountAggregateOutputType = {
    id: number
    user_id: number
    document_type: number
    document_number: number
    issue_date: number
    expiry_date: number
    verified: number
    status: number
    verification_score: number
    failure_reason: number
    created_at: number
    _all: number
  }


  export type KycDetailsAvgAggregateInputType = {
    verification_score?: true
  }

  export type KycDetailsSumAggregateInputType = {
    verification_score?: true
  }

  export type KycDetailsMinAggregateInputType = {
    id?: true
    user_id?: true
    document_type?: true
    document_number?: true
    issue_date?: true
    expiry_date?: true
    verified?: true
    status?: true
    verification_score?: true
    failure_reason?: true
    created_at?: true
  }

  export type KycDetailsMaxAggregateInputType = {
    id?: true
    user_id?: true
    document_type?: true
    document_number?: true
    issue_date?: true
    expiry_date?: true
    verified?: true
    status?: true
    verification_score?: true
    failure_reason?: true
    created_at?: true
  }

  export type KycDetailsCountAggregateInputType = {
    id?: true
    user_id?: true
    document_type?: true
    document_number?: true
    issue_date?: true
    expiry_date?: true
    verified?: true
    status?: true
    verification_score?: true
    failure_reason?: true
    created_at?: true
    _all?: true
  }

  export type KycDetailsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KycDetails to aggregate.
     */
    where?: KycDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDetails to fetch.
     */
    orderBy?: KycDetailsOrderByWithRelationInput | KycDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KycDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KycDetails
    **/
    _count?: true | KycDetailsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KycDetailsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KycDetailsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KycDetailsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KycDetailsMaxAggregateInputType
  }

  export type GetKycDetailsAggregateType<T extends KycDetailsAggregateArgs> = {
        [P in keyof T & keyof AggregateKycDetails]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKycDetails[P]>
      : GetScalarType<T[P], AggregateKycDetails[P]>
  }




  export type KycDetailsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KycDetailsWhereInput
    orderBy?: KycDetailsOrderByWithAggregationInput | KycDetailsOrderByWithAggregationInput[]
    by: KycDetailsScalarFieldEnum[] | KycDetailsScalarFieldEnum
    having?: KycDetailsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KycDetailsCountAggregateInputType | true
    _avg?: KycDetailsAvgAggregateInputType
    _sum?: KycDetailsSumAggregateInputType
    _min?: KycDetailsMinAggregateInputType
    _max?: KycDetailsMaxAggregateInputType
  }

  export type KycDetailsGroupByOutputType = {
    id: string
    user_id: string
    document_type: string | null
    document_number: string | null
    issue_date: Date | null
    expiry_date: Date | null
    verified: boolean
    status: string
    verification_score: number | null
    failure_reason: string | null
    created_at: Date
    _count: KycDetailsCountAggregateOutputType | null
    _avg: KycDetailsAvgAggregateOutputType | null
    _sum: KycDetailsSumAggregateOutputType | null
    _min: KycDetailsMinAggregateOutputType | null
    _max: KycDetailsMaxAggregateOutputType | null
  }

  type GetKycDetailsGroupByPayload<T extends KycDetailsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KycDetailsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KycDetailsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KycDetailsGroupByOutputType[P]>
            : GetScalarType<T[P], KycDetailsGroupByOutputType[P]>
        }
      >
    >


  export type KycDetailsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    verified?: boolean
    status?: boolean
    verification_score?: boolean
    failure_reason?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kycDetails"]>

  export type KycDetailsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    verified?: boolean
    status?: boolean
    verification_score?: boolean
    failure_reason?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kycDetails"]>

  export type KycDetailsSelectScalar = {
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number?: boolean
    issue_date?: boolean
    expiry_date?: boolean
    verified?: boolean
    status?: boolean
    verification_score?: boolean
    failure_reason?: boolean
    created_at?: boolean
  }

  export type KycDetailsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KycDetailsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $KycDetailsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KycDetails"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      document_type: string | null
      document_number: string | null
      issue_date: Date | null
      expiry_date: Date | null
      verified: boolean
      status: string
      verification_score: number | null
      failure_reason: string | null
      created_at: Date
    }, ExtArgs["result"]["kycDetails"]>
    composites: {}
  }

  type KycDetailsGetPayload<S extends boolean | null | undefined | KycDetailsDefaultArgs> = $Result.GetResult<Prisma.$KycDetailsPayload, S>

  type KycDetailsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KycDetailsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KycDetailsCountAggregateInputType | true
    }

  export interface KycDetailsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KycDetails'], meta: { name: 'KycDetails' } }
    /**
     * Find zero or one KycDetails that matches the filter.
     * @param {KycDetailsFindUniqueArgs} args - Arguments to find a KycDetails
     * @example
     * // Get one KycDetails
     * const kycDetails = await prisma.kycDetails.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KycDetailsFindUniqueArgs>(args: SelectSubset<T, KycDetailsFindUniqueArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KycDetails that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KycDetailsFindUniqueOrThrowArgs} args - Arguments to find a KycDetails
     * @example
     * // Get one KycDetails
     * const kycDetails = await prisma.kycDetails.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KycDetailsFindUniqueOrThrowArgs>(args: SelectSubset<T, KycDetailsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KycDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsFindFirstArgs} args - Arguments to find a KycDetails
     * @example
     * // Get one KycDetails
     * const kycDetails = await prisma.kycDetails.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KycDetailsFindFirstArgs>(args?: SelectSubset<T, KycDetailsFindFirstArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KycDetails that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsFindFirstOrThrowArgs} args - Arguments to find a KycDetails
     * @example
     * // Get one KycDetails
     * const kycDetails = await prisma.kycDetails.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KycDetailsFindFirstOrThrowArgs>(args?: SelectSubset<T, KycDetailsFindFirstOrThrowArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KycDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KycDetails
     * const kycDetails = await prisma.kycDetails.findMany()
     * 
     * // Get first 10 KycDetails
     * const kycDetails = await prisma.kycDetails.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kycDetailsWithIdOnly = await prisma.kycDetails.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KycDetailsFindManyArgs>(args?: SelectSubset<T, KycDetailsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KycDetails.
     * @param {KycDetailsCreateArgs} args - Arguments to create a KycDetails.
     * @example
     * // Create one KycDetails
     * const KycDetails = await prisma.kycDetails.create({
     *   data: {
     *     // ... data to create a KycDetails
     *   }
     * })
     * 
     */
    create<T extends KycDetailsCreateArgs>(args: SelectSubset<T, KycDetailsCreateArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KycDetails.
     * @param {KycDetailsCreateManyArgs} args - Arguments to create many KycDetails.
     * @example
     * // Create many KycDetails
     * const kycDetails = await prisma.kycDetails.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KycDetailsCreateManyArgs>(args?: SelectSubset<T, KycDetailsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KycDetails and returns the data saved in the database.
     * @param {KycDetailsCreateManyAndReturnArgs} args - Arguments to create many KycDetails.
     * @example
     * // Create many KycDetails
     * const kycDetails = await prisma.kycDetails.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KycDetails and only return the `id`
     * const kycDetailsWithIdOnly = await prisma.kycDetails.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KycDetailsCreateManyAndReturnArgs>(args?: SelectSubset<T, KycDetailsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KycDetails.
     * @param {KycDetailsDeleteArgs} args - Arguments to delete one KycDetails.
     * @example
     * // Delete one KycDetails
     * const KycDetails = await prisma.kycDetails.delete({
     *   where: {
     *     // ... filter to delete one KycDetails
     *   }
     * })
     * 
     */
    delete<T extends KycDetailsDeleteArgs>(args: SelectSubset<T, KycDetailsDeleteArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KycDetails.
     * @param {KycDetailsUpdateArgs} args - Arguments to update one KycDetails.
     * @example
     * // Update one KycDetails
     * const kycDetails = await prisma.kycDetails.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KycDetailsUpdateArgs>(args: SelectSubset<T, KycDetailsUpdateArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KycDetails.
     * @param {KycDetailsDeleteManyArgs} args - Arguments to filter KycDetails to delete.
     * @example
     * // Delete a few KycDetails
     * const { count } = await prisma.kycDetails.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KycDetailsDeleteManyArgs>(args?: SelectSubset<T, KycDetailsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KycDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KycDetails
     * const kycDetails = await prisma.kycDetails.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KycDetailsUpdateManyArgs>(args: SelectSubset<T, KycDetailsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KycDetails.
     * @param {KycDetailsUpsertArgs} args - Arguments to update or create a KycDetails.
     * @example
     * // Update or create a KycDetails
     * const kycDetails = await prisma.kycDetails.upsert({
     *   create: {
     *     // ... data to create a KycDetails
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KycDetails we want to update
     *   }
     * })
     */
    upsert<T extends KycDetailsUpsertArgs>(args: SelectSubset<T, KycDetailsUpsertArgs<ExtArgs>>): Prisma__KycDetailsClient<$Result.GetResult<Prisma.$KycDetailsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KycDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsCountArgs} args - Arguments to filter KycDetails to count.
     * @example
     * // Count the number of KycDetails
     * const count = await prisma.kycDetails.count({
     *   where: {
     *     // ... the filter for the KycDetails we want to count
     *   }
     * })
    **/
    count<T extends KycDetailsCountArgs>(
      args?: Subset<T, KycDetailsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KycDetailsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KycDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KycDetailsAggregateArgs>(args: Subset<T, KycDetailsAggregateArgs>): Prisma.PrismaPromise<GetKycDetailsAggregateType<T>>

    /**
     * Group by KycDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDetailsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KycDetailsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KycDetailsGroupByArgs['orderBy'] }
        : { orderBy?: KycDetailsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KycDetailsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKycDetailsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KycDetails model
   */
  readonly fields: KycDetailsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KycDetails.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KycDetailsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KycDetails model
   */ 
  interface KycDetailsFieldRefs {
    readonly id: FieldRef<"KycDetails", 'String'>
    readonly user_id: FieldRef<"KycDetails", 'String'>
    readonly document_type: FieldRef<"KycDetails", 'String'>
    readonly document_number: FieldRef<"KycDetails", 'String'>
    readonly issue_date: FieldRef<"KycDetails", 'DateTime'>
    readonly expiry_date: FieldRef<"KycDetails", 'DateTime'>
    readonly verified: FieldRef<"KycDetails", 'Boolean'>
    readonly status: FieldRef<"KycDetails", 'String'>
    readonly verification_score: FieldRef<"KycDetails", 'Float'>
    readonly failure_reason: FieldRef<"KycDetails", 'String'>
    readonly created_at: FieldRef<"KycDetails", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KycDetails findUnique
   */
  export type KycDetailsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * Filter, which KycDetails to fetch.
     */
    where: KycDetailsWhereUniqueInput
  }

  /**
   * KycDetails findUniqueOrThrow
   */
  export type KycDetailsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * Filter, which KycDetails to fetch.
     */
    where: KycDetailsWhereUniqueInput
  }

  /**
   * KycDetails findFirst
   */
  export type KycDetailsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * Filter, which KycDetails to fetch.
     */
    where?: KycDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDetails to fetch.
     */
    orderBy?: KycDetailsOrderByWithRelationInput | KycDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KycDetails.
     */
    cursor?: KycDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KycDetails.
     */
    distinct?: KycDetailsScalarFieldEnum | KycDetailsScalarFieldEnum[]
  }

  /**
   * KycDetails findFirstOrThrow
   */
  export type KycDetailsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * Filter, which KycDetails to fetch.
     */
    where?: KycDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDetails to fetch.
     */
    orderBy?: KycDetailsOrderByWithRelationInput | KycDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KycDetails.
     */
    cursor?: KycDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KycDetails.
     */
    distinct?: KycDetailsScalarFieldEnum | KycDetailsScalarFieldEnum[]
  }

  /**
   * KycDetails findMany
   */
  export type KycDetailsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * Filter, which KycDetails to fetch.
     */
    where?: KycDetailsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDetails to fetch.
     */
    orderBy?: KycDetailsOrderByWithRelationInput | KycDetailsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KycDetails.
     */
    cursor?: KycDetailsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDetails.
     */
    skip?: number
    distinct?: KycDetailsScalarFieldEnum | KycDetailsScalarFieldEnum[]
  }

  /**
   * KycDetails create
   */
  export type KycDetailsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * The data needed to create a KycDetails.
     */
    data: XOR<KycDetailsCreateInput, KycDetailsUncheckedCreateInput>
  }

  /**
   * KycDetails createMany
   */
  export type KycDetailsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KycDetails.
     */
    data: KycDetailsCreateManyInput | KycDetailsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KycDetails createManyAndReturn
   */
  export type KycDetailsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KycDetails.
     */
    data: KycDetailsCreateManyInput | KycDetailsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KycDetails update
   */
  export type KycDetailsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * The data needed to update a KycDetails.
     */
    data: XOR<KycDetailsUpdateInput, KycDetailsUncheckedUpdateInput>
    /**
     * Choose, which KycDetails to update.
     */
    where: KycDetailsWhereUniqueInput
  }

  /**
   * KycDetails updateMany
   */
  export type KycDetailsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KycDetails.
     */
    data: XOR<KycDetailsUpdateManyMutationInput, KycDetailsUncheckedUpdateManyInput>
    /**
     * Filter which KycDetails to update
     */
    where?: KycDetailsWhereInput
  }

  /**
   * KycDetails upsert
   */
  export type KycDetailsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * The filter to search for the KycDetails to update in case it exists.
     */
    where: KycDetailsWhereUniqueInput
    /**
     * In case the KycDetails found by the `where` argument doesn't exist, create a new KycDetails with this data.
     */
    create: XOR<KycDetailsCreateInput, KycDetailsUncheckedCreateInput>
    /**
     * In case the KycDetails was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KycDetailsUpdateInput, KycDetailsUncheckedUpdateInput>
  }

  /**
   * KycDetails delete
   */
  export type KycDetailsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
    /**
     * Filter which KycDetails to delete.
     */
    where: KycDetailsWhereUniqueInput
  }

  /**
   * KycDetails deleteMany
   */
  export type KycDetailsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KycDetails to delete
     */
    where?: KycDetailsWhereInput
  }

  /**
   * KycDetails without action
   */
  export type KycDetailsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDetails
     */
    select?: KycDetailsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDetailsInclude<ExtArgs> | null
  }


  /**
   * Model KycDocument
   */

  export type AggregateKycDocument = {
    _count: KycDocumentCountAggregateOutputType | null
    _min: KycDocumentMinAggregateOutputType | null
    _max: KycDocumentMaxAggregateOutputType | null
  }

  export type KycDocumentMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    doc_kind: string | null
    file_url: string | null
    file_hash: string | null
    created_at: Date | null
  }

  export type KycDocumentMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    doc_kind: string | null
    file_url: string | null
    file_hash: string | null
    created_at: Date | null
  }

  export type KycDocumentCountAggregateOutputType = {
    id: number
    user_id: number
    doc_kind: number
    file_url: number
    file_hash: number
    created_at: number
    _all: number
  }


  export type KycDocumentMinAggregateInputType = {
    id?: true
    user_id?: true
    doc_kind?: true
    file_url?: true
    file_hash?: true
    created_at?: true
  }

  export type KycDocumentMaxAggregateInputType = {
    id?: true
    user_id?: true
    doc_kind?: true
    file_url?: true
    file_hash?: true
    created_at?: true
  }

  export type KycDocumentCountAggregateInputType = {
    id?: true
    user_id?: true
    doc_kind?: true
    file_url?: true
    file_hash?: true
    created_at?: true
    _all?: true
  }

  export type KycDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KycDocument to aggregate.
     */
    where?: KycDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDocuments to fetch.
     */
    orderBy?: KycDocumentOrderByWithRelationInput | KycDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KycDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KycDocuments
    **/
    _count?: true | KycDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KycDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KycDocumentMaxAggregateInputType
  }

  export type GetKycDocumentAggregateType<T extends KycDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateKycDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKycDocument[P]>
      : GetScalarType<T[P], AggregateKycDocument[P]>
  }




  export type KycDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KycDocumentWhereInput
    orderBy?: KycDocumentOrderByWithAggregationInput | KycDocumentOrderByWithAggregationInput[]
    by: KycDocumentScalarFieldEnum[] | KycDocumentScalarFieldEnum
    having?: KycDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KycDocumentCountAggregateInputType | true
    _min?: KycDocumentMinAggregateInputType
    _max?: KycDocumentMaxAggregateInputType
  }

  export type KycDocumentGroupByOutputType = {
    id: string
    user_id: string
    doc_kind: string
    file_url: string
    file_hash: string | null
    created_at: Date
    _count: KycDocumentCountAggregateOutputType | null
    _min: KycDocumentMinAggregateOutputType | null
    _max: KycDocumentMaxAggregateOutputType | null
  }

  type GetKycDocumentGroupByPayload<T extends KycDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KycDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KycDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KycDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], KycDocumentGroupByOutputType[P]>
        }
      >
    >


  export type KycDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    doc_kind?: boolean
    file_url?: boolean
    file_hash?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kycDocument"]>

  export type KycDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    doc_kind?: boolean
    file_url?: boolean
    file_hash?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kycDocument"]>

  export type KycDocumentSelectScalar = {
    id?: boolean
    user_id?: boolean
    doc_kind?: boolean
    file_url?: boolean
    file_hash?: boolean
    created_at?: boolean
  }

  export type KycDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KycDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $KycDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KycDocument"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      doc_kind: string
      file_url: string
      file_hash: string | null
      created_at: Date
    }, ExtArgs["result"]["kycDocument"]>
    composites: {}
  }

  type KycDocumentGetPayload<S extends boolean | null | undefined | KycDocumentDefaultArgs> = $Result.GetResult<Prisma.$KycDocumentPayload, S>

  type KycDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KycDocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KycDocumentCountAggregateInputType | true
    }

  export interface KycDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KycDocument'], meta: { name: 'KycDocument' } }
    /**
     * Find zero or one KycDocument that matches the filter.
     * @param {KycDocumentFindUniqueArgs} args - Arguments to find a KycDocument
     * @example
     * // Get one KycDocument
     * const kycDocument = await prisma.kycDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KycDocumentFindUniqueArgs>(args: SelectSubset<T, KycDocumentFindUniqueArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KycDocument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KycDocumentFindUniqueOrThrowArgs} args - Arguments to find a KycDocument
     * @example
     * // Get one KycDocument
     * const kycDocument = await prisma.kycDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KycDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, KycDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KycDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentFindFirstArgs} args - Arguments to find a KycDocument
     * @example
     * // Get one KycDocument
     * const kycDocument = await prisma.kycDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KycDocumentFindFirstArgs>(args?: SelectSubset<T, KycDocumentFindFirstArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KycDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentFindFirstOrThrowArgs} args - Arguments to find a KycDocument
     * @example
     * // Get one KycDocument
     * const kycDocument = await prisma.kycDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KycDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, KycDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KycDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KycDocuments
     * const kycDocuments = await prisma.kycDocument.findMany()
     * 
     * // Get first 10 KycDocuments
     * const kycDocuments = await prisma.kycDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kycDocumentWithIdOnly = await prisma.kycDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KycDocumentFindManyArgs>(args?: SelectSubset<T, KycDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KycDocument.
     * @param {KycDocumentCreateArgs} args - Arguments to create a KycDocument.
     * @example
     * // Create one KycDocument
     * const KycDocument = await prisma.kycDocument.create({
     *   data: {
     *     // ... data to create a KycDocument
     *   }
     * })
     * 
     */
    create<T extends KycDocumentCreateArgs>(args: SelectSubset<T, KycDocumentCreateArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KycDocuments.
     * @param {KycDocumentCreateManyArgs} args - Arguments to create many KycDocuments.
     * @example
     * // Create many KycDocuments
     * const kycDocument = await prisma.kycDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KycDocumentCreateManyArgs>(args?: SelectSubset<T, KycDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KycDocuments and returns the data saved in the database.
     * @param {KycDocumentCreateManyAndReturnArgs} args - Arguments to create many KycDocuments.
     * @example
     * // Create many KycDocuments
     * const kycDocument = await prisma.kycDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KycDocuments and only return the `id`
     * const kycDocumentWithIdOnly = await prisma.kycDocument.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KycDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, KycDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KycDocument.
     * @param {KycDocumentDeleteArgs} args - Arguments to delete one KycDocument.
     * @example
     * // Delete one KycDocument
     * const KycDocument = await prisma.kycDocument.delete({
     *   where: {
     *     // ... filter to delete one KycDocument
     *   }
     * })
     * 
     */
    delete<T extends KycDocumentDeleteArgs>(args: SelectSubset<T, KycDocumentDeleteArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KycDocument.
     * @param {KycDocumentUpdateArgs} args - Arguments to update one KycDocument.
     * @example
     * // Update one KycDocument
     * const kycDocument = await prisma.kycDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KycDocumentUpdateArgs>(args: SelectSubset<T, KycDocumentUpdateArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KycDocuments.
     * @param {KycDocumentDeleteManyArgs} args - Arguments to filter KycDocuments to delete.
     * @example
     * // Delete a few KycDocuments
     * const { count } = await prisma.kycDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KycDocumentDeleteManyArgs>(args?: SelectSubset<T, KycDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KycDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KycDocuments
     * const kycDocument = await prisma.kycDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KycDocumentUpdateManyArgs>(args: SelectSubset<T, KycDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KycDocument.
     * @param {KycDocumentUpsertArgs} args - Arguments to update or create a KycDocument.
     * @example
     * // Update or create a KycDocument
     * const kycDocument = await prisma.kycDocument.upsert({
     *   create: {
     *     // ... data to create a KycDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KycDocument we want to update
     *   }
     * })
     */
    upsert<T extends KycDocumentUpsertArgs>(args: SelectSubset<T, KycDocumentUpsertArgs<ExtArgs>>): Prisma__KycDocumentClient<$Result.GetResult<Prisma.$KycDocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KycDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentCountArgs} args - Arguments to filter KycDocuments to count.
     * @example
     * // Count the number of KycDocuments
     * const count = await prisma.kycDocument.count({
     *   where: {
     *     // ... the filter for the KycDocuments we want to count
     *   }
     * })
    **/
    count<T extends KycDocumentCountArgs>(
      args?: Subset<T, KycDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KycDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KycDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KycDocumentAggregateArgs>(args: Subset<T, KycDocumentAggregateArgs>): Prisma.PrismaPromise<GetKycDocumentAggregateType<T>>

    /**
     * Group by KycDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KycDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KycDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KycDocumentGroupByArgs['orderBy'] }
        : { orderBy?: KycDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KycDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKycDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KycDocument model
   */
  readonly fields: KycDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KycDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KycDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KycDocument model
   */ 
  interface KycDocumentFieldRefs {
    readonly id: FieldRef<"KycDocument", 'String'>
    readonly user_id: FieldRef<"KycDocument", 'String'>
    readonly doc_kind: FieldRef<"KycDocument", 'String'>
    readonly file_url: FieldRef<"KycDocument", 'String'>
    readonly file_hash: FieldRef<"KycDocument", 'String'>
    readonly created_at: FieldRef<"KycDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KycDocument findUnique
   */
  export type KycDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KycDocument to fetch.
     */
    where: KycDocumentWhereUniqueInput
  }

  /**
   * KycDocument findUniqueOrThrow
   */
  export type KycDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KycDocument to fetch.
     */
    where: KycDocumentWhereUniqueInput
  }

  /**
   * KycDocument findFirst
   */
  export type KycDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KycDocument to fetch.
     */
    where?: KycDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDocuments to fetch.
     */
    orderBy?: KycDocumentOrderByWithRelationInput | KycDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KycDocuments.
     */
    cursor?: KycDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KycDocuments.
     */
    distinct?: KycDocumentScalarFieldEnum | KycDocumentScalarFieldEnum[]
  }

  /**
   * KycDocument findFirstOrThrow
   */
  export type KycDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KycDocument to fetch.
     */
    where?: KycDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDocuments to fetch.
     */
    orderBy?: KycDocumentOrderByWithRelationInput | KycDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KycDocuments.
     */
    cursor?: KycDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KycDocuments.
     */
    distinct?: KycDocumentScalarFieldEnum | KycDocumentScalarFieldEnum[]
  }

  /**
   * KycDocument findMany
   */
  export type KycDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * Filter, which KycDocuments to fetch.
     */
    where?: KycDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KycDocuments to fetch.
     */
    orderBy?: KycDocumentOrderByWithRelationInput | KycDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KycDocuments.
     */
    cursor?: KycDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KycDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KycDocuments.
     */
    skip?: number
    distinct?: KycDocumentScalarFieldEnum | KycDocumentScalarFieldEnum[]
  }

  /**
   * KycDocument create
   */
  export type KycDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a KycDocument.
     */
    data: XOR<KycDocumentCreateInput, KycDocumentUncheckedCreateInput>
  }

  /**
   * KycDocument createMany
   */
  export type KycDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KycDocuments.
     */
    data: KycDocumentCreateManyInput | KycDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KycDocument createManyAndReturn
   */
  export type KycDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KycDocuments.
     */
    data: KycDocumentCreateManyInput | KycDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KycDocument update
   */
  export type KycDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a KycDocument.
     */
    data: XOR<KycDocumentUpdateInput, KycDocumentUncheckedUpdateInput>
    /**
     * Choose, which KycDocument to update.
     */
    where: KycDocumentWhereUniqueInput
  }

  /**
   * KycDocument updateMany
   */
  export type KycDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KycDocuments.
     */
    data: XOR<KycDocumentUpdateManyMutationInput, KycDocumentUncheckedUpdateManyInput>
    /**
     * Filter which KycDocuments to update
     */
    where?: KycDocumentWhereInput
  }

  /**
   * KycDocument upsert
   */
  export type KycDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the KycDocument to update in case it exists.
     */
    where: KycDocumentWhereUniqueInput
    /**
     * In case the KycDocument found by the `where` argument doesn't exist, create a new KycDocument with this data.
     */
    create: XOR<KycDocumentCreateInput, KycDocumentUncheckedCreateInput>
    /**
     * In case the KycDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KycDocumentUpdateInput, KycDocumentUncheckedUpdateInput>
  }

  /**
   * KycDocument delete
   */
  export type KycDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
    /**
     * Filter which KycDocument to delete.
     */
    where: KycDocumentWhereUniqueInput
  }

  /**
   * KycDocument deleteMany
   */
  export type KycDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KycDocuments to delete
     */
    where?: KycDocumentWhereInput
  }

  /**
   * KycDocument without action
   */
  export type KycDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KycDocument
     */
    select?: KycDocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KycDocumentInclude<ExtArgs> | null
  }


  /**
   * Model NotificationPrefs
   */

  export type AggregateNotificationPrefs = {
    _count: NotificationPrefsCountAggregateOutputType | null
    _avg: NotificationPrefsAvgAggregateOutputType | null
    _sum: NotificationPrefsSumAggregateOutputType | null
    _min: NotificationPrefsMinAggregateOutputType | null
    _max: NotificationPrefsMaxAggregateOutputType | null
  }

  export type NotificationPrefsAvgAggregateOutputType = {
    low_balance_threshold: Decimal | null
  }

  export type NotificationPrefsSumAggregateOutputType = {
    low_balance_threshold: Decimal | null
  }

  export type NotificationPrefsMinAggregateOutputType = {
    user_id: string | null
    email_enabled: boolean | null
    sms_enabled: boolean | null
    in_app_enabled: boolean | null
    transactions: boolean | null
    low_balance: boolean | null
    security: boolean | null
    low_balance_threshold: Decimal | null
  }

  export type NotificationPrefsMaxAggregateOutputType = {
    user_id: string | null
    email_enabled: boolean | null
    sms_enabled: boolean | null
    in_app_enabled: boolean | null
    transactions: boolean | null
    low_balance: boolean | null
    security: boolean | null
    low_balance_threshold: Decimal | null
  }

  export type NotificationPrefsCountAggregateOutputType = {
    user_id: number
    email_enabled: number
    sms_enabled: number
    in_app_enabled: number
    transactions: number
    low_balance: number
    security: number
    low_balance_threshold: number
    _all: number
  }


  export type NotificationPrefsAvgAggregateInputType = {
    low_balance_threshold?: true
  }

  export type NotificationPrefsSumAggregateInputType = {
    low_balance_threshold?: true
  }

  export type NotificationPrefsMinAggregateInputType = {
    user_id?: true
    email_enabled?: true
    sms_enabled?: true
    in_app_enabled?: true
    transactions?: true
    low_balance?: true
    security?: true
    low_balance_threshold?: true
  }

  export type NotificationPrefsMaxAggregateInputType = {
    user_id?: true
    email_enabled?: true
    sms_enabled?: true
    in_app_enabled?: true
    transactions?: true
    low_balance?: true
    security?: true
    low_balance_threshold?: true
  }

  export type NotificationPrefsCountAggregateInputType = {
    user_id?: true
    email_enabled?: true
    sms_enabled?: true
    in_app_enabled?: true
    transactions?: true
    low_balance?: true
    security?: true
    low_balance_threshold?: true
    _all?: true
  }

  export type NotificationPrefsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPrefs to aggregate.
     */
    where?: NotificationPrefsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPrefs to fetch.
     */
    orderBy?: NotificationPrefsOrderByWithRelationInput | NotificationPrefsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationPrefsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPrefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPrefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationPrefs
    **/
    _count?: true | NotificationPrefsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationPrefsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationPrefsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationPrefsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationPrefsMaxAggregateInputType
  }

  export type GetNotificationPrefsAggregateType<T extends NotificationPrefsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationPrefs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationPrefs[P]>
      : GetScalarType<T[P], AggregateNotificationPrefs[P]>
  }




  export type NotificationPrefsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationPrefsWhereInput
    orderBy?: NotificationPrefsOrderByWithAggregationInput | NotificationPrefsOrderByWithAggregationInput[]
    by: NotificationPrefsScalarFieldEnum[] | NotificationPrefsScalarFieldEnum
    having?: NotificationPrefsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationPrefsCountAggregateInputType | true
    _avg?: NotificationPrefsAvgAggregateInputType
    _sum?: NotificationPrefsSumAggregateInputType
    _min?: NotificationPrefsMinAggregateInputType
    _max?: NotificationPrefsMaxAggregateInputType
  }

  export type NotificationPrefsGroupByOutputType = {
    user_id: string
    email_enabled: boolean
    sms_enabled: boolean
    in_app_enabled: boolean
    transactions: boolean
    low_balance: boolean
    security: boolean
    low_balance_threshold: Decimal
    _count: NotificationPrefsCountAggregateOutputType | null
    _avg: NotificationPrefsAvgAggregateOutputType | null
    _sum: NotificationPrefsSumAggregateOutputType | null
    _min: NotificationPrefsMinAggregateOutputType | null
    _max: NotificationPrefsMaxAggregateOutputType | null
  }

  type GetNotificationPrefsGroupByPayload<T extends NotificationPrefsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationPrefsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationPrefsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationPrefsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationPrefsGroupByOutputType[P]>
        }
      >
    >


  export type NotificationPrefsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPrefs"]>

  export type NotificationPrefsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationPrefs"]>

  export type NotificationPrefsSelectScalar = {
    user_id?: boolean
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: boolean
  }

  export type NotificationPrefsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationPrefsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPrefsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationPrefs"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      email_enabled: boolean
      sms_enabled: boolean
      in_app_enabled: boolean
      transactions: boolean
      low_balance: boolean
      security: boolean
      low_balance_threshold: Prisma.Decimal
    }, ExtArgs["result"]["notificationPrefs"]>
    composites: {}
  }

  type NotificationPrefsGetPayload<S extends boolean | null | undefined | NotificationPrefsDefaultArgs> = $Result.GetResult<Prisma.$NotificationPrefsPayload, S>

  type NotificationPrefsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationPrefsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationPrefsCountAggregateInputType | true
    }

  export interface NotificationPrefsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationPrefs'], meta: { name: 'NotificationPrefs' } }
    /**
     * Find zero or one NotificationPrefs that matches the filter.
     * @param {NotificationPrefsFindUniqueArgs} args - Arguments to find a NotificationPrefs
     * @example
     * // Get one NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationPrefsFindUniqueArgs>(args: SelectSubset<T, NotificationPrefsFindUniqueArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NotificationPrefs that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationPrefsFindUniqueOrThrowArgs} args - Arguments to find a NotificationPrefs
     * @example
     * // Get one NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationPrefsFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationPrefsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NotificationPrefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsFindFirstArgs} args - Arguments to find a NotificationPrefs
     * @example
     * // Get one NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationPrefsFindFirstArgs>(args?: SelectSubset<T, NotificationPrefsFindFirstArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NotificationPrefs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsFindFirstOrThrowArgs} args - Arguments to find a NotificationPrefs
     * @example
     * // Get one NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationPrefsFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationPrefsFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NotificationPrefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.findMany()
     * 
     * // Get first 10 NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const notificationPrefsWithUser_idOnly = await prisma.notificationPrefs.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends NotificationPrefsFindManyArgs>(args?: SelectSubset<T, NotificationPrefsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NotificationPrefs.
     * @param {NotificationPrefsCreateArgs} args - Arguments to create a NotificationPrefs.
     * @example
     * // Create one NotificationPrefs
     * const NotificationPrefs = await prisma.notificationPrefs.create({
     *   data: {
     *     // ... data to create a NotificationPrefs
     *   }
     * })
     * 
     */
    create<T extends NotificationPrefsCreateArgs>(args: SelectSubset<T, NotificationPrefsCreateArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NotificationPrefs.
     * @param {NotificationPrefsCreateManyArgs} args - Arguments to create many NotificationPrefs.
     * @example
     * // Create many NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationPrefsCreateManyArgs>(args?: SelectSubset<T, NotificationPrefsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationPrefs and returns the data saved in the database.
     * @param {NotificationPrefsCreateManyAndReturnArgs} args - Arguments to create many NotificationPrefs.
     * @example
     * // Create many NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationPrefs and only return the `user_id`
     * const notificationPrefsWithUser_idOnly = await prisma.notificationPrefs.createManyAndReturn({ 
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationPrefsCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationPrefsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NotificationPrefs.
     * @param {NotificationPrefsDeleteArgs} args - Arguments to delete one NotificationPrefs.
     * @example
     * // Delete one NotificationPrefs
     * const NotificationPrefs = await prisma.notificationPrefs.delete({
     *   where: {
     *     // ... filter to delete one NotificationPrefs
     *   }
     * })
     * 
     */
    delete<T extends NotificationPrefsDeleteArgs>(args: SelectSubset<T, NotificationPrefsDeleteArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NotificationPrefs.
     * @param {NotificationPrefsUpdateArgs} args - Arguments to update one NotificationPrefs.
     * @example
     * // Update one NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationPrefsUpdateArgs>(args: SelectSubset<T, NotificationPrefsUpdateArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NotificationPrefs.
     * @param {NotificationPrefsDeleteManyArgs} args - Arguments to filter NotificationPrefs to delete.
     * @example
     * // Delete a few NotificationPrefs
     * const { count } = await prisma.notificationPrefs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationPrefsDeleteManyArgs>(args?: SelectSubset<T, NotificationPrefsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationPrefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationPrefsUpdateManyArgs>(args: SelectSubset<T, NotificationPrefsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NotificationPrefs.
     * @param {NotificationPrefsUpsertArgs} args - Arguments to update or create a NotificationPrefs.
     * @example
     * // Update or create a NotificationPrefs
     * const notificationPrefs = await prisma.notificationPrefs.upsert({
     *   create: {
     *     // ... data to create a NotificationPrefs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationPrefs we want to update
     *   }
     * })
     */
    upsert<T extends NotificationPrefsUpsertArgs>(args: SelectSubset<T, NotificationPrefsUpsertArgs<ExtArgs>>): Prisma__NotificationPrefsClient<$Result.GetResult<Prisma.$NotificationPrefsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NotificationPrefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsCountArgs} args - Arguments to filter NotificationPrefs to count.
     * @example
     * // Count the number of NotificationPrefs
     * const count = await prisma.notificationPrefs.count({
     *   where: {
     *     // ... the filter for the NotificationPrefs we want to count
     *   }
     * })
    **/
    count<T extends NotificationPrefsCountArgs>(
      args?: Subset<T, NotificationPrefsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationPrefsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationPrefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationPrefsAggregateArgs>(args: Subset<T, NotificationPrefsAggregateArgs>): Prisma.PrismaPromise<GetNotificationPrefsAggregateType<T>>

    /**
     * Group by NotificationPrefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationPrefsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationPrefsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationPrefsGroupByArgs['orderBy'] }
        : { orderBy?: NotificationPrefsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationPrefsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationPrefsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationPrefs model
   */
  readonly fields: NotificationPrefsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationPrefs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationPrefsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationPrefs model
   */ 
  interface NotificationPrefsFieldRefs {
    readonly user_id: FieldRef<"NotificationPrefs", 'String'>
    readonly email_enabled: FieldRef<"NotificationPrefs", 'Boolean'>
    readonly sms_enabled: FieldRef<"NotificationPrefs", 'Boolean'>
    readonly in_app_enabled: FieldRef<"NotificationPrefs", 'Boolean'>
    readonly transactions: FieldRef<"NotificationPrefs", 'Boolean'>
    readonly low_balance: FieldRef<"NotificationPrefs", 'Boolean'>
    readonly security: FieldRef<"NotificationPrefs", 'Boolean'>
    readonly low_balance_threshold: FieldRef<"NotificationPrefs", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * NotificationPrefs findUnique
   */
  export type NotificationPrefsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPrefs to fetch.
     */
    where: NotificationPrefsWhereUniqueInput
  }

  /**
   * NotificationPrefs findUniqueOrThrow
   */
  export type NotificationPrefsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPrefs to fetch.
     */
    where: NotificationPrefsWhereUniqueInput
  }

  /**
   * NotificationPrefs findFirst
   */
  export type NotificationPrefsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPrefs to fetch.
     */
    where?: NotificationPrefsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPrefs to fetch.
     */
    orderBy?: NotificationPrefsOrderByWithRelationInput | NotificationPrefsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPrefs.
     */
    cursor?: NotificationPrefsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPrefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPrefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPrefs.
     */
    distinct?: NotificationPrefsScalarFieldEnum | NotificationPrefsScalarFieldEnum[]
  }

  /**
   * NotificationPrefs findFirstOrThrow
   */
  export type NotificationPrefsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPrefs to fetch.
     */
    where?: NotificationPrefsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPrefs to fetch.
     */
    orderBy?: NotificationPrefsOrderByWithRelationInput | NotificationPrefsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationPrefs.
     */
    cursor?: NotificationPrefsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPrefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPrefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationPrefs.
     */
    distinct?: NotificationPrefsScalarFieldEnum | NotificationPrefsScalarFieldEnum[]
  }

  /**
   * NotificationPrefs findMany
   */
  export type NotificationPrefsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationPrefs to fetch.
     */
    where?: NotificationPrefsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationPrefs to fetch.
     */
    orderBy?: NotificationPrefsOrderByWithRelationInput | NotificationPrefsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationPrefs.
     */
    cursor?: NotificationPrefsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationPrefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationPrefs.
     */
    skip?: number
    distinct?: NotificationPrefsScalarFieldEnum | NotificationPrefsScalarFieldEnum[]
  }

  /**
   * NotificationPrefs create
   */
  export type NotificationPrefsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationPrefs.
     */
    data: XOR<NotificationPrefsCreateInput, NotificationPrefsUncheckedCreateInput>
  }

  /**
   * NotificationPrefs createMany
   */
  export type NotificationPrefsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationPrefs.
     */
    data: NotificationPrefsCreateManyInput | NotificationPrefsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationPrefs createManyAndReturn
   */
  export type NotificationPrefsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NotificationPrefs.
     */
    data: NotificationPrefsCreateManyInput | NotificationPrefsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationPrefs update
   */
  export type NotificationPrefsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationPrefs.
     */
    data: XOR<NotificationPrefsUpdateInput, NotificationPrefsUncheckedUpdateInput>
    /**
     * Choose, which NotificationPrefs to update.
     */
    where: NotificationPrefsWhereUniqueInput
  }

  /**
   * NotificationPrefs updateMany
   */
  export type NotificationPrefsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationPrefs.
     */
    data: XOR<NotificationPrefsUpdateManyMutationInput, NotificationPrefsUncheckedUpdateManyInput>
    /**
     * Filter which NotificationPrefs to update
     */
    where?: NotificationPrefsWhereInput
  }

  /**
   * NotificationPrefs upsert
   */
  export type NotificationPrefsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationPrefs to update in case it exists.
     */
    where: NotificationPrefsWhereUniqueInput
    /**
     * In case the NotificationPrefs found by the `where` argument doesn't exist, create a new NotificationPrefs with this data.
     */
    create: XOR<NotificationPrefsCreateInput, NotificationPrefsUncheckedCreateInput>
    /**
     * In case the NotificationPrefs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationPrefsUpdateInput, NotificationPrefsUncheckedUpdateInput>
  }

  /**
   * NotificationPrefs delete
   */
  export type NotificationPrefsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
    /**
     * Filter which NotificationPrefs to delete.
     */
    where: NotificationPrefsWhereUniqueInput
  }

  /**
   * NotificationPrefs deleteMany
   */
  export type NotificationPrefsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationPrefs to delete
     */
    where?: NotificationPrefsWhereInput
  }

  /**
   * NotificationPrefs without action
   */
  export type NotificationPrefsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationPrefs
     */
    select?: NotificationPrefsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationPrefsInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    action: string | null
    details: string | null
    performed_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    action: string | null
    details: string | null
    performed_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    user_id: number
    action: number
    details: number
    performed_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    details?: true
    performed_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    details?: true
    performed_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    details?: true
    performed_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    user_id: string
    action: string
    details: string | null
    performed_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    details?: boolean
    performed_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    details?: boolean
    performed_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    user_id?: boolean
    action?: boolean
    details?: boolean
    performed_at?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      action: string
      details: string | null
      performed_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly user_id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly performed_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    type: string | null
    title: string | null
    message: string | null
    read: boolean | null
    created_at: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    type: string | null
    title: string | null
    message: string | null
    read: boolean | null
    created_at: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    user_id: number
    type: number
    title: number
    message: number
    data: number
    read: number
    created_at: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    title?: true
    message?: true
    read?: true
    created_at?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    title?: true
    message?: true
    read?: true
    created_at?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    title?: true
    message?: true
    data?: true
    read?: true
    created_at?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    user_id: string
    type: string
    title: string
    message: string
    data: JsonValue | null
    read: boolean
    created_at: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    data?: boolean
    read?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    data?: boolean
    read?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    user_id?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    data?: boolean
    read?: boolean
    created_at?: boolean
  }


  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      type: string
      title: string
      message: string
      data: Prisma.JsonValue | null
      read: boolean
      created_at: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly user_id: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly data: FieldRef<"Notification", 'Json'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly created_at: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
  }


  /**
   * Model AdminInvite
   */

  export type AggregateAdminInvite = {
    _count: AdminInviteCountAggregateOutputType | null
    _min: AdminInviteMinAggregateOutputType | null
    _max: AdminInviteMaxAggregateOutputType | null
  }

  export type AdminInviteMinAggregateOutputType = {
    id: string | null
    token_hash: string | null
    email: string | null
    created_by: string | null
    created_at: Date | null
    expires_at: Date | null
    used: boolean | null
    used_at: Date | null
    used_by: string | null
    note: string | null
  }

  export type AdminInviteMaxAggregateOutputType = {
    id: string | null
    token_hash: string | null
    email: string | null
    created_by: string | null
    created_at: Date | null
    expires_at: Date | null
    used: boolean | null
    used_at: Date | null
    used_by: string | null
    note: string | null
  }

  export type AdminInviteCountAggregateOutputType = {
    id: number
    token_hash: number
    email: number
    created_by: number
    created_at: number
    expires_at: number
    used: number
    used_at: number
    used_by: number
    note: number
    _all: number
  }


  export type AdminInviteMinAggregateInputType = {
    id?: true
    token_hash?: true
    email?: true
    created_by?: true
    created_at?: true
    expires_at?: true
    used?: true
    used_at?: true
    used_by?: true
    note?: true
  }

  export type AdminInviteMaxAggregateInputType = {
    id?: true
    token_hash?: true
    email?: true
    created_by?: true
    created_at?: true
    expires_at?: true
    used?: true
    used_at?: true
    used_by?: true
    note?: true
  }

  export type AdminInviteCountAggregateInputType = {
    id?: true
    token_hash?: true
    email?: true
    created_by?: true
    created_at?: true
    expires_at?: true
    used?: true
    used_at?: true
    used_by?: true
    note?: true
    _all?: true
  }

  export type AdminInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminInvite to aggregate.
     */
    where?: AdminInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminInvites to fetch.
     */
    orderBy?: AdminInviteOrderByWithRelationInput | AdminInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminInvites
    **/
    _count?: true | AdminInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminInviteMaxAggregateInputType
  }

  export type GetAdminInviteAggregateType<T extends AdminInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminInvite[P]>
      : GetScalarType<T[P], AggregateAdminInvite[P]>
  }




  export type AdminInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminInviteWhereInput
    orderBy?: AdminInviteOrderByWithAggregationInput | AdminInviteOrderByWithAggregationInput[]
    by: AdminInviteScalarFieldEnum[] | AdminInviteScalarFieldEnum
    having?: AdminInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminInviteCountAggregateInputType | true
    _min?: AdminInviteMinAggregateInputType
    _max?: AdminInviteMaxAggregateInputType
  }

  export type AdminInviteGroupByOutputType = {
    id: string
    token_hash: string
    email: string
    created_by: string
    created_at: Date
    expires_at: Date
    used: boolean
    used_at: Date | null
    used_by: string | null
    note: string | null
    _count: AdminInviteCountAggregateOutputType | null
    _min: AdminInviteMinAggregateOutputType | null
    _max: AdminInviteMaxAggregateOutputType | null
  }

  type GetAdminInviteGroupByPayload<T extends AdminInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminInviteGroupByOutputType[P]>
            : GetScalarType<T[P], AdminInviteGroupByOutputType[P]>
        }
      >
    >


  export type AdminInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token_hash?: boolean
    email?: boolean
    created_by?: boolean
    created_at?: boolean
    expires_at?: boolean
    used?: boolean
    used_at?: boolean
    used_by?: boolean
    note?: boolean
  }, ExtArgs["result"]["adminInvite"]>

  export type AdminInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token_hash?: boolean
    email?: boolean
    created_by?: boolean
    created_at?: boolean
    expires_at?: boolean
    used?: boolean
    used_at?: boolean
    used_by?: boolean
    note?: boolean
  }, ExtArgs["result"]["adminInvite"]>

  export type AdminInviteSelectScalar = {
    id?: boolean
    token_hash?: boolean
    email?: boolean
    created_by?: boolean
    created_at?: boolean
    expires_at?: boolean
    used?: boolean
    used_at?: boolean
    used_by?: boolean
    note?: boolean
  }


  export type $AdminInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminInvite"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token_hash: string
      email: string
      created_by: string
      created_at: Date
      expires_at: Date
      used: boolean
      used_at: Date | null
      used_by: string | null
      note: string | null
    }, ExtArgs["result"]["adminInvite"]>
    composites: {}
  }

  type AdminInviteGetPayload<S extends boolean | null | undefined | AdminInviteDefaultArgs> = $Result.GetResult<Prisma.$AdminInvitePayload, S>

  type AdminInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminInviteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminInviteCountAggregateInputType | true
    }

  export interface AdminInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminInvite'], meta: { name: 'AdminInvite' } }
    /**
     * Find zero or one AdminInvite that matches the filter.
     * @param {AdminInviteFindUniqueArgs} args - Arguments to find a AdminInvite
     * @example
     * // Get one AdminInvite
     * const adminInvite = await prisma.adminInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminInviteFindUniqueArgs>(args: SelectSubset<T, AdminInviteFindUniqueArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminInvite that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminInviteFindUniqueOrThrowArgs} args - Arguments to find a AdminInvite
     * @example
     * // Get one AdminInvite
     * const adminInvite = await prisma.adminInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteFindFirstArgs} args - Arguments to find a AdminInvite
     * @example
     * // Get one AdminInvite
     * const adminInvite = await prisma.adminInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminInviteFindFirstArgs>(args?: SelectSubset<T, AdminInviteFindFirstArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteFindFirstOrThrowArgs} args - Arguments to find a AdminInvite
     * @example
     * // Get one AdminInvite
     * const adminInvite = await prisma.adminInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminInvites
     * const adminInvites = await prisma.adminInvite.findMany()
     * 
     * // Get first 10 AdminInvites
     * const adminInvites = await prisma.adminInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminInviteWithIdOnly = await prisma.adminInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminInviteFindManyArgs>(args?: SelectSubset<T, AdminInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminInvite.
     * @param {AdminInviteCreateArgs} args - Arguments to create a AdminInvite.
     * @example
     * // Create one AdminInvite
     * const AdminInvite = await prisma.adminInvite.create({
     *   data: {
     *     // ... data to create a AdminInvite
     *   }
     * })
     * 
     */
    create<T extends AdminInviteCreateArgs>(args: SelectSubset<T, AdminInviteCreateArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminInvites.
     * @param {AdminInviteCreateManyArgs} args - Arguments to create many AdminInvites.
     * @example
     * // Create many AdminInvites
     * const adminInvite = await prisma.adminInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminInviteCreateManyArgs>(args?: SelectSubset<T, AdminInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminInvites and returns the data saved in the database.
     * @param {AdminInviteCreateManyAndReturnArgs} args - Arguments to create many AdminInvites.
     * @example
     * // Create many AdminInvites
     * const adminInvite = await prisma.adminInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminInvites and only return the `id`
     * const adminInviteWithIdOnly = await prisma.adminInvite.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminInvite.
     * @param {AdminInviteDeleteArgs} args - Arguments to delete one AdminInvite.
     * @example
     * // Delete one AdminInvite
     * const AdminInvite = await prisma.adminInvite.delete({
     *   where: {
     *     // ... filter to delete one AdminInvite
     *   }
     * })
     * 
     */
    delete<T extends AdminInviteDeleteArgs>(args: SelectSubset<T, AdminInviteDeleteArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminInvite.
     * @param {AdminInviteUpdateArgs} args - Arguments to update one AdminInvite.
     * @example
     * // Update one AdminInvite
     * const adminInvite = await prisma.adminInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminInviteUpdateArgs>(args: SelectSubset<T, AdminInviteUpdateArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminInvites.
     * @param {AdminInviteDeleteManyArgs} args - Arguments to filter AdminInvites to delete.
     * @example
     * // Delete a few AdminInvites
     * const { count } = await prisma.adminInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminInviteDeleteManyArgs>(args?: SelectSubset<T, AdminInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminInvites
     * const adminInvite = await prisma.adminInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminInviteUpdateManyArgs>(args: SelectSubset<T, AdminInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminInvite.
     * @param {AdminInviteUpsertArgs} args - Arguments to update or create a AdminInvite.
     * @example
     * // Update or create a AdminInvite
     * const adminInvite = await prisma.adminInvite.upsert({
     *   create: {
     *     // ... data to create a AdminInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminInvite we want to update
     *   }
     * })
     */
    upsert<T extends AdminInviteUpsertArgs>(args: SelectSubset<T, AdminInviteUpsertArgs<ExtArgs>>): Prisma__AdminInviteClient<$Result.GetResult<Prisma.$AdminInvitePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteCountArgs} args - Arguments to filter AdminInvites to count.
     * @example
     * // Count the number of AdminInvites
     * const count = await prisma.adminInvite.count({
     *   where: {
     *     // ... the filter for the AdminInvites we want to count
     *   }
     * })
    **/
    count<T extends AdminInviteCountArgs>(
      args?: Subset<T, AdminInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminInviteAggregateArgs>(args: Subset<T, AdminInviteAggregateArgs>): Prisma.PrismaPromise<GetAdminInviteAggregateType<T>>

    /**
     * Group by AdminInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminInviteGroupByArgs['orderBy'] }
        : { orderBy?: AdminInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminInvite model
   */
  readonly fields: AdminInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminInvite model
   */ 
  interface AdminInviteFieldRefs {
    readonly id: FieldRef<"AdminInvite", 'String'>
    readonly token_hash: FieldRef<"AdminInvite", 'String'>
    readonly email: FieldRef<"AdminInvite", 'String'>
    readonly created_by: FieldRef<"AdminInvite", 'String'>
    readonly created_at: FieldRef<"AdminInvite", 'DateTime'>
    readonly expires_at: FieldRef<"AdminInvite", 'DateTime'>
    readonly used: FieldRef<"AdminInvite", 'Boolean'>
    readonly used_at: FieldRef<"AdminInvite", 'DateTime'>
    readonly used_by: FieldRef<"AdminInvite", 'String'>
    readonly note: FieldRef<"AdminInvite", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AdminInvite findUnique
   */
  export type AdminInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * Filter, which AdminInvite to fetch.
     */
    where: AdminInviteWhereUniqueInput
  }

  /**
   * AdminInvite findUniqueOrThrow
   */
  export type AdminInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * Filter, which AdminInvite to fetch.
     */
    where: AdminInviteWhereUniqueInput
  }

  /**
   * AdminInvite findFirst
   */
  export type AdminInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * Filter, which AdminInvite to fetch.
     */
    where?: AdminInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminInvites to fetch.
     */
    orderBy?: AdminInviteOrderByWithRelationInput | AdminInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminInvites.
     */
    cursor?: AdminInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminInvites.
     */
    distinct?: AdminInviteScalarFieldEnum | AdminInviteScalarFieldEnum[]
  }

  /**
   * AdminInvite findFirstOrThrow
   */
  export type AdminInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * Filter, which AdminInvite to fetch.
     */
    where?: AdminInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminInvites to fetch.
     */
    orderBy?: AdminInviteOrderByWithRelationInput | AdminInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminInvites.
     */
    cursor?: AdminInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminInvites.
     */
    distinct?: AdminInviteScalarFieldEnum | AdminInviteScalarFieldEnum[]
  }

  /**
   * AdminInvite findMany
   */
  export type AdminInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * Filter, which AdminInvites to fetch.
     */
    where?: AdminInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminInvites to fetch.
     */
    orderBy?: AdminInviteOrderByWithRelationInput | AdminInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminInvites.
     */
    cursor?: AdminInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminInvites.
     */
    skip?: number
    distinct?: AdminInviteScalarFieldEnum | AdminInviteScalarFieldEnum[]
  }

  /**
   * AdminInvite create
   */
  export type AdminInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * The data needed to create a AdminInvite.
     */
    data: XOR<AdminInviteCreateInput, AdminInviteUncheckedCreateInput>
  }

  /**
   * AdminInvite createMany
   */
  export type AdminInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminInvites.
     */
    data: AdminInviteCreateManyInput | AdminInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminInvite createManyAndReturn
   */
  export type AdminInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminInvites.
     */
    data: AdminInviteCreateManyInput | AdminInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminInvite update
   */
  export type AdminInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * The data needed to update a AdminInvite.
     */
    data: XOR<AdminInviteUpdateInput, AdminInviteUncheckedUpdateInput>
    /**
     * Choose, which AdminInvite to update.
     */
    where: AdminInviteWhereUniqueInput
  }

  /**
   * AdminInvite updateMany
   */
  export type AdminInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminInvites.
     */
    data: XOR<AdminInviteUpdateManyMutationInput, AdminInviteUncheckedUpdateManyInput>
    /**
     * Filter which AdminInvites to update
     */
    where?: AdminInviteWhereInput
  }

  /**
   * AdminInvite upsert
   */
  export type AdminInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * The filter to search for the AdminInvite to update in case it exists.
     */
    where: AdminInviteWhereUniqueInput
    /**
     * In case the AdminInvite found by the `where` argument doesn't exist, create a new AdminInvite with this data.
     */
    create: XOR<AdminInviteCreateInput, AdminInviteUncheckedCreateInput>
    /**
     * In case the AdminInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminInviteUpdateInput, AdminInviteUncheckedUpdateInput>
  }

  /**
   * AdminInvite delete
   */
  export type AdminInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
    /**
     * Filter which AdminInvite to delete.
     */
    where: AdminInviteWhereUniqueInput
  }

  /**
   * AdminInvite deleteMany
   */
  export type AdminInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminInvites to delete
     */
    where?: AdminInviteWhereInput
  }

  /**
   * AdminInvite without action
   */
  export type AdminInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminInvite
     */
    select?: AdminInviteSelect<ExtArgs> | null
  }


  /**
   * Model AdminApiKey
   */

  export type AggregateAdminApiKey = {
    _count: AdminApiKeyCountAggregateOutputType | null
    _min: AdminApiKeyMinAggregateOutputType | null
    _max: AdminApiKeyMaxAggregateOutputType | null
  }

  export type AdminApiKeyMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    key_hash: string | null
    name: string | null
    created_at: Date | null
    expires_at: Date | null
    revoked: boolean | null
  }

  export type AdminApiKeyMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    key_hash: string | null
    name: string | null
    created_at: Date | null
    expires_at: Date | null
    revoked: boolean | null
  }

  export type AdminApiKeyCountAggregateOutputType = {
    id: number
    user_id: number
    key_hash: number
    name: number
    created_at: number
    expires_at: number
    revoked: number
    _all: number
  }


  export type AdminApiKeyMinAggregateInputType = {
    id?: true
    user_id?: true
    key_hash?: true
    name?: true
    created_at?: true
    expires_at?: true
    revoked?: true
  }

  export type AdminApiKeyMaxAggregateInputType = {
    id?: true
    user_id?: true
    key_hash?: true
    name?: true
    created_at?: true
    expires_at?: true
    revoked?: true
  }

  export type AdminApiKeyCountAggregateInputType = {
    id?: true
    user_id?: true
    key_hash?: true
    name?: true
    created_at?: true
    expires_at?: true
    revoked?: true
    _all?: true
  }

  export type AdminApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminApiKey to aggregate.
     */
    where?: AdminApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminApiKeys to fetch.
     */
    orderBy?: AdminApiKeyOrderByWithRelationInput | AdminApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminApiKeys
    **/
    _count?: true | AdminApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminApiKeyMaxAggregateInputType
  }

  export type GetAdminApiKeyAggregateType<T extends AdminApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminApiKey[P]>
      : GetScalarType<T[P], AggregateAdminApiKey[P]>
  }




  export type AdminApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminApiKeyWhereInput
    orderBy?: AdminApiKeyOrderByWithAggregationInput | AdminApiKeyOrderByWithAggregationInput[]
    by: AdminApiKeyScalarFieldEnum[] | AdminApiKeyScalarFieldEnum
    having?: AdminApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminApiKeyCountAggregateInputType | true
    _min?: AdminApiKeyMinAggregateInputType
    _max?: AdminApiKeyMaxAggregateInputType
  }

  export type AdminApiKeyGroupByOutputType = {
    id: string
    user_id: string
    key_hash: string
    name: string | null
    created_at: Date
    expires_at: Date | null
    revoked: boolean
    _count: AdminApiKeyCountAggregateOutputType | null
    _min: AdminApiKeyMinAggregateOutputType | null
    _max: AdminApiKeyMaxAggregateOutputType | null
  }

  type GetAdminApiKeyGroupByPayload<T extends AdminApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], AdminApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type AdminApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    key_hash?: boolean
    name?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked?: boolean
  }, ExtArgs["result"]["adminApiKey"]>

  export type AdminApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    key_hash?: boolean
    name?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked?: boolean
  }, ExtArgs["result"]["adminApiKey"]>

  export type AdminApiKeySelectScalar = {
    id?: boolean
    user_id?: boolean
    key_hash?: boolean
    name?: boolean
    created_at?: boolean
    expires_at?: boolean
    revoked?: boolean
  }


  export type $AdminApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminApiKey"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      key_hash: string
      name: string | null
      created_at: Date
      expires_at: Date | null
      revoked: boolean
    }, ExtArgs["result"]["adminApiKey"]>
    composites: {}
  }

  type AdminApiKeyGetPayload<S extends boolean | null | undefined | AdminApiKeyDefaultArgs> = $Result.GetResult<Prisma.$AdminApiKeyPayload, S>

  type AdminApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminApiKeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminApiKeyCountAggregateInputType | true
    }

  export interface AdminApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminApiKey'], meta: { name: 'AdminApiKey' } }
    /**
     * Find zero or one AdminApiKey that matches the filter.
     * @param {AdminApiKeyFindUniqueArgs} args - Arguments to find a AdminApiKey
     * @example
     * // Get one AdminApiKey
     * const adminApiKey = await prisma.adminApiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminApiKeyFindUniqueArgs>(args: SelectSubset<T, AdminApiKeyFindUniqueArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminApiKey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminApiKeyFindUniqueOrThrowArgs} args - Arguments to find a AdminApiKey
     * @example
     * // Get one AdminApiKey
     * const adminApiKey = await prisma.adminApiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyFindFirstArgs} args - Arguments to find a AdminApiKey
     * @example
     * // Get one AdminApiKey
     * const adminApiKey = await prisma.adminApiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminApiKeyFindFirstArgs>(args?: SelectSubset<T, AdminApiKeyFindFirstArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyFindFirstOrThrowArgs} args - Arguments to find a AdminApiKey
     * @example
     * // Get one AdminApiKey
     * const adminApiKey = await prisma.adminApiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminApiKeys
     * const adminApiKeys = await prisma.adminApiKey.findMany()
     * 
     * // Get first 10 AdminApiKeys
     * const adminApiKeys = await prisma.adminApiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminApiKeyWithIdOnly = await prisma.adminApiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminApiKeyFindManyArgs>(args?: SelectSubset<T, AdminApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminApiKey.
     * @param {AdminApiKeyCreateArgs} args - Arguments to create a AdminApiKey.
     * @example
     * // Create one AdminApiKey
     * const AdminApiKey = await prisma.adminApiKey.create({
     *   data: {
     *     // ... data to create a AdminApiKey
     *   }
     * })
     * 
     */
    create<T extends AdminApiKeyCreateArgs>(args: SelectSubset<T, AdminApiKeyCreateArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminApiKeys.
     * @param {AdminApiKeyCreateManyArgs} args - Arguments to create many AdminApiKeys.
     * @example
     * // Create many AdminApiKeys
     * const adminApiKey = await prisma.adminApiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminApiKeyCreateManyArgs>(args?: SelectSubset<T, AdminApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminApiKeys and returns the data saved in the database.
     * @param {AdminApiKeyCreateManyAndReturnArgs} args - Arguments to create many AdminApiKeys.
     * @example
     * // Create many AdminApiKeys
     * const adminApiKey = await prisma.adminApiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminApiKeys and only return the `id`
     * const adminApiKeyWithIdOnly = await prisma.adminApiKey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminApiKey.
     * @param {AdminApiKeyDeleteArgs} args - Arguments to delete one AdminApiKey.
     * @example
     * // Delete one AdminApiKey
     * const AdminApiKey = await prisma.adminApiKey.delete({
     *   where: {
     *     // ... filter to delete one AdminApiKey
     *   }
     * })
     * 
     */
    delete<T extends AdminApiKeyDeleteArgs>(args: SelectSubset<T, AdminApiKeyDeleteArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminApiKey.
     * @param {AdminApiKeyUpdateArgs} args - Arguments to update one AdminApiKey.
     * @example
     * // Update one AdminApiKey
     * const adminApiKey = await prisma.adminApiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminApiKeyUpdateArgs>(args: SelectSubset<T, AdminApiKeyUpdateArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminApiKeys.
     * @param {AdminApiKeyDeleteManyArgs} args - Arguments to filter AdminApiKeys to delete.
     * @example
     * // Delete a few AdminApiKeys
     * const { count } = await prisma.adminApiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminApiKeyDeleteManyArgs>(args?: SelectSubset<T, AdminApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminApiKeys
     * const adminApiKey = await prisma.adminApiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminApiKeyUpdateManyArgs>(args: SelectSubset<T, AdminApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminApiKey.
     * @param {AdminApiKeyUpsertArgs} args - Arguments to update or create a AdminApiKey.
     * @example
     * // Update or create a AdminApiKey
     * const adminApiKey = await prisma.adminApiKey.upsert({
     *   create: {
     *     // ... data to create a AdminApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminApiKey we want to update
     *   }
     * })
     */
    upsert<T extends AdminApiKeyUpsertArgs>(args: SelectSubset<T, AdminApiKeyUpsertArgs<ExtArgs>>): Prisma__AdminApiKeyClient<$Result.GetResult<Prisma.$AdminApiKeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyCountArgs} args - Arguments to filter AdminApiKeys to count.
     * @example
     * // Count the number of AdminApiKeys
     * const count = await prisma.adminApiKey.count({
     *   where: {
     *     // ... the filter for the AdminApiKeys we want to count
     *   }
     * })
    **/
    count<T extends AdminApiKeyCountArgs>(
      args?: Subset<T, AdminApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminApiKeyAggregateArgs>(args: Subset<T, AdminApiKeyAggregateArgs>): Prisma.PrismaPromise<GetAdminApiKeyAggregateType<T>>

    /**
     * Group by AdminApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: AdminApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminApiKey model
   */
  readonly fields: AdminApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminApiKey model
   */ 
  interface AdminApiKeyFieldRefs {
    readonly id: FieldRef<"AdminApiKey", 'String'>
    readonly user_id: FieldRef<"AdminApiKey", 'String'>
    readonly key_hash: FieldRef<"AdminApiKey", 'String'>
    readonly name: FieldRef<"AdminApiKey", 'String'>
    readonly created_at: FieldRef<"AdminApiKey", 'DateTime'>
    readonly expires_at: FieldRef<"AdminApiKey", 'DateTime'>
    readonly revoked: FieldRef<"AdminApiKey", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AdminApiKey findUnique
   */
  export type AdminApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * Filter, which AdminApiKey to fetch.
     */
    where: AdminApiKeyWhereUniqueInput
  }

  /**
   * AdminApiKey findUniqueOrThrow
   */
  export type AdminApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * Filter, which AdminApiKey to fetch.
     */
    where: AdminApiKeyWhereUniqueInput
  }

  /**
   * AdminApiKey findFirst
   */
  export type AdminApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * Filter, which AdminApiKey to fetch.
     */
    where?: AdminApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminApiKeys to fetch.
     */
    orderBy?: AdminApiKeyOrderByWithRelationInput | AdminApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminApiKeys.
     */
    cursor?: AdminApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminApiKeys.
     */
    distinct?: AdminApiKeyScalarFieldEnum | AdminApiKeyScalarFieldEnum[]
  }

  /**
   * AdminApiKey findFirstOrThrow
   */
  export type AdminApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * Filter, which AdminApiKey to fetch.
     */
    where?: AdminApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminApiKeys to fetch.
     */
    orderBy?: AdminApiKeyOrderByWithRelationInput | AdminApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminApiKeys.
     */
    cursor?: AdminApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminApiKeys.
     */
    distinct?: AdminApiKeyScalarFieldEnum | AdminApiKeyScalarFieldEnum[]
  }

  /**
   * AdminApiKey findMany
   */
  export type AdminApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * Filter, which AdminApiKeys to fetch.
     */
    where?: AdminApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminApiKeys to fetch.
     */
    orderBy?: AdminApiKeyOrderByWithRelationInput | AdminApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminApiKeys.
     */
    cursor?: AdminApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminApiKeys.
     */
    skip?: number
    distinct?: AdminApiKeyScalarFieldEnum | AdminApiKeyScalarFieldEnum[]
  }

  /**
   * AdminApiKey create
   */
  export type AdminApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * The data needed to create a AdminApiKey.
     */
    data: XOR<AdminApiKeyCreateInput, AdminApiKeyUncheckedCreateInput>
  }

  /**
   * AdminApiKey createMany
   */
  export type AdminApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminApiKeys.
     */
    data: AdminApiKeyCreateManyInput | AdminApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminApiKey createManyAndReturn
   */
  export type AdminApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminApiKeys.
     */
    data: AdminApiKeyCreateManyInput | AdminApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminApiKey update
   */
  export type AdminApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * The data needed to update a AdminApiKey.
     */
    data: XOR<AdminApiKeyUpdateInput, AdminApiKeyUncheckedUpdateInput>
    /**
     * Choose, which AdminApiKey to update.
     */
    where: AdminApiKeyWhereUniqueInput
  }

  /**
   * AdminApiKey updateMany
   */
  export type AdminApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminApiKeys.
     */
    data: XOR<AdminApiKeyUpdateManyMutationInput, AdminApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which AdminApiKeys to update
     */
    where?: AdminApiKeyWhereInput
  }

  /**
   * AdminApiKey upsert
   */
  export type AdminApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * The filter to search for the AdminApiKey to update in case it exists.
     */
    where: AdminApiKeyWhereUniqueInput
    /**
     * In case the AdminApiKey found by the `where` argument doesn't exist, create a new AdminApiKey with this data.
     */
    create: XOR<AdminApiKeyCreateInput, AdminApiKeyUncheckedCreateInput>
    /**
     * In case the AdminApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminApiKeyUpdateInput, AdminApiKeyUncheckedUpdateInput>
  }

  /**
   * AdminApiKey delete
   */
  export type AdminApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
    /**
     * Filter which AdminApiKey to delete.
     */
    where: AdminApiKeyWhereUniqueInput
  }

  /**
   * AdminApiKey deleteMany
   */
  export type AdminApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminApiKeys to delete
     */
    where?: AdminApiKeyWhereInput
  }

  /**
   * AdminApiKey without action
   */
  export type AdminApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminApiKey
     */
    select?: AdminApiKeySelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone_number: 'phone_number',
    password_hash: 'password_hash',
    role: 'role',
    status: 'status',
    refresh_token_hash: 'refresh_token_hash',
    refresh_token_expires: 'refresh_token_expires',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token_hash: 'token_hash',
    user_agent: 'user_agent',
    ip: 'ip',
    created_at: 'created_at',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const UserMfaScalarFieldEnum: {
    user_id: 'user_id',
    type: 'type',
    secret_encrypted: 'secret_encrypted',
    enabled: 'enabled',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserMfaScalarFieldEnum = (typeof UserMfaScalarFieldEnum)[keyof typeof UserMfaScalarFieldEnum]


  export const UserMfaBackupCodeScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    code_hash: 'code_hash',
    used_at: 'used_at'
  };

  export type UserMfaBackupCodeScalarFieldEnum = (typeof UserMfaBackupCodeScalarFieldEnum)[keyof typeof UserMfaBackupCodeScalarFieldEnum]


  export const KycDetailsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    document_type: 'document_type',
    document_number: 'document_number',
    issue_date: 'issue_date',
    expiry_date: 'expiry_date',
    verified: 'verified',
    status: 'status',
    verification_score: 'verification_score',
    failure_reason: 'failure_reason',
    created_at: 'created_at'
  };

  export type KycDetailsScalarFieldEnum = (typeof KycDetailsScalarFieldEnum)[keyof typeof KycDetailsScalarFieldEnum]


  export const KycDocumentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    doc_kind: 'doc_kind',
    file_url: 'file_url',
    file_hash: 'file_hash',
    created_at: 'created_at'
  };

  export type KycDocumentScalarFieldEnum = (typeof KycDocumentScalarFieldEnum)[keyof typeof KycDocumentScalarFieldEnum]


  export const NotificationPrefsScalarFieldEnum: {
    user_id: 'user_id',
    email_enabled: 'email_enabled',
    sms_enabled: 'sms_enabled',
    in_app_enabled: 'in_app_enabled',
    transactions: 'transactions',
    low_balance: 'low_balance',
    security: 'security',
    low_balance_threshold: 'low_balance_threshold'
  };

  export type NotificationPrefsScalarFieldEnum = (typeof NotificationPrefsScalarFieldEnum)[keyof typeof NotificationPrefsScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    action: 'action',
    details: 'details',
    performed_at: 'performed_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    type: 'type',
    title: 'title',
    message: 'message',
    data: 'data',
    read: 'read',
    created_at: 'created_at'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AdminInviteScalarFieldEnum: {
    id: 'id',
    token_hash: 'token_hash',
    email: 'email',
    created_by: 'created_by',
    created_at: 'created_at',
    expires_at: 'expires_at',
    used: 'used',
    used_at: 'used_at',
    used_by: 'used_by',
    note: 'note'
  };

  export type AdminInviteScalarFieldEnum = (typeof AdminInviteScalarFieldEnum)[keyof typeof AdminInviteScalarFieldEnum]


  export const AdminApiKeyScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    key_hash: 'key_hash',
    name: 'name',
    created_at: 'created_at',
    expires_at: 'expires_at',
    revoked: 'revoked'
  };

  export type AdminApiKeyScalarFieldEnum = (typeof AdminApiKeyScalarFieldEnum)[keyof typeof AdminApiKeyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone_number?: StringNullableFilter<"User"> | string | null
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    refresh_token_hash?: StringNullableFilter<"User"> | string | null
    refresh_token_expires?: DateTimeNullableFilter<"User"> | Date | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    mfa?: XOR<UserMfaNullableRelationFilter, UserMfaWhereInput> | null
    backupCodes?: UserMfaBackupCodeListRelationFilter
    kyc?: XOR<KycDetailsNullableRelationFilter, KycDetailsWhereInput> | null
    kycDocuments?: KycDocumentListRelationFilter
    notificationPrefs?: XOR<NotificationPrefsNullableRelationFilter, NotificationPrefsWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    refresh_token_hash?: SortOrderInput | SortOrder
    refresh_token_expires?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    mfa?: UserMfaOrderByWithRelationInput
    backupCodes?: UserMfaBackupCodeOrderByRelationAggregateInput
    kyc?: KycDetailsOrderByWithRelationInput
    kycDocuments?: KycDocumentOrderByRelationAggregateInput
    notificationPrefs?: NotificationPrefsOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    phone_number?: StringNullableFilter<"User"> | string | null
    password_hash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    refresh_token_hash?: StringNullableFilter<"User"> | string | null
    refresh_token_expires?: DateTimeNullableFilter<"User"> | Date | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    mfa?: XOR<UserMfaNullableRelationFilter, UserMfaWhereInput> | null
    backupCodes?: UserMfaBackupCodeListRelationFilter
    kyc?: XOR<KycDetailsNullableRelationFilter, KycDetailsWhereInput> | null
    kycDocuments?: KycDocumentListRelationFilter
    notificationPrefs?: XOR<NotificationPrefsNullableRelationFilter, NotificationPrefsWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    refresh_token_hash?: SortOrderInput | SortOrder
    refresh_token_expires?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone_number?: StringNullableWithAggregatesFilter<"User"> | string | null
    password_hash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    refresh_token_hash?: StringNullableWithAggregatesFilter<"User"> | string | null
    refresh_token_expires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    user_id?: UuidFilter<"RefreshToken"> | string
    token_hash?: StringFilter<"RefreshToken"> | string
    user_agent?: StringNullableFilter<"RefreshToken"> | string | null
    ip?: StringNullableFilter<"RefreshToken"> | string | null
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token_hash?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    user_id?: UuidFilter<"RefreshToken"> | string
    user_agent?: StringNullableFilter<"RefreshToken"> | string | null
    ip?: StringNullableFilter<"RefreshToken"> | string | null
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token_hash">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RefreshToken"> | string
    user_id?: UuidWithAggregatesFilter<"RefreshToken"> | string
    token_hash?: StringWithAggregatesFilter<"RefreshToken"> | string
    user_agent?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    ip?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
  }

  export type UserMfaWhereInput = {
    AND?: UserMfaWhereInput | UserMfaWhereInput[]
    OR?: UserMfaWhereInput[]
    NOT?: UserMfaWhereInput | UserMfaWhereInput[]
    user_id?: UuidFilter<"UserMfa"> | string
    type?: StringFilter<"UserMfa"> | string
    secret_encrypted?: StringFilter<"UserMfa"> | string
    enabled?: BoolFilter<"UserMfa"> | boolean
    created_at?: DateTimeFilter<"UserMfa"> | Date | string
    updated_at?: DateTimeFilter<"UserMfa"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserMfaOrderByWithRelationInput = {
    user_id?: SortOrder
    type?: SortOrder
    secret_encrypted?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserMfaWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: UserMfaWhereInput | UserMfaWhereInput[]
    OR?: UserMfaWhereInput[]
    NOT?: UserMfaWhereInput | UserMfaWhereInput[]
    type?: StringFilter<"UserMfa"> | string
    secret_encrypted?: StringFilter<"UserMfa"> | string
    enabled?: BoolFilter<"UserMfa"> | boolean
    created_at?: DateTimeFilter<"UserMfa"> | Date | string
    updated_at?: DateTimeFilter<"UserMfa"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "user_id">

  export type UserMfaOrderByWithAggregationInput = {
    user_id?: SortOrder
    type?: SortOrder
    secret_encrypted?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserMfaCountOrderByAggregateInput
    _max?: UserMfaMaxOrderByAggregateInput
    _min?: UserMfaMinOrderByAggregateInput
  }

  export type UserMfaScalarWhereWithAggregatesInput = {
    AND?: UserMfaScalarWhereWithAggregatesInput | UserMfaScalarWhereWithAggregatesInput[]
    OR?: UserMfaScalarWhereWithAggregatesInput[]
    NOT?: UserMfaScalarWhereWithAggregatesInput | UserMfaScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"UserMfa"> | string
    type?: StringWithAggregatesFilter<"UserMfa"> | string
    secret_encrypted?: StringWithAggregatesFilter<"UserMfa"> | string
    enabled?: BoolWithAggregatesFilter<"UserMfa"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"UserMfa"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserMfa"> | Date | string
  }

  export type UserMfaBackupCodeWhereInput = {
    AND?: UserMfaBackupCodeWhereInput | UserMfaBackupCodeWhereInput[]
    OR?: UserMfaBackupCodeWhereInput[]
    NOT?: UserMfaBackupCodeWhereInput | UserMfaBackupCodeWhereInput[]
    id?: UuidFilter<"UserMfaBackupCode"> | string
    user_id?: UuidFilter<"UserMfaBackupCode"> | string
    code_hash?: StringFilter<"UserMfaBackupCode"> | string
    used_at?: DateTimeNullableFilter<"UserMfaBackupCode"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserMfaBackupCodeOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    code_hash?: SortOrder
    used_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserMfaBackupCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserMfaBackupCodeWhereInput | UserMfaBackupCodeWhereInput[]
    OR?: UserMfaBackupCodeWhereInput[]
    NOT?: UserMfaBackupCodeWhereInput | UserMfaBackupCodeWhereInput[]
    user_id?: UuidFilter<"UserMfaBackupCode"> | string
    code_hash?: StringFilter<"UserMfaBackupCode"> | string
    used_at?: DateTimeNullableFilter<"UserMfaBackupCode"> | Date | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type UserMfaBackupCodeOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    code_hash?: SortOrder
    used_at?: SortOrderInput | SortOrder
    _count?: UserMfaBackupCodeCountOrderByAggregateInput
    _max?: UserMfaBackupCodeMaxOrderByAggregateInput
    _min?: UserMfaBackupCodeMinOrderByAggregateInput
  }

  export type UserMfaBackupCodeScalarWhereWithAggregatesInput = {
    AND?: UserMfaBackupCodeScalarWhereWithAggregatesInput | UserMfaBackupCodeScalarWhereWithAggregatesInput[]
    OR?: UserMfaBackupCodeScalarWhereWithAggregatesInput[]
    NOT?: UserMfaBackupCodeScalarWhereWithAggregatesInput | UserMfaBackupCodeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserMfaBackupCode"> | string
    user_id?: UuidWithAggregatesFilter<"UserMfaBackupCode"> | string
    code_hash?: StringWithAggregatesFilter<"UserMfaBackupCode"> | string
    used_at?: DateTimeNullableWithAggregatesFilter<"UserMfaBackupCode"> | Date | string | null
  }

  export type KycDetailsWhereInput = {
    AND?: KycDetailsWhereInput | KycDetailsWhereInput[]
    OR?: KycDetailsWhereInput[]
    NOT?: KycDetailsWhereInput | KycDetailsWhereInput[]
    id?: UuidFilter<"KycDetails"> | string
    user_id?: UuidFilter<"KycDetails"> | string
    document_type?: StringNullableFilter<"KycDetails"> | string | null
    document_number?: StringNullableFilter<"KycDetails"> | string | null
    issue_date?: DateTimeNullableFilter<"KycDetails"> | Date | string | null
    expiry_date?: DateTimeNullableFilter<"KycDetails"> | Date | string | null
    verified?: BoolFilter<"KycDetails"> | boolean
    status?: StringFilter<"KycDetails"> | string
    verification_score?: FloatNullableFilter<"KycDetails"> | number | null
    failure_reason?: StringNullableFilter<"KycDetails"> | string | null
    created_at?: DateTimeFilter<"KycDetails"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type KycDetailsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrderInput | SortOrder
    document_number?: SortOrderInput | SortOrder
    issue_date?: SortOrderInput | SortOrder
    expiry_date?: SortOrderInput | SortOrder
    verified?: SortOrder
    status?: SortOrder
    verification_score?: SortOrderInput | SortOrder
    failure_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type KycDetailsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: KycDetailsWhereInput | KycDetailsWhereInput[]
    OR?: KycDetailsWhereInput[]
    NOT?: KycDetailsWhereInput | KycDetailsWhereInput[]
    document_type?: StringNullableFilter<"KycDetails"> | string | null
    document_number?: StringNullableFilter<"KycDetails"> | string | null
    issue_date?: DateTimeNullableFilter<"KycDetails"> | Date | string | null
    expiry_date?: DateTimeNullableFilter<"KycDetails"> | Date | string | null
    verified?: BoolFilter<"KycDetails"> | boolean
    status?: StringFilter<"KycDetails"> | string
    verification_score?: FloatNullableFilter<"KycDetails"> | number | null
    failure_reason?: StringNullableFilter<"KycDetails"> | string | null
    created_at?: DateTimeFilter<"KycDetails"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "user_id">

  export type KycDetailsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrderInput | SortOrder
    document_number?: SortOrderInput | SortOrder
    issue_date?: SortOrderInput | SortOrder
    expiry_date?: SortOrderInput | SortOrder
    verified?: SortOrder
    status?: SortOrder
    verification_score?: SortOrderInput | SortOrder
    failure_reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: KycDetailsCountOrderByAggregateInput
    _avg?: KycDetailsAvgOrderByAggregateInput
    _max?: KycDetailsMaxOrderByAggregateInput
    _min?: KycDetailsMinOrderByAggregateInput
    _sum?: KycDetailsSumOrderByAggregateInput
  }

  export type KycDetailsScalarWhereWithAggregatesInput = {
    AND?: KycDetailsScalarWhereWithAggregatesInput | KycDetailsScalarWhereWithAggregatesInput[]
    OR?: KycDetailsScalarWhereWithAggregatesInput[]
    NOT?: KycDetailsScalarWhereWithAggregatesInput | KycDetailsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"KycDetails"> | string
    user_id?: UuidWithAggregatesFilter<"KycDetails"> | string
    document_type?: StringNullableWithAggregatesFilter<"KycDetails"> | string | null
    document_number?: StringNullableWithAggregatesFilter<"KycDetails"> | string | null
    issue_date?: DateTimeNullableWithAggregatesFilter<"KycDetails"> | Date | string | null
    expiry_date?: DateTimeNullableWithAggregatesFilter<"KycDetails"> | Date | string | null
    verified?: BoolWithAggregatesFilter<"KycDetails"> | boolean
    status?: StringWithAggregatesFilter<"KycDetails"> | string
    verification_score?: FloatNullableWithAggregatesFilter<"KycDetails"> | number | null
    failure_reason?: StringNullableWithAggregatesFilter<"KycDetails"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"KycDetails"> | Date | string
  }

  export type KycDocumentWhereInput = {
    AND?: KycDocumentWhereInput | KycDocumentWhereInput[]
    OR?: KycDocumentWhereInput[]
    NOT?: KycDocumentWhereInput | KycDocumentWhereInput[]
    id?: UuidFilter<"KycDocument"> | string
    user_id?: UuidFilter<"KycDocument"> | string
    doc_kind?: StringFilter<"KycDocument"> | string
    file_url?: StringFilter<"KycDocument"> | string
    file_hash?: StringNullableFilter<"KycDocument"> | string | null
    created_at?: DateTimeFilter<"KycDocument"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type KycDocumentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    doc_kind?: SortOrder
    file_url?: SortOrder
    file_hash?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type KycDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KycDocumentWhereInput | KycDocumentWhereInput[]
    OR?: KycDocumentWhereInput[]
    NOT?: KycDocumentWhereInput | KycDocumentWhereInput[]
    user_id?: UuidFilter<"KycDocument"> | string
    doc_kind?: StringFilter<"KycDocument"> | string
    file_url?: StringFilter<"KycDocument"> | string
    file_hash?: StringNullableFilter<"KycDocument"> | string | null
    created_at?: DateTimeFilter<"KycDocument"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type KycDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    doc_kind?: SortOrder
    file_url?: SortOrder
    file_hash?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: KycDocumentCountOrderByAggregateInput
    _max?: KycDocumentMaxOrderByAggregateInput
    _min?: KycDocumentMinOrderByAggregateInput
  }

  export type KycDocumentScalarWhereWithAggregatesInput = {
    AND?: KycDocumentScalarWhereWithAggregatesInput | KycDocumentScalarWhereWithAggregatesInput[]
    OR?: KycDocumentScalarWhereWithAggregatesInput[]
    NOT?: KycDocumentScalarWhereWithAggregatesInput | KycDocumentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"KycDocument"> | string
    user_id?: UuidWithAggregatesFilter<"KycDocument"> | string
    doc_kind?: StringWithAggregatesFilter<"KycDocument"> | string
    file_url?: StringWithAggregatesFilter<"KycDocument"> | string
    file_hash?: StringNullableWithAggregatesFilter<"KycDocument"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"KycDocument"> | Date | string
  }

  export type NotificationPrefsWhereInput = {
    AND?: NotificationPrefsWhereInput | NotificationPrefsWhereInput[]
    OR?: NotificationPrefsWhereInput[]
    NOT?: NotificationPrefsWhereInput | NotificationPrefsWhereInput[]
    user_id?: UuidFilter<"NotificationPrefs"> | string
    email_enabled?: BoolFilter<"NotificationPrefs"> | boolean
    sms_enabled?: BoolFilter<"NotificationPrefs"> | boolean
    in_app_enabled?: BoolFilter<"NotificationPrefs"> | boolean
    transactions?: BoolFilter<"NotificationPrefs"> | boolean
    low_balance?: BoolFilter<"NotificationPrefs"> | boolean
    security?: BoolFilter<"NotificationPrefs"> | boolean
    low_balance_threshold?: DecimalFilter<"NotificationPrefs"> | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationPrefsOrderByWithRelationInput = {
    user_id?: SortOrder
    email_enabled?: SortOrder
    sms_enabled?: SortOrder
    in_app_enabled?: SortOrder
    transactions?: SortOrder
    low_balance?: SortOrder
    security?: SortOrder
    low_balance_threshold?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationPrefsWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: NotificationPrefsWhereInput | NotificationPrefsWhereInput[]
    OR?: NotificationPrefsWhereInput[]
    NOT?: NotificationPrefsWhereInput | NotificationPrefsWhereInput[]
    email_enabled?: BoolFilter<"NotificationPrefs"> | boolean
    sms_enabled?: BoolFilter<"NotificationPrefs"> | boolean
    in_app_enabled?: BoolFilter<"NotificationPrefs"> | boolean
    transactions?: BoolFilter<"NotificationPrefs"> | boolean
    low_balance?: BoolFilter<"NotificationPrefs"> | boolean
    security?: BoolFilter<"NotificationPrefs"> | boolean
    low_balance_threshold?: DecimalFilter<"NotificationPrefs"> | Decimal | DecimalJsLike | number | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "user_id">

  export type NotificationPrefsOrderByWithAggregationInput = {
    user_id?: SortOrder
    email_enabled?: SortOrder
    sms_enabled?: SortOrder
    in_app_enabled?: SortOrder
    transactions?: SortOrder
    low_balance?: SortOrder
    security?: SortOrder
    low_balance_threshold?: SortOrder
    _count?: NotificationPrefsCountOrderByAggregateInput
    _avg?: NotificationPrefsAvgOrderByAggregateInput
    _max?: NotificationPrefsMaxOrderByAggregateInput
    _min?: NotificationPrefsMinOrderByAggregateInput
    _sum?: NotificationPrefsSumOrderByAggregateInput
  }

  export type NotificationPrefsScalarWhereWithAggregatesInput = {
    AND?: NotificationPrefsScalarWhereWithAggregatesInput | NotificationPrefsScalarWhereWithAggregatesInput[]
    OR?: NotificationPrefsScalarWhereWithAggregatesInput[]
    NOT?: NotificationPrefsScalarWhereWithAggregatesInput | NotificationPrefsScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"NotificationPrefs"> | string
    email_enabled?: BoolWithAggregatesFilter<"NotificationPrefs"> | boolean
    sms_enabled?: BoolWithAggregatesFilter<"NotificationPrefs"> | boolean
    in_app_enabled?: BoolWithAggregatesFilter<"NotificationPrefs"> | boolean
    transactions?: BoolWithAggregatesFilter<"NotificationPrefs"> | boolean
    low_balance?: BoolWithAggregatesFilter<"NotificationPrefs"> | boolean
    security?: BoolWithAggregatesFilter<"NotificationPrefs"> | boolean
    low_balance_threshold?: DecimalWithAggregatesFilter<"NotificationPrefs"> | Decimal | DecimalJsLike | number | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    user_id?: UuidFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    performed_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    performed_at?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    user_id?: UuidFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    performed_at?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    performed_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    user_id?: UuidWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    performed_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: UuidFilter<"Notification"> | string
    user_id?: UuidFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    read?: BoolFilter<"Notification"> | boolean
    created_at?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    data?: SortOrderInput | SortOrder
    read?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    user_id?: UuidFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    read?: BoolFilter<"Notification"> | boolean
    created_at?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    data?: SortOrderInput | SortOrder
    read?: SortOrder
    created_at?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Notification"> | string
    user_id?: UuidWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    data?: JsonNullableWithAggregatesFilter<"Notification">
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AdminInviteWhereInput = {
    AND?: AdminInviteWhereInput | AdminInviteWhereInput[]
    OR?: AdminInviteWhereInput[]
    NOT?: AdminInviteWhereInput | AdminInviteWhereInput[]
    id?: UuidFilter<"AdminInvite"> | string
    token_hash?: StringFilter<"AdminInvite"> | string
    email?: StringFilter<"AdminInvite"> | string
    created_by?: UuidFilter<"AdminInvite"> | string
    created_at?: DateTimeFilter<"AdminInvite"> | Date | string
    expires_at?: DateTimeFilter<"AdminInvite"> | Date | string
    used?: BoolFilter<"AdminInvite"> | boolean
    used_at?: DateTimeNullableFilter<"AdminInvite"> | Date | string | null
    used_by?: UuidNullableFilter<"AdminInvite"> | string | null
    note?: StringNullableFilter<"AdminInvite"> | string | null
  }

  export type AdminInviteOrderByWithRelationInput = {
    id?: SortOrder
    token_hash?: SortOrder
    email?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    used_at?: SortOrderInput | SortOrder
    used_by?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
  }

  export type AdminInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminInviteWhereInput | AdminInviteWhereInput[]
    OR?: AdminInviteWhereInput[]
    NOT?: AdminInviteWhereInput | AdminInviteWhereInput[]
    token_hash?: StringFilter<"AdminInvite"> | string
    email?: StringFilter<"AdminInvite"> | string
    created_by?: UuidFilter<"AdminInvite"> | string
    created_at?: DateTimeFilter<"AdminInvite"> | Date | string
    expires_at?: DateTimeFilter<"AdminInvite"> | Date | string
    used?: BoolFilter<"AdminInvite"> | boolean
    used_at?: DateTimeNullableFilter<"AdminInvite"> | Date | string | null
    used_by?: UuidNullableFilter<"AdminInvite"> | string | null
    note?: StringNullableFilter<"AdminInvite"> | string | null
  }, "id">

  export type AdminInviteOrderByWithAggregationInput = {
    id?: SortOrder
    token_hash?: SortOrder
    email?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    used_at?: SortOrderInput | SortOrder
    used_by?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    _count?: AdminInviteCountOrderByAggregateInput
    _max?: AdminInviteMaxOrderByAggregateInput
    _min?: AdminInviteMinOrderByAggregateInput
  }

  export type AdminInviteScalarWhereWithAggregatesInput = {
    AND?: AdminInviteScalarWhereWithAggregatesInput | AdminInviteScalarWhereWithAggregatesInput[]
    OR?: AdminInviteScalarWhereWithAggregatesInput[]
    NOT?: AdminInviteScalarWhereWithAggregatesInput | AdminInviteScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AdminInvite"> | string
    token_hash?: StringWithAggregatesFilter<"AdminInvite"> | string
    email?: StringWithAggregatesFilter<"AdminInvite"> | string
    created_by?: UuidWithAggregatesFilter<"AdminInvite"> | string
    created_at?: DateTimeWithAggregatesFilter<"AdminInvite"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"AdminInvite"> | Date | string
    used?: BoolWithAggregatesFilter<"AdminInvite"> | boolean
    used_at?: DateTimeNullableWithAggregatesFilter<"AdminInvite"> | Date | string | null
    used_by?: UuidNullableWithAggregatesFilter<"AdminInvite"> | string | null
    note?: StringNullableWithAggregatesFilter<"AdminInvite"> | string | null
  }

  export type AdminApiKeyWhereInput = {
    AND?: AdminApiKeyWhereInput | AdminApiKeyWhereInput[]
    OR?: AdminApiKeyWhereInput[]
    NOT?: AdminApiKeyWhereInput | AdminApiKeyWhereInput[]
    id?: UuidFilter<"AdminApiKey"> | string
    user_id?: UuidFilter<"AdminApiKey"> | string
    key_hash?: StringFilter<"AdminApiKey"> | string
    name?: StringNullableFilter<"AdminApiKey"> | string | null
    created_at?: DateTimeFilter<"AdminApiKey"> | Date | string
    expires_at?: DateTimeNullableFilter<"AdminApiKey"> | Date | string | null
    revoked?: BoolFilter<"AdminApiKey"> | boolean
  }

  export type AdminApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    key_hash?: SortOrder
    name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    revoked?: SortOrder
  }

  export type AdminApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminApiKeyWhereInput | AdminApiKeyWhereInput[]
    OR?: AdminApiKeyWhereInput[]
    NOT?: AdminApiKeyWhereInput | AdminApiKeyWhereInput[]
    user_id?: UuidFilter<"AdminApiKey"> | string
    key_hash?: StringFilter<"AdminApiKey"> | string
    name?: StringNullableFilter<"AdminApiKey"> | string | null
    created_at?: DateTimeFilter<"AdminApiKey"> | Date | string
    expires_at?: DateTimeNullableFilter<"AdminApiKey"> | Date | string | null
    revoked?: BoolFilter<"AdminApiKey"> | boolean
  }, "id">

  export type AdminApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    key_hash?: SortOrder
    name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    revoked?: SortOrder
    _count?: AdminApiKeyCountOrderByAggregateInput
    _max?: AdminApiKeyMaxOrderByAggregateInput
    _min?: AdminApiKeyMinOrderByAggregateInput
  }

  export type AdminApiKeyScalarWhereWithAggregatesInput = {
    AND?: AdminApiKeyScalarWhereWithAggregatesInput | AdminApiKeyScalarWhereWithAggregatesInput[]
    OR?: AdminApiKeyScalarWhereWithAggregatesInput[]
    NOT?: AdminApiKeyScalarWhereWithAggregatesInput | AdminApiKeyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AdminApiKey"> | string
    user_id?: UuidWithAggregatesFilter<"AdminApiKey"> | string
    key_hash?: StringWithAggregatesFilter<"AdminApiKey"> | string
    name?: StringNullableWithAggregatesFilter<"AdminApiKey"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AdminApiKey"> | Date | string
    expires_at?: DateTimeNullableWithAggregatesFilter<"AdminApiKey"> | Date | string | null
    revoked?: BoolWithAggregatesFilter<"AdminApiKey"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    mfa?: UserMfaCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeCreateNestedManyWithoutUserInput
    kyc?: KycDetailsCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    mfa?: UserMfaUncheckedCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput
    kyc?: KycDetailsUncheckedCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentUncheckedCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUncheckedUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUncheckedUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUncheckedUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token_hash: string
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    user_id: string
    token_hash: string
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    user_id: string
    token_hash: string
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserMfaCreateInput = {
    type?: string
    secret_encrypted: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutMfaInput
  }

  export type UserMfaUncheckedCreateInput = {
    user_id: string
    type?: string
    secret_encrypted: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserMfaUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    secret_encrypted?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMfaNestedInput
  }

  export type UserMfaUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    secret_encrypted?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMfaCreateManyInput = {
    user_id: string
    type?: string
    secret_encrypted: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserMfaUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    secret_encrypted?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMfaUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    secret_encrypted?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMfaBackupCodeCreateInput = {
    id?: string
    code_hash: string
    used_at?: Date | string | null
    user: UserCreateNestedOneWithoutBackupCodesInput
  }

  export type UserMfaBackupCodeUncheckedCreateInput = {
    id?: string
    user_id: string
    code_hash: string
    used_at?: Date | string | null
  }

  export type UserMfaBackupCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBackupCodesNestedInput
  }

  export type UserMfaBackupCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserMfaBackupCodeCreateManyInput = {
    id?: string
    user_id: string
    code_hash: string
    used_at?: Date | string | null
  }

  export type UserMfaBackupCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserMfaBackupCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type KycDetailsCreateInput = {
    id?: string
    document_type?: string | null
    document_number?: string | null
    issue_date?: Date | string | null
    expiry_date?: Date | string | null
    verified?: boolean
    status?: string
    verification_score?: number | null
    failure_reason?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutKycInput
  }

  export type KycDetailsUncheckedCreateInput = {
    id?: string
    user_id: string
    document_type?: string | null
    document_number?: string | null
    issue_date?: Date | string | null
    expiry_date?: Date | string | null
    verified?: boolean
    status?: string
    verification_score?: number | null
    failure_reason?: string | null
    created_at?: Date | string
  }

  export type KycDetailsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: NullableStringFieldUpdateOperationsInput | string | null
    document_number?: NullableStringFieldUpdateOperationsInput | string | null
    issue_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    verification_score?: NullableFloatFieldUpdateOperationsInput | number | null
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutKycNestedInput
  }

  export type KycDetailsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    document_type?: NullableStringFieldUpdateOperationsInput | string | null
    document_number?: NullableStringFieldUpdateOperationsInput | string | null
    issue_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    verification_score?: NullableFloatFieldUpdateOperationsInput | number | null
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDetailsCreateManyInput = {
    id?: string
    user_id: string
    document_type?: string | null
    document_number?: string | null
    issue_date?: Date | string | null
    expiry_date?: Date | string | null
    verified?: boolean
    status?: string
    verification_score?: number | null
    failure_reason?: string | null
    created_at?: Date | string
  }

  export type KycDetailsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: NullableStringFieldUpdateOperationsInput | string | null
    document_number?: NullableStringFieldUpdateOperationsInput | string | null
    issue_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    verification_score?: NullableFloatFieldUpdateOperationsInput | number | null
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDetailsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    document_type?: NullableStringFieldUpdateOperationsInput | string | null
    document_number?: NullableStringFieldUpdateOperationsInput | string | null
    issue_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    verification_score?: NullableFloatFieldUpdateOperationsInput | number | null
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDocumentCreateInput = {
    id?: string
    doc_kind: string
    file_url: string
    file_hash?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutKycDocumentsInput
  }

  export type KycDocumentUncheckedCreateInput = {
    id?: string
    user_id: string
    doc_kind: string
    file_url: string
    file_hash?: string | null
    created_at?: Date | string
  }

  export type KycDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutKycDocumentsNestedInput
  }

  export type KycDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDocumentCreateManyInput = {
    id?: string
    user_id: string
    doc_kind: string
    file_url: string
    file_hash?: string | null
    created_at?: Date | string
  }

  export type KycDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationPrefsCreateInput = {
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutNotificationPrefsInput
  }

  export type NotificationPrefsUncheckedCreateInput = {
    user_id: string
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsUpdateInput = {
    email_enabled?: BoolFieldUpdateOperationsInput | boolean
    sms_enabled?: BoolFieldUpdateOperationsInput | boolean
    in_app_enabled?: BoolFieldUpdateOperationsInput | boolean
    transactions?: BoolFieldUpdateOperationsInput | boolean
    low_balance?: BoolFieldUpdateOperationsInput | boolean
    security?: BoolFieldUpdateOperationsInput | boolean
    low_balance_threshold?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutNotificationPrefsNestedInput
  }

  export type NotificationPrefsUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email_enabled?: BoolFieldUpdateOperationsInput | boolean
    sms_enabled?: BoolFieldUpdateOperationsInput | boolean
    in_app_enabled?: BoolFieldUpdateOperationsInput | boolean
    transactions?: BoolFieldUpdateOperationsInput | boolean
    low_balance?: BoolFieldUpdateOperationsInput | boolean
    security?: BoolFieldUpdateOperationsInput | boolean
    low_balance_threshold?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsCreateManyInput = {
    user_id: string
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsUpdateManyMutationInput = {
    email_enabled?: BoolFieldUpdateOperationsInput | boolean
    sms_enabled?: BoolFieldUpdateOperationsInput | boolean
    in_app_enabled?: BoolFieldUpdateOperationsInput | boolean
    transactions?: BoolFieldUpdateOperationsInput | boolean
    low_balance?: BoolFieldUpdateOperationsInput | boolean
    security?: BoolFieldUpdateOperationsInput | boolean
    low_balance_threshold?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email_enabled?: BoolFieldUpdateOperationsInput | boolean
    sms_enabled?: BoolFieldUpdateOperationsInput | boolean
    in_app_enabled?: BoolFieldUpdateOperationsInput | boolean
    transactions?: BoolFieldUpdateOperationsInput | boolean
    low_balance?: BoolFieldUpdateOperationsInput | boolean
    security?: BoolFieldUpdateOperationsInput | boolean
    low_balance_threshold?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AuditLogCreateInput = {
    id?: string
    user_id: string
    action: string
    details?: string | null
    performed_at?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    user_id: string
    action: string
    details?: string | null
    performed_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    user_id: string
    action: string
    details?: string | null
    performed_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    performed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    user_id: string
    type: string
    title: string
    message: string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    created_at?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    user_id: string
    type: string
    title: string
    message: string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    created_at?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    user_id: string
    type: string
    title: string
    message: string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: boolean
    created_at?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    read?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminInviteCreateInput = {
    id?: string
    token_hash: string
    email: string
    created_by: string
    created_at?: Date | string
    expires_at: Date | string
    used?: boolean
    used_at?: Date | string | null
    used_by?: string | null
    note?: string | null
  }

  export type AdminInviteUncheckedCreateInput = {
    id?: string
    token_hash: string
    email: string
    created_by: string
    created_at?: Date | string
    expires_at: Date | string
    used?: boolean
    used_at?: Date | string | null
    used_by?: string | null
    note?: string | null
  }

  export type AdminInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_by?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_by?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminInviteCreateManyInput = {
    id?: string
    token_hash: string
    email: string
    created_by: string
    created_at?: Date | string
    expires_at: Date | string
    used?: boolean
    used_at?: Date | string | null
    used_by?: string | null
    note?: string | null
  }

  export type AdminInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_by?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    used_by?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminApiKeyCreateInput = {
    id?: string
    user_id: string
    key_hash: string
    name?: string | null
    created_at?: Date | string
    expires_at?: Date | string | null
    revoked?: boolean
  }

  export type AdminApiKeyUncheckedCreateInput = {
    id?: string
    user_id: string
    key_hash: string
    name?: string | null
    created_at?: Date | string
    expires_at?: Date | string | null
    revoked?: boolean
  }

  export type AdminApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    key_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    key_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminApiKeyCreateManyInput = {
    id?: string
    user_id: string
    key_hash: string
    name?: string | null
    created_at?: Date | string
    expires_at?: Date | string | null
    revoked?: boolean
  }

  export type AdminApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    key_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    key_hash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type UserMfaNullableRelationFilter = {
    is?: UserMfaWhereInput | null
    isNot?: UserMfaWhereInput | null
  }

  export type UserMfaBackupCodeListRelationFilter = {
    every?: UserMfaBackupCodeWhereInput
    some?: UserMfaBackupCodeWhereInput
    none?: UserMfaBackupCodeWhereInput
  }

  export type KycDetailsNullableRelationFilter = {
    is?: KycDetailsWhereInput | null
    isNot?: KycDetailsWhereInput | null
  }

  export type KycDocumentListRelationFilter = {
    every?: KycDocumentWhereInput
    some?: KycDocumentWhereInput
    none?: KycDocumentWhereInput
  }

  export type NotificationPrefsNullableRelationFilter = {
    is?: NotificationPrefsWhereInput | null
    isNot?: NotificationPrefsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserMfaBackupCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KycDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    refresh_token_hash?: SortOrder
    refresh_token_expires?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    refresh_token_hash?: SortOrder
    refresh_token_expires?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone_number?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    refresh_token_hash?: SortOrder
    refresh_token_expires?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    user_agent?: SortOrder
    ip?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    user_agent?: SortOrder
    ip?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    user_agent?: SortOrder
    ip?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserMfaCountOrderByAggregateInput = {
    user_id?: SortOrder
    type?: SortOrder
    secret_encrypted?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMfaMaxOrderByAggregateInput = {
    user_id?: SortOrder
    type?: SortOrder
    secret_encrypted?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMfaMinOrderByAggregateInput = {
    user_id?: SortOrder
    type?: SortOrder
    secret_encrypted?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserMfaBackupCodeCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    code_hash?: SortOrder
    used_at?: SortOrder
  }

  export type UserMfaBackupCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    code_hash?: SortOrder
    used_at?: SortOrder
  }

  export type UserMfaBackupCodeMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    code_hash?: SortOrder
    used_at?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type KycDetailsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    verified?: SortOrder
    status?: SortOrder
    verification_score?: SortOrder
    failure_reason?: SortOrder
    created_at?: SortOrder
  }

  export type KycDetailsAvgOrderByAggregateInput = {
    verification_score?: SortOrder
  }

  export type KycDetailsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    verified?: SortOrder
    status?: SortOrder
    verification_score?: SortOrder
    failure_reason?: SortOrder
    created_at?: SortOrder
  }

  export type KycDetailsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number?: SortOrder
    issue_date?: SortOrder
    expiry_date?: SortOrder
    verified?: SortOrder
    status?: SortOrder
    verification_score?: SortOrder
    failure_reason?: SortOrder
    created_at?: SortOrder
  }

  export type KycDetailsSumOrderByAggregateInput = {
    verification_score?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type KycDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    doc_kind?: SortOrder
    file_url?: SortOrder
    file_hash?: SortOrder
    created_at?: SortOrder
  }

  export type KycDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    doc_kind?: SortOrder
    file_url?: SortOrder
    file_hash?: SortOrder
    created_at?: SortOrder
  }

  export type KycDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    doc_kind?: SortOrder
    file_url?: SortOrder
    file_hash?: SortOrder
    created_at?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsCountOrderByAggregateInput = {
    user_id?: SortOrder
    email_enabled?: SortOrder
    sms_enabled?: SortOrder
    in_app_enabled?: SortOrder
    transactions?: SortOrder
    low_balance?: SortOrder
    security?: SortOrder
    low_balance_threshold?: SortOrder
  }

  export type NotificationPrefsAvgOrderByAggregateInput = {
    low_balance_threshold?: SortOrder
  }

  export type NotificationPrefsMaxOrderByAggregateInput = {
    user_id?: SortOrder
    email_enabled?: SortOrder
    sms_enabled?: SortOrder
    in_app_enabled?: SortOrder
    transactions?: SortOrder
    low_balance?: SortOrder
    security?: SortOrder
    low_balance_threshold?: SortOrder
  }

  export type NotificationPrefsMinOrderByAggregateInput = {
    user_id?: SortOrder
    email_enabled?: SortOrder
    sms_enabled?: SortOrder
    in_app_enabled?: SortOrder
    transactions?: SortOrder
    low_balance?: SortOrder
    security?: SortOrder
    low_balance_threshold?: SortOrder
  }

  export type NotificationPrefsSumOrderByAggregateInput = {
    low_balance_threshold?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    performed_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    performed_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    details?: SortOrder
    performed_at?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    data?: SortOrder
    read?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    created_at?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type AdminInviteCountOrderByAggregateInput = {
    id?: SortOrder
    token_hash?: SortOrder
    email?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    used_at?: SortOrder
    used_by?: SortOrder
    note?: SortOrder
  }

  export type AdminInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    token_hash?: SortOrder
    email?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    used_at?: SortOrder
    used_by?: SortOrder
    note?: SortOrder
  }

  export type AdminInviteMinOrderByAggregateInput = {
    id?: SortOrder
    token_hash?: SortOrder
    email?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    used?: SortOrder
    used_at?: SortOrder
    used_by?: SortOrder
    note?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AdminApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    key_hash?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked?: SortOrder
  }

  export type AdminApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    key_hash?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked?: SortOrder
  }

  export type AdminApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    key_hash?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    revoked?: SortOrder
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UserMfaCreateNestedOneWithoutUserInput = {
    create?: XOR<UserMfaCreateWithoutUserInput, UserMfaUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserMfaCreateOrConnectWithoutUserInput
    connect?: UserMfaWhereUniqueInput
  }

  export type UserMfaBackupCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<UserMfaBackupCodeCreateWithoutUserInput, UserMfaBackupCodeUncheckedCreateWithoutUserInput> | UserMfaBackupCodeCreateWithoutUserInput[] | UserMfaBackupCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMfaBackupCodeCreateOrConnectWithoutUserInput | UserMfaBackupCodeCreateOrConnectWithoutUserInput[]
    createMany?: UserMfaBackupCodeCreateManyUserInputEnvelope
    connect?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
  }

  export type KycDetailsCreateNestedOneWithoutUserInput = {
    create?: XOR<KycDetailsCreateWithoutUserInput, KycDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: KycDetailsCreateOrConnectWithoutUserInput
    connect?: KycDetailsWhereUniqueInput
  }

  export type KycDocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<KycDocumentCreateWithoutUserInput, KycDocumentUncheckedCreateWithoutUserInput> | KycDocumentCreateWithoutUserInput[] | KycDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KycDocumentCreateOrConnectWithoutUserInput | KycDocumentCreateOrConnectWithoutUserInput[]
    createMany?: KycDocumentCreateManyUserInputEnvelope
    connect?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
  }

  export type NotificationPrefsCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationPrefsCreateWithoutUserInput, NotificationPrefsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPrefsCreateOrConnectWithoutUserInput
    connect?: NotificationPrefsWhereUniqueInput
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type UserMfaUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserMfaCreateWithoutUserInput, UserMfaUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserMfaCreateOrConnectWithoutUserInput
    connect?: UserMfaWhereUniqueInput
  }

  export type UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserMfaBackupCodeCreateWithoutUserInput, UserMfaBackupCodeUncheckedCreateWithoutUserInput> | UserMfaBackupCodeCreateWithoutUserInput[] | UserMfaBackupCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMfaBackupCodeCreateOrConnectWithoutUserInput | UserMfaBackupCodeCreateOrConnectWithoutUserInput[]
    createMany?: UserMfaBackupCodeCreateManyUserInputEnvelope
    connect?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
  }

  export type KycDetailsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<KycDetailsCreateWithoutUserInput, KycDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: KycDetailsCreateOrConnectWithoutUserInput
    connect?: KycDetailsWhereUniqueInput
  }

  export type KycDocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<KycDocumentCreateWithoutUserInput, KycDocumentUncheckedCreateWithoutUserInput> | KycDocumentCreateWithoutUserInput[] | KycDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KycDocumentCreateOrConnectWithoutUserInput | KycDocumentCreateOrConnectWithoutUserInput[]
    createMany?: KycDocumentCreateManyUserInputEnvelope
    connect?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
  }

  export type NotificationPrefsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationPrefsCreateWithoutUserInput, NotificationPrefsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPrefsCreateOrConnectWithoutUserInput
    connect?: NotificationPrefsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UserMfaUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserMfaCreateWithoutUserInput, UserMfaUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserMfaCreateOrConnectWithoutUserInput
    upsert?: UserMfaUpsertWithoutUserInput
    disconnect?: UserMfaWhereInput | boolean
    delete?: UserMfaWhereInput | boolean
    connect?: UserMfaWhereUniqueInput
    update?: XOR<XOR<UserMfaUpdateToOneWithWhereWithoutUserInput, UserMfaUpdateWithoutUserInput>, UserMfaUncheckedUpdateWithoutUserInput>
  }

  export type UserMfaBackupCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserMfaBackupCodeCreateWithoutUserInput, UserMfaBackupCodeUncheckedCreateWithoutUserInput> | UserMfaBackupCodeCreateWithoutUserInput[] | UserMfaBackupCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMfaBackupCodeCreateOrConnectWithoutUserInput | UserMfaBackupCodeCreateOrConnectWithoutUserInput[]
    upsert?: UserMfaBackupCodeUpsertWithWhereUniqueWithoutUserInput | UserMfaBackupCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserMfaBackupCodeCreateManyUserInputEnvelope
    set?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    disconnect?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    delete?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    connect?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    update?: UserMfaBackupCodeUpdateWithWhereUniqueWithoutUserInput | UserMfaBackupCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserMfaBackupCodeUpdateManyWithWhereWithoutUserInput | UserMfaBackupCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserMfaBackupCodeScalarWhereInput | UserMfaBackupCodeScalarWhereInput[]
  }

  export type KycDetailsUpdateOneWithoutUserNestedInput = {
    create?: XOR<KycDetailsCreateWithoutUserInput, KycDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: KycDetailsCreateOrConnectWithoutUserInput
    upsert?: KycDetailsUpsertWithoutUserInput
    disconnect?: KycDetailsWhereInput | boolean
    delete?: KycDetailsWhereInput | boolean
    connect?: KycDetailsWhereUniqueInput
    update?: XOR<XOR<KycDetailsUpdateToOneWithWhereWithoutUserInput, KycDetailsUpdateWithoutUserInput>, KycDetailsUncheckedUpdateWithoutUserInput>
  }

  export type KycDocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<KycDocumentCreateWithoutUserInput, KycDocumentUncheckedCreateWithoutUserInput> | KycDocumentCreateWithoutUserInput[] | KycDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KycDocumentCreateOrConnectWithoutUserInput | KycDocumentCreateOrConnectWithoutUserInput[]
    upsert?: KycDocumentUpsertWithWhereUniqueWithoutUserInput | KycDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: KycDocumentCreateManyUserInputEnvelope
    set?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    disconnect?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    delete?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    connect?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    update?: KycDocumentUpdateWithWhereUniqueWithoutUserInput | KycDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: KycDocumentUpdateManyWithWhereWithoutUserInput | KycDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: KycDocumentScalarWhereInput | KycDocumentScalarWhereInput[]
  }

  export type NotificationPrefsUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationPrefsCreateWithoutUserInput, NotificationPrefsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPrefsCreateOrConnectWithoutUserInput
    upsert?: NotificationPrefsUpsertWithoutUserInput
    disconnect?: NotificationPrefsWhereInput | boolean
    delete?: NotificationPrefsWhereInput | boolean
    connect?: NotificationPrefsWhereUniqueInput
    update?: XOR<XOR<NotificationPrefsUpdateToOneWithWhereWithoutUserInput, NotificationPrefsUpdateWithoutUserInput>, NotificationPrefsUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type UserMfaUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserMfaCreateWithoutUserInput, UserMfaUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserMfaCreateOrConnectWithoutUserInput
    upsert?: UserMfaUpsertWithoutUserInput
    disconnect?: UserMfaWhereInput | boolean
    delete?: UserMfaWhereInput | boolean
    connect?: UserMfaWhereUniqueInput
    update?: XOR<XOR<UserMfaUpdateToOneWithWhereWithoutUserInput, UserMfaUpdateWithoutUserInput>, UserMfaUncheckedUpdateWithoutUserInput>
  }

  export type UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserMfaBackupCodeCreateWithoutUserInput, UserMfaBackupCodeUncheckedCreateWithoutUserInput> | UserMfaBackupCodeCreateWithoutUserInput[] | UserMfaBackupCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMfaBackupCodeCreateOrConnectWithoutUserInput | UserMfaBackupCodeCreateOrConnectWithoutUserInput[]
    upsert?: UserMfaBackupCodeUpsertWithWhereUniqueWithoutUserInput | UserMfaBackupCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserMfaBackupCodeCreateManyUserInputEnvelope
    set?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    disconnect?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    delete?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    connect?: UserMfaBackupCodeWhereUniqueInput | UserMfaBackupCodeWhereUniqueInput[]
    update?: UserMfaBackupCodeUpdateWithWhereUniqueWithoutUserInput | UserMfaBackupCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserMfaBackupCodeUpdateManyWithWhereWithoutUserInput | UserMfaBackupCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserMfaBackupCodeScalarWhereInput | UserMfaBackupCodeScalarWhereInput[]
  }

  export type KycDetailsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<KycDetailsCreateWithoutUserInput, KycDetailsUncheckedCreateWithoutUserInput>
    connectOrCreate?: KycDetailsCreateOrConnectWithoutUserInput
    upsert?: KycDetailsUpsertWithoutUserInput
    disconnect?: KycDetailsWhereInput | boolean
    delete?: KycDetailsWhereInput | boolean
    connect?: KycDetailsWhereUniqueInput
    update?: XOR<XOR<KycDetailsUpdateToOneWithWhereWithoutUserInput, KycDetailsUpdateWithoutUserInput>, KycDetailsUncheckedUpdateWithoutUserInput>
  }

  export type KycDocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<KycDocumentCreateWithoutUserInput, KycDocumentUncheckedCreateWithoutUserInput> | KycDocumentCreateWithoutUserInput[] | KycDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KycDocumentCreateOrConnectWithoutUserInput | KycDocumentCreateOrConnectWithoutUserInput[]
    upsert?: KycDocumentUpsertWithWhereUniqueWithoutUserInput | KycDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: KycDocumentCreateManyUserInputEnvelope
    set?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    disconnect?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    delete?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    connect?: KycDocumentWhereUniqueInput | KycDocumentWhereUniqueInput[]
    update?: KycDocumentUpdateWithWhereUniqueWithoutUserInput | KycDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: KycDocumentUpdateManyWithWhereWithoutUserInput | KycDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: KycDocumentScalarWhereInput | KycDocumentScalarWhereInput[]
  }

  export type NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationPrefsCreateWithoutUserInput, NotificationPrefsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationPrefsCreateOrConnectWithoutUserInput
    upsert?: NotificationPrefsUpsertWithoutUserInput
    disconnect?: NotificationPrefsWhereInput | boolean
    delete?: NotificationPrefsWhereInput | boolean
    connect?: NotificationPrefsWhereUniqueInput
    update?: XOR<XOR<NotificationPrefsUpdateToOneWithWhereWithoutUserInput, NotificationPrefsUpdateWithoutUserInput>, NotificationPrefsUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutMfaInput = {
    create?: XOR<UserCreateWithoutMfaInput, UserUncheckedCreateWithoutMfaInput>
    connectOrCreate?: UserCreateOrConnectWithoutMfaInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutMfaNestedInput = {
    create?: XOR<UserCreateWithoutMfaInput, UserUncheckedCreateWithoutMfaInput>
    connectOrCreate?: UserCreateOrConnectWithoutMfaInput
    upsert?: UserUpsertWithoutMfaInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMfaInput, UserUpdateWithoutMfaInput>, UserUncheckedUpdateWithoutMfaInput>
  }

  export type UserCreateNestedOneWithoutBackupCodesInput = {
    create?: XOR<UserCreateWithoutBackupCodesInput, UserUncheckedCreateWithoutBackupCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBackupCodesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBackupCodesNestedInput = {
    create?: XOR<UserCreateWithoutBackupCodesInput, UserUncheckedCreateWithoutBackupCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBackupCodesInput
    upsert?: UserUpsertWithoutBackupCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBackupCodesInput, UserUpdateWithoutBackupCodesInput>, UserUncheckedUpdateWithoutBackupCodesInput>
  }

  export type UserCreateNestedOneWithoutKycInput = {
    create?: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutKycNestedInput = {
    create?: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycInput
    upsert?: UserUpsertWithoutKycInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKycInput, UserUpdateWithoutKycInput>, UserUncheckedUpdateWithoutKycInput>
  }

  export type UserCreateNestedOneWithoutKycDocumentsInput = {
    create?: XOR<UserCreateWithoutKycDocumentsInput, UserUncheckedCreateWithoutKycDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutKycDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutKycDocumentsInput, UserUncheckedCreateWithoutKycDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutKycDocumentsInput
    upsert?: UserUpsertWithoutKycDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKycDocumentsInput, UserUpdateWithoutKycDocumentsInput>, UserUncheckedUpdateWithoutKycDocumentsInput>
  }

  export type UserCreateNestedOneWithoutNotificationPrefsInput = {
    create?: XOR<UserCreateWithoutNotificationPrefsInput, UserUncheckedCreateWithoutNotificationPrefsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationPrefsInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutNotificationPrefsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationPrefsInput, UserUncheckedCreateWithoutNotificationPrefsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationPrefsInput
    upsert?: UserUpsertWithoutNotificationPrefsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationPrefsInput, UserUpdateWithoutNotificationPrefsInput>, UserUncheckedUpdateWithoutNotificationPrefsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token_hash: string
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token_hash: string
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserMfaCreateWithoutUserInput = {
    type?: string
    secret_encrypted: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserMfaUncheckedCreateWithoutUserInput = {
    type?: string
    secret_encrypted: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserMfaCreateOrConnectWithoutUserInput = {
    where: UserMfaWhereUniqueInput
    create: XOR<UserMfaCreateWithoutUserInput, UserMfaUncheckedCreateWithoutUserInput>
  }

  export type UserMfaBackupCodeCreateWithoutUserInput = {
    id?: string
    code_hash: string
    used_at?: Date | string | null
  }

  export type UserMfaBackupCodeUncheckedCreateWithoutUserInput = {
    id?: string
    code_hash: string
    used_at?: Date | string | null
  }

  export type UserMfaBackupCodeCreateOrConnectWithoutUserInput = {
    where: UserMfaBackupCodeWhereUniqueInput
    create: XOR<UserMfaBackupCodeCreateWithoutUserInput, UserMfaBackupCodeUncheckedCreateWithoutUserInput>
  }

  export type UserMfaBackupCodeCreateManyUserInputEnvelope = {
    data: UserMfaBackupCodeCreateManyUserInput | UserMfaBackupCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type KycDetailsCreateWithoutUserInput = {
    id?: string
    document_type?: string | null
    document_number?: string | null
    issue_date?: Date | string | null
    expiry_date?: Date | string | null
    verified?: boolean
    status?: string
    verification_score?: number | null
    failure_reason?: string | null
    created_at?: Date | string
  }

  export type KycDetailsUncheckedCreateWithoutUserInput = {
    id?: string
    document_type?: string | null
    document_number?: string | null
    issue_date?: Date | string | null
    expiry_date?: Date | string | null
    verified?: boolean
    status?: string
    verification_score?: number | null
    failure_reason?: string | null
    created_at?: Date | string
  }

  export type KycDetailsCreateOrConnectWithoutUserInput = {
    where: KycDetailsWhereUniqueInput
    create: XOR<KycDetailsCreateWithoutUserInput, KycDetailsUncheckedCreateWithoutUserInput>
  }

  export type KycDocumentCreateWithoutUserInput = {
    id?: string
    doc_kind: string
    file_url: string
    file_hash?: string | null
    created_at?: Date | string
  }

  export type KycDocumentUncheckedCreateWithoutUserInput = {
    id?: string
    doc_kind: string
    file_url: string
    file_hash?: string | null
    created_at?: Date | string
  }

  export type KycDocumentCreateOrConnectWithoutUserInput = {
    where: KycDocumentWhereUniqueInput
    create: XOR<KycDocumentCreateWithoutUserInput, KycDocumentUncheckedCreateWithoutUserInput>
  }

  export type KycDocumentCreateManyUserInputEnvelope = {
    data: KycDocumentCreateManyUserInput | KycDocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationPrefsCreateWithoutUserInput = {
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsUncheckedCreateWithoutUserInput = {
    email_enabled?: boolean
    sms_enabled?: boolean
    in_app_enabled?: boolean
    transactions?: boolean
    low_balance?: boolean
    security?: boolean
    low_balance_threshold?: Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsCreateOrConnectWithoutUserInput = {
    where: NotificationPrefsWhereUniqueInput
    create: XOR<NotificationPrefsCreateWithoutUserInput, NotificationPrefsUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    user_id?: UuidFilter<"RefreshToken"> | string
    token_hash?: StringFilter<"RefreshToken"> | string
    user_agent?: StringNullableFilter<"RefreshToken"> | string | null
    ip?: StringNullableFilter<"RefreshToken"> | string | null
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
  }

  export type UserMfaUpsertWithoutUserInput = {
    update: XOR<UserMfaUpdateWithoutUserInput, UserMfaUncheckedUpdateWithoutUserInput>
    create: XOR<UserMfaCreateWithoutUserInput, UserMfaUncheckedCreateWithoutUserInput>
    where?: UserMfaWhereInput
  }

  export type UserMfaUpdateToOneWithWhereWithoutUserInput = {
    where?: UserMfaWhereInput
    data: XOR<UserMfaUpdateWithoutUserInput, UserMfaUncheckedUpdateWithoutUserInput>
  }

  export type UserMfaUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    secret_encrypted?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMfaUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    secret_encrypted?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMfaBackupCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: UserMfaBackupCodeWhereUniqueInput
    update: XOR<UserMfaBackupCodeUpdateWithoutUserInput, UserMfaBackupCodeUncheckedUpdateWithoutUserInput>
    create: XOR<UserMfaBackupCodeCreateWithoutUserInput, UserMfaBackupCodeUncheckedCreateWithoutUserInput>
  }

  export type UserMfaBackupCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: UserMfaBackupCodeWhereUniqueInput
    data: XOR<UserMfaBackupCodeUpdateWithoutUserInput, UserMfaBackupCodeUncheckedUpdateWithoutUserInput>
  }

  export type UserMfaBackupCodeUpdateManyWithWhereWithoutUserInput = {
    where: UserMfaBackupCodeScalarWhereInput
    data: XOR<UserMfaBackupCodeUpdateManyMutationInput, UserMfaBackupCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type UserMfaBackupCodeScalarWhereInput = {
    AND?: UserMfaBackupCodeScalarWhereInput | UserMfaBackupCodeScalarWhereInput[]
    OR?: UserMfaBackupCodeScalarWhereInput[]
    NOT?: UserMfaBackupCodeScalarWhereInput | UserMfaBackupCodeScalarWhereInput[]
    id?: UuidFilter<"UserMfaBackupCode"> | string
    user_id?: UuidFilter<"UserMfaBackupCode"> | string
    code_hash?: StringFilter<"UserMfaBackupCode"> | string
    used_at?: DateTimeNullableFilter<"UserMfaBackupCode"> | Date | string | null
  }

  export type KycDetailsUpsertWithoutUserInput = {
    update: XOR<KycDetailsUpdateWithoutUserInput, KycDetailsUncheckedUpdateWithoutUserInput>
    create: XOR<KycDetailsCreateWithoutUserInput, KycDetailsUncheckedCreateWithoutUserInput>
    where?: KycDetailsWhereInput
  }

  export type KycDetailsUpdateToOneWithWhereWithoutUserInput = {
    where?: KycDetailsWhereInput
    data: XOR<KycDetailsUpdateWithoutUserInput, KycDetailsUncheckedUpdateWithoutUserInput>
  }

  export type KycDetailsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: NullableStringFieldUpdateOperationsInput | string | null
    document_number?: NullableStringFieldUpdateOperationsInput | string | null
    issue_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    verification_score?: NullableFloatFieldUpdateOperationsInput | number | null
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDetailsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: NullableStringFieldUpdateOperationsInput | string | null
    document_number?: NullableStringFieldUpdateOperationsInput | string | null
    issue_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiry_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    verification_score?: NullableFloatFieldUpdateOperationsInput | number | null
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: KycDocumentWhereUniqueInput
    update: XOR<KycDocumentUpdateWithoutUserInput, KycDocumentUncheckedUpdateWithoutUserInput>
    create: XOR<KycDocumentCreateWithoutUserInput, KycDocumentUncheckedCreateWithoutUserInput>
  }

  export type KycDocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: KycDocumentWhereUniqueInput
    data: XOR<KycDocumentUpdateWithoutUserInput, KycDocumentUncheckedUpdateWithoutUserInput>
  }

  export type KycDocumentUpdateManyWithWhereWithoutUserInput = {
    where: KycDocumentScalarWhereInput
    data: XOR<KycDocumentUpdateManyMutationInput, KycDocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type KycDocumentScalarWhereInput = {
    AND?: KycDocumentScalarWhereInput | KycDocumentScalarWhereInput[]
    OR?: KycDocumentScalarWhereInput[]
    NOT?: KycDocumentScalarWhereInput | KycDocumentScalarWhereInput[]
    id?: UuidFilter<"KycDocument"> | string
    user_id?: UuidFilter<"KycDocument"> | string
    doc_kind?: StringFilter<"KycDocument"> | string
    file_url?: StringFilter<"KycDocument"> | string
    file_hash?: StringNullableFilter<"KycDocument"> | string | null
    created_at?: DateTimeFilter<"KycDocument"> | Date | string
  }

  export type NotificationPrefsUpsertWithoutUserInput = {
    update: XOR<NotificationPrefsUpdateWithoutUserInput, NotificationPrefsUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationPrefsCreateWithoutUserInput, NotificationPrefsUncheckedCreateWithoutUserInput>
    where?: NotificationPrefsWhereInput
  }

  export type NotificationPrefsUpdateToOneWithWhereWithoutUserInput = {
    where?: NotificationPrefsWhereInput
    data: XOR<NotificationPrefsUpdateWithoutUserInput, NotificationPrefsUncheckedUpdateWithoutUserInput>
  }

  export type NotificationPrefsUpdateWithoutUserInput = {
    email_enabled?: BoolFieldUpdateOperationsInput | boolean
    sms_enabled?: BoolFieldUpdateOperationsInput | boolean
    in_app_enabled?: BoolFieldUpdateOperationsInput | boolean
    transactions?: BoolFieldUpdateOperationsInput | boolean
    low_balance?: BoolFieldUpdateOperationsInput | boolean
    security?: BoolFieldUpdateOperationsInput | boolean
    low_balance_threshold?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type NotificationPrefsUncheckedUpdateWithoutUserInput = {
    email_enabled?: BoolFieldUpdateOperationsInput | boolean
    sms_enabled?: BoolFieldUpdateOperationsInput | boolean
    in_app_enabled?: BoolFieldUpdateOperationsInput | boolean
    transactions?: BoolFieldUpdateOperationsInput | boolean
    low_balance?: BoolFieldUpdateOperationsInput | boolean
    security?: BoolFieldUpdateOperationsInput | boolean
    low_balance_threshold?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    mfa?: UserMfaCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeCreateNestedManyWithoutUserInput
    kyc?: KycDetailsCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    mfa?: UserMfaUncheckedCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput
    kyc?: KycDetailsUncheckedCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentUncheckedCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mfa?: UserMfaUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mfa?: UserMfaUncheckedUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUncheckedUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUncheckedUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutMfaInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    backupCodes?: UserMfaBackupCodeCreateNestedManyWithoutUserInput
    kyc?: KycDetailsCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMfaInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    backupCodes?: UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput
    kyc?: KycDetailsUncheckedCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentUncheckedCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMfaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMfaInput, UserUncheckedCreateWithoutMfaInput>
  }

  export type UserUpsertWithoutMfaInput = {
    update: XOR<UserUpdateWithoutMfaInput, UserUncheckedUpdateWithoutMfaInput>
    create: XOR<UserCreateWithoutMfaInput, UserUncheckedCreateWithoutMfaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMfaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMfaInput, UserUncheckedUpdateWithoutMfaInput>
  }

  export type UserUpdateWithoutMfaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMfaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUncheckedUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUncheckedUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutBackupCodesInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    mfa?: UserMfaCreateNestedOneWithoutUserInput
    kyc?: KycDetailsCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBackupCodesInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    mfa?: UserMfaUncheckedCreateNestedOneWithoutUserInput
    kyc?: KycDetailsUncheckedCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentUncheckedCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBackupCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBackupCodesInput, UserUncheckedCreateWithoutBackupCodesInput>
  }

  export type UserUpsertWithoutBackupCodesInput = {
    update: XOR<UserUpdateWithoutBackupCodesInput, UserUncheckedUpdateWithoutBackupCodesInput>
    create: XOR<UserCreateWithoutBackupCodesInput, UserUncheckedCreateWithoutBackupCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBackupCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBackupCodesInput, UserUncheckedUpdateWithoutBackupCodesInput>
  }

  export type UserUpdateWithoutBackupCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUpdateOneWithoutUserNestedInput
    kyc?: KycDetailsUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBackupCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUncheckedUpdateOneWithoutUserNestedInput
    kyc?: KycDetailsUncheckedUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUncheckedUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutKycInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    mfa?: UserMfaCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeCreateNestedManyWithoutUserInput
    kycDocuments?: KycDocumentCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutKycInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    mfa?: UserMfaUncheckedCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput
    kycDocuments?: KycDocumentUncheckedCreateNestedManyWithoutUserInput
    notificationPrefs?: NotificationPrefsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutKycInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
  }

  export type UserUpsertWithoutKycInput = {
    update: XOR<UserUpdateWithoutKycInput, UserUncheckedUpdateWithoutKycInput>
    create: XOR<UserCreateWithoutKycInput, UserUncheckedCreateWithoutKycInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKycInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKycInput, UserUncheckedUpdateWithoutKycInput>
  }

  export type UserUpdateWithoutKycInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUpdateManyWithoutUserNestedInput
    kycDocuments?: KycDocumentUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKycInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUncheckedUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput
    kycDocuments?: KycDocumentUncheckedUpdateManyWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutKycDocumentsInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    mfa?: UserMfaCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeCreateNestedManyWithoutUserInput
    kyc?: KycDetailsCreateNestedOneWithoutUserInput
    notificationPrefs?: NotificationPrefsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutKycDocumentsInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    mfa?: UserMfaUncheckedCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput
    kyc?: KycDetailsUncheckedCreateNestedOneWithoutUserInput
    notificationPrefs?: NotificationPrefsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutKycDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKycDocumentsInput, UserUncheckedCreateWithoutKycDocumentsInput>
  }

  export type UserUpsertWithoutKycDocumentsInput = {
    update: XOR<UserUpdateWithoutKycDocumentsInput, UserUncheckedUpdateWithoutKycDocumentsInput>
    create: XOR<UserCreateWithoutKycDocumentsInput, UserUncheckedCreateWithoutKycDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKycDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKycDocumentsInput, UserUncheckedUpdateWithoutKycDocumentsInput>
  }

  export type UserUpdateWithoutKycDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUpdateOneWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKycDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUncheckedUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUncheckedUpdateOneWithoutUserNestedInput
    notificationPrefs?: NotificationPrefsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationPrefsInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    mfa?: UserMfaCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeCreateNestedManyWithoutUserInput
    kyc?: KycDetailsCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationPrefsInput = {
    id?: string
    name: string
    email: string
    phone_number?: string | null
    password_hash: string
    role?: string
    status?: string
    refresh_token_hash?: string | null
    refresh_token_expires?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    mfa?: UserMfaUncheckedCreateNestedOneWithoutUserInput
    backupCodes?: UserMfaBackupCodeUncheckedCreateNestedManyWithoutUserInput
    kyc?: KycDetailsUncheckedCreateNestedOneWithoutUserInput
    kycDocuments?: KycDocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationPrefsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationPrefsInput, UserUncheckedCreateWithoutNotificationPrefsInput>
  }

  export type UserUpsertWithoutNotificationPrefsInput = {
    update: XOR<UserUpdateWithoutNotificationPrefsInput, UserUncheckedUpdateWithoutNotificationPrefsInput>
    create: XOR<UserCreateWithoutNotificationPrefsInput, UserUncheckedCreateWithoutNotificationPrefsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationPrefsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationPrefsInput, UserUncheckedUpdateWithoutNotificationPrefsInput>
  }

  export type UserUpdateWithoutNotificationPrefsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationPrefsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    mfa?: UserMfaUncheckedUpdateOneWithoutUserNestedInput
    backupCodes?: UserMfaBackupCodeUncheckedUpdateManyWithoutUserNestedInput
    kyc?: KycDetailsUncheckedUpdateOneWithoutUserNestedInput
    kycDocuments?: KycDocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token_hash: string
    user_agent?: string | null
    ip?: string | null
    created_at?: Date | string
    expires_at: Date | string
    revoked_at?: Date | string | null
  }

  export type UserMfaBackupCodeCreateManyUserInput = {
    id?: string
    code_hash: string
    used_at?: Date | string | null
  }

  export type KycDocumentCreateManyUserInput = {
    id?: string
    doc_kind: string
    file_url: string
    file_hash?: string | null
    created_at?: Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserMfaBackupCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserMfaBackupCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserMfaBackupCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code_hash?: StringFieldUpdateOperationsInput | string
    used_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type KycDocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KycDocumentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    doc_kind?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    file_hash?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefreshTokenDefaultArgs instead
     */
    export type RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefreshTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserMfaDefaultArgs instead
     */
    export type UserMfaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserMfaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserMfaBackupCodeDefaultArgs instead
     */
    export type UserMfaBackupCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserMfaBackupCodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KycDetailsDefaultArgs instead
     */
    export type KycDetailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KycDetailsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KycDocumentDefaultArgs instead
     */
    export type KycDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KycDocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationPrefsDefaultArgs instead
     */
    export type NotificationPrefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationPrefsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminInviteDefaultArgs instead
     */
    export type AdminInviteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminInviteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminApiKeyDefaultArgs instead
     */
    export type AdminApiKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminApiKeyDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}