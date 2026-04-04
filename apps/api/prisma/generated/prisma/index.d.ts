
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Brand
 * 
 */
export type Brand = $Result.DefaultSelection<Prisma.$BrandPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductImage
 * 
 */
export type ProductImage = $Result.DefaultSelection<Prisma.$ProductImagePayload>
/**
 * Model ProductInfoFile
 * 
 */
export type ProductInfoFile = $Result.DefaultSelection<Prisma.$ProductInfoFilePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model OrderEmail
 * 
 */
export type OrderEmail = $Result.DefaultSelection<Prisma.$OrderEmailPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  NEW: 'NEW',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  DONE: 'DONE'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const DeliveryMethod: {
  COURIER: 'COURIER',
  PICKUP: 'PICKUP'
};

export type DeliveryMethod = (typeof DeliveryMethod)[keyof typeof DeliveryMethod]


export const AdminRequestStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED'
};

export type AdminRequestStatus = (typeof AdminRequestStatus)[keyof typeof AdminRequestStatus]


export const OrderEmailStatus: {
  PENDING: 'PENDING',
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

export type OrderEmailStatus = (typeof OrderEmailStatus)[keyof typeof OrderEmailStatus]


export const OrderEmailKind: {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER'
};

export type OrderEmailKind = (typeof OrderEmailKind)[keyof typeof OrderEmailKind]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type DeliveryMethod = $Enums.DeliveryMethod

export const DeliveryMethod: typeof $Enums.DeliveryMethod

export type AdminRequestStatus = $Enums.AdminRequestStatus

export const AdminRequestStatus: typeof $Enums.AdminRequestStatus

export type OrderEmailStatus = $Enums.OrderEmailStatus

export const OrderEmailStatus: typeof $Enums.OrderEmailStatus

export type OrderEmailKind = $Enums.OrderEmailKind

export const OrderEmailKind: typeof $Enums.OrderEmailKind

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
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
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductImages
    * const productImages = await prisma.productImage.findMany()
    * ```
    */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productInfoFile`: Exposes CRUD operations for the **ProductInfoFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductInfoFiles
    * const productInfoFiles = await prisma.productInfoFile.findMany()
    * ```
    */
  get productInfoFile(): Prisma.ProductInfoFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderEmail`: Exposes CRUD operations for the **OrderEmail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderEmails
    * const orderEmails = await prisma.orderEmail.findMany()
    * ```
    */
  get orderEmail(): Prisma.OrderEmailDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
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
    Category: 'Category',
    Brand: 'Brand',
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProductInfoFile: 'ProductInfoFile',
    Order: 'Order',
    OrderItem: 'OrderItem',
    OrderEmail: 'OrderEmail'
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
      modelProps: "category" | "brand" | "product" | "productImage" | "productInfoFile" | "order" | "orderItem" | "orderEmail"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Brand: {
        payload: Prisma.$BrandPayload<ExtArgs>
        fields: Prisma.BrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findFirst: {
            args: Prisma.BrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findMany: {
            args: Prisma.BrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          create: {
            args: Prisma.BrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          createMany: {
            args: Prisma.BrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          update: {
            args: Prisma.BrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          deleteMany: {
            args: Prisma.BrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          aggregate: {
            args: Prisma.BrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrand>
          }
          groupBy: {
            args: Prisma.BrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrandCountArgs<ExtArgs>
            result: $Utils.Optional<BrandCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>
        fields: Prisma.ProductImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductImage>
          }
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductImageCountAggregateOutputType> | number
          }
        }
      }
      ProductInfoFile: {
        payload: Prisma.$ProductInfoFilePayload<ExtArgs>
        fields: Prisma.ProductInfoFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductInfoFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductInfoFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>
          }
          findFirst: {
            args: Prisma.ProductInfoFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductInfoFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>
          }
          findMany: {
            args: Prisma.ProductInfoFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>[]
          }
          create: {
            args: Prisma.ProductInfoFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>
          }
          createMany: {
            args: Prisma.ProductInfoFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductInfoFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>
          }
          update: {
            args: Prisma.ProductInfoFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>
          }
          deleteMany: {
            args: Prisma.ProductInfoFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductInfoFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductInfoFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductInfoFilePayload>
          }
          aggregate: {
            args: Prisma.ProductInfoFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductInfoFile>
          }
          groupBy: {
            args: Prisma.ProductInfoFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductInfoFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductInfoFileCountArgs<ExtArgs>
            result: $Utils.Optional<ProductInfoFileCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      OrderEmail: {
        payload: Prisma.$OrderEmailPayload<ExtArgs>
        fields: Prisma.OrderEmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderEmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderEmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>
          }
          findFirst: {
            args: Prisma.OrderEmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderEmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>
          }
          findMany: {
            args: Prisma.OrderEmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>[]
          }
          create: {
            args: Prisma.OrderEmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>
          }
          createMany: {
            args: Prisma.OrderEmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderEmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>
          }
          update: {
            args: Prisma.OrderEmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>
          }
          deleteMany: {
            args: Prisma.OrderEmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderEmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderEmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderEmailPayload>
          }
          aggregate: {
            args: Prisma.OrderEmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderEmail>
          }
          groupBy: {
            args: Prisma.OrderEmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderEmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderEmailCountArgs<ExtArgs>
            result: $Utils.Optional<OrderEmailCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    category?: CategoryOmit
    brand?: BrandOmit
    product?: ProductOmit
    productImage?: ProductImageOmit
    productInfoFile?: ProductInfoFileOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    orderEmail?: OrderEmailOmit
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
    | 'updateManyAndReturn'
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
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type BrandCountOutputType
   */

  export type BrandCountOutputType = {
    products: number
  }

  export type BrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | BrandCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandCountOutputType
     */
    select?: BrandCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    images: number
    infoFiles: number
    orderItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ProductCountOutputTypeCountImagesArgs
    infoFiles?: boolean | ProductCountOutputTypeCountInfoFilesArgs
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountInfoFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductInfoFileWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    emails: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    emails?: boolean | OrderCountOutputTypeCountEmailsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderEmailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    isActive: boolean | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    isActive: boolean | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    isActive: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    slug: string
    isActive: boolean
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "isActive", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      isActive: boolean
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly isActive: FieldRef<"Category", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandAvgAggregateOutputType = {
    id: number | null
  }

  export type BrandSumAggregateOutputType = {
    id: number | null
  }

  export type BrandMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    isActive: boolean | null
  }

  export type BrandMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    isActive: boolean | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    isActive: number
    _all: number
  }


  export type BrandAvgAggregateInputType = {
    id?: true
  }

  export type BrandSumAggregateInputType = {
    id?: true
  }

  export type BrandMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    isActive?: true
    _all?: true
  }

  export type BrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brand to aggregate.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BrandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BrandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type BrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandWhereInput
    orderBy?: BrandOrderByWithAggregationInput | BrandOrderByWithAggregationInput[]
    by: BrandScalarFieldEnum[] | BrandScalarFieldEnum
    having?: BrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _avg?: BrandAvgAggregateInputType
    _sum?: BrandSumAggregateInputType
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }

  export type BrandGroupByOutputType = {
    id: number
    name: string
    slug: string
    isActive: boolean
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends BrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type BrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
    products?: boolean | Brand$productsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>



  export type BrandSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    isActive?: boolean
  }

  export type BrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "isActive", ExtArgs["result"]["brand"]>
  export type BrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Brand$productsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brand"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      isActive: boolean
    }, ExtArgs["result"]["brand"]>
    composites: {}
  }

  type BrandGetPayload<S extends boolean | null | undefined | BrandDefaultArgs> = $Result.GetResult<Prisma.$BrandPayload, S>

  type BrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrandCountAggregateInputType | true
    }

  export interface BrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Brand'], meta: { name: 'Brand' } }
    /**
     * Find zero or one Brand that matches the filter.
     * @param {BrandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrandFindUniqueArgs>(args: SelectSubset<T, BrandFindUniqueArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Brand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BrandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(args: SelectSubset<T, BrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrandFindFirstArgs>(args?: SelectSubset<T, BrandFindFirstArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Brand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(args?: SelectSubset<T, BrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrandFindManyArgs>(args?: SelectSubset<T, BrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Brand.
     * @param {BrandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
     */
    create<T extends BrandCreateArgs>(args: SelectSubset<T, BrandCreateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Brands.
     * @param {BrandCreateManyArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrandCreateManyArgs>(args?: SelectSubset<T, BrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Brand.
     * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
     */
    delete<T extends BrandDeleteArgs>(args: SelectSubset<T, BrandDeleteArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Brand.
     * @param {BrandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrandUpdateArgs>(args: SelectSubset<T, BrandUpdateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Brands.
     * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrandDeleteManyArgs>(args?: SelectSubset<T, BrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrandUpdateManyArgs>(args: SelectSubset<T, BrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Brand.
     * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
     */
    upsert<T extends BrandUpsertArgs>(args: SelectSubset<T, BrandUpsertArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends BrandCountArgs>(
      args?: Subset<T, BrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandGroupByArgs} args - Group by arguments.
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
      T extends BrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandGroupByArgs['orderBy'] }
        : { orderBy?: BrandGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Brand model
   */
  readonly fields: BrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Brand$productsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
   * Fields of the Brand model
   */ 
  interface BrandFieldRefs {
    readonly id: FieldRef<"Brand", 'Int'>
    readonly name: FieldRef<"Brand", 'String'>
    readonly slug: FieldRef<"Brand", 'String'>
    readonly isActive: FieldRef<"Brand", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Brand findUnique
   */
  export type BrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findUniqueOrThrow
   */
  export type BrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findFirst
   */
  export type BrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findFirstOrThrow
   */
  export type BrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findMany
   */
  export type BrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brands to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand create
   */
  export type BrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to create a Brand.
     */
    data: XOR<BrandCreateInput, BrandUncheckedCreateInput>
  }

  /**
   * Brand createMany
   */
  export type BrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand update
   */
  export type BrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to update a Brand.
     */
    data: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
    /**
     * Choose, which Brand to update.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand updateMany
   */
  export type BrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
    /**
     * Limit how many Brands to update.
     */
    limit?: number
  }

  /**
   * Brand upsert
   */
  export type BrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The filter to search for the Brand to update in case it exists.
     */
    where: BrandWhereUniqueInput
    /**
     * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
     */
    create: XOR<BrandCreateInput, BrandUncheckedCreateInput>
    /**
     * In case the Brand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
  }

  /**
   * Brand delete
   */
  export type BrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter which Brand to delete.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand deleteMany
   */
  export type BrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brands to delete
     */
    where?: BrandWhereInput
    /**
     * Limit how many Brands to delete.
     */
    limit?: number
  }

  /**
   * Brand.products
   */
  export type Brand$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Brand without action
   */
  export type BrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
    categoryId: number | null
    brandId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: number | null
    categoryId: number | null
    brandId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    articleNumber: string | null
    description: string | null
    price: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: number | null
    brandId: number | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    articleNumber: string | null
    description: string | null
    price: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    categoryId: number | null
    brandId: number | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    articleNumber: number
    description: number
    price: number
    isActive: number
    createdAt: number
    updatedAt: number
    categoryId: number
    brandId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    categoryId?: true
    brandId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    categoryId?: true
    brandId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    articleNumber?: true
    description?: true
    price?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    brandId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    articleNumber?: true
    description?: true
    price?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    brandId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    articleNumber?: true
    description?: true
    price?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    categoryId?: true
    brandId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    slug: string
    articleNumber: string | null
    description: string
    price: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    categoryId: number
    brandId: number | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    articleNumber?: boolean
    description?: boolean
    price?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    brandId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    infoFiles?: boolean | Product$infoFilesArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    articleNumber?: boolean
    description?: boolean
    price?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categoryId?: boolean
    brandId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "articleNumber" | "description" | "price" | "isActive" | "createdAt" | "updatedAt" | "categoryId" | "brandId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    infoFiles?: boolean | Product$infoFilesArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      brand: Prisma.$BrandPayload<ExtArgs> | null
      images: Prisma.$ProductImagePayload<ExtArgs>[]
      infoFiles: Prisma.$ProductInfoFilePayload<ExtArgs>[]
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      articleNumber: string | null
      description: string
      price: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      categoryId: number
      brandId: number | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    brand<T extends Product$brandArgs<ExtArgs> = {}>(args?: Subset<T, Product$brandArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    images<T extends Product$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Product$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    infoFiles<T extends Product$infoFilesArgs<ExtArgs> = {}>(args?: Subset<T, Product$infoFilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly articleNumber: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Int'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly categoryId: FieldRef<"Product", 'Int'>
    readonly brandId: FieldRef<"Product", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.brand
   */
  export type Product$brandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    where?: BrandWhereInput
  }

  /**
   * Product.images
   */
  export type Product$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    cursor?: ProductImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * Product.infoFiles
   */
  export type Product$infoFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    where?: ProductInfoFileWhereInput
    orderBy?: ProductInfoFileOrderByWithRelationInput | ProductInfoFileOrderByWithRelationInput[]
    cursor?: ProductInfoFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductInfoFileScalarFieldEnum | ProductInfoFileScalarFieldEnum[]
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  export type ProductImageAvgAggregateOutputType = {
    id: number | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductImageSumAggregateOutputType = {
    id: number | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductImageMinAggregateOutputType = {
    id: number | null
    url: string | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductImageMaxAggregateOutputType = {
    id: number | null
    url: string | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductImageCountAggregateOutputType = {
    id: number
    url: number
    sortOrder: number
    productId: number
    _all: number
  }


  export type ProductImageAvgAggregateInputType = {
    id?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductImageSumAggregateInputType = {
    id?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductImageMinAggregateInputType = {
    id?: true
    url?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductImageMaxAggregateInputType = {
    id?: true
    url?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductImageCountAggregateInputType = {
    id?: true
    url?: true
    sortOrder?: true
    productId?: true
    _all?: true
  }

  export type ProductImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductImages
    **/
    _count?: true | ProductImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductImageMaxAggregateInputType
  }

  export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>
  }




  export type ProductImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithAggregationInput | ProductImageOrderByWithAggregationInput[]
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum
    having?: ProductImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductImageCountAggregateInputType | true
    _avg?: ProductImageAvgAggregateInputType
    _sum?: ProductImageSumAggregateInputType
    _min?: ProductImageMinAggregateInputType
    _max?: ProductImageMaxAggregateInputType
  }

  export type ProductImageGroupByOutputType = {
    id: number
    url: string
    sortOrder: number
    productId: number
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    sortOrder?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>



  export type ProductImageSelectScalar = {
    id?: boolean
    url?: boolean
    sortOrder?: boolean
    productId?: boolean
  }

  export type ProductImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "sortOrder" | "productId", ExtArgs["result"]["productImage"]>
  export type ProductImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductImage"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      sortOrder: number
      productId: number
    }, ExtArgs["result"]["productImage"]>
    composites: {}
  }

  type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = $Result.GetResult<Prisma.$ProductImagePayload, S>

  type ProductImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductImageCountAggregateInputType | true
    }

  export interface ProductImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'], meta: { name: 'ProductImage' } }
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     * 
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productImageWithIdOnly = await prisma.productImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductImageFindManyArgs>(args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     * 
     */
    create<T extends ProductImageCreateArgs>(args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductImageCreateManyArgs>(args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     * 
     */
    delete<T extends ProductImageDeleteArgs>(args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductImageUpdateArgs>(args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductImageUpdateManyArgs>(args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
    **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductImageAggregateArgs>(args: Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
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
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductImage model
   */
  readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the ProductImage model
   */ 
  interface ProductImageFieldRefs {
    readonly id: FieldRef<"ProductImage", 'Int'>
    readonly url: FieldRef<"ProductImage", 'String'>
    readonly sortOrder: FieldRef<"ProductImage", 'Int'>
    readonly productId: FieldRef<"ProductImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
  }

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
  }

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
  }

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to delete.
     */
    limit?: number
  }

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
  }


  /**
   * Model ProductInfoFile
   */

  export type AggregateProductInfoFile = {
    _count: ProductInfoFileCountAggregateOutputType | null
    _avg: ProductInfoFileAvgAggregateOutputType | null
    _sum: ProductInfoFileSumAggregateOutputType | null
    _min: ProductInfoFileMinAggregateOutputType | null
    _max: ProductInfoFileMaxAggregateOutputType | null
  }

  export type ProductInfoFileAvgAggregateOutputType = {
    id: number | null
    size: number | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductInfoFileSumAggregateOutputType = {
    id: number | null
    size: number | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductInfoFileMinAggregateOutputType = {
    id: number | null
    url: string | null
    filename: string | null
    originalname: string | null
    mimetype: string | null
    size: number | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductInfoFileMaxAggregateOutputType = {
    id: number | null
    url: string | null
    filename: string | null
    originalname: string | null
    mimetype: string | null
    size: number | null
    sortOrder: number | null
    productId: number | null
  }

  export type ProductInfoFileCountAggregateOutputType = {
    id: number
    url: number
    filename: number
    originalname: number
    mimetype: number
    size: number
    sortOrder: number
    productId: number
    _all: number
  }


  export type ProductInfoFileAvgAggregateInputType = {
    id?: true
    size?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductInfoFileSumAggregateInputType = {
    id?: true
    size?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductInfoFileMinAggregateInputType = {
    id?: true
    url?: true
    filename?: true
    originalname?: true
    mimetype?: true
    size?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductInfoFileMaxAggregateInputType = {
    id?: true
    url?: true
    filename?: true
    originalname?: true
    mimetype?: true
    size?: true
    sortOrder?: true
    productId?: true
  }

  export type ProductInfoFileCountAggregateInputType = {
    id?: true
    url?: true
    filename?: true
    originalname?: true
    mimetype?: true
    size?: true
    sortOrder?: true
    productId?: true
    _all?: true
  }

  export type ProductInfoFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductInfoFile to aggregate.
     */
    where?: ProductInfoFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductInfoFiles to fetch.
     */
    orderBy?: ProductInfoFileOrderByWithRelationInput | ProductInfoFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductInfoFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductInfoFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductInfoFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductInfoFiles
    **/
    _count?: true | ProductInfoFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductInfoFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductInfoFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductInfoFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductInfoFileMaxAggregateInputType
  }

  export type GetProductInfoFileAggregateType<T extends ProductInfoFileAggregateArgs> = {
        [P in keyof T & keyof AggregateProductInfoFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductInfoFile[P]>
      : GetScalarType<T[P], AggregateProductInfoFile[P]>
  }




  export type ProductInfoFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductInfoFileWhereInput
    orderBy?: ProductInfoFileOrderByWithAggregationInput | ProductInfoFileOrderByWithAggregationInput[]
    by: ProductInfoFileScalarFieldEnum[] | ProductInfoFileScalarFieldEnum
    having?: ProductInfoFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductInfoFileCountAggregateInputType | true
    _avg?: ProductInfoFileAvgAggregateInputType
    _sum?: ProductInfoFileSumAggregateInputType
    _min?: ProductInfoFileMinAggregateInputType
    _max?: ProductInfoFileMaxAggregateInputType
  }

  export type ProductInfoFileGroupByOutputType = {
    id: number
    url: string
    filename: string
    originalname: string | null
    mimetype: string | null
    size: number | null
    sortOrder: number
    productId: number
    _count: ProductInfoFileCountAggregateOutputType | null
    _avg: ProductInfoFileAvgAggregateOutputType | null
    _sum: ProductInfoFileSumAggregateOutputType | null
    _min: ProductInfoFileMinAggregateOutputType | null
    _max: ProductInfoFileMaxAggregateOutputType | null
  }

  type GetProductInfoFileGroupByPayload<T extends ProductInfoFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductInfoFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductInfoFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductInfoFileGroupByOutputType[P]>
            : GetScalarType<T[P], ProductInfoFileGroupByOutputType[P]>
        }
      >
    >


  export type ProductInfoFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    filename?: boolean
    originalname?: boolean
    mimetype?: boolean
    size?: boolean
    sortOrder?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productInfoFile"]>



  export type ProductInfoFileSelectScalar = {
    id?: boolean
    url?: boolean
    filename?: boolean
    originalname?: boolean
    mimetype?: boolean
    size?: boolean
    sortOrder?: boolean
    productId?: boolean
  }

  export type ProductInfoFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "filename" | "originalname" | "mimetype" | "size" | "sortOrder" | "productId", ExtArgs["result"]["productInfoFile"]>
  export type ProductInfoFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductInfoFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductInfoFile"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      filename: string
      originalname: string | null
      mimetype: string | null
      size: number | null
      sortOrder: number
      productId: number
    }, ExtArgs["result"]["productInfoFile"]>
    composites: {}
  }

  type ProductInfoFileGetPayload<S extends boolean | null | undefined | ProductInfoFileDefaultArgs> = $Result.GetResult<Prisma.$ProductInfoFilePayload, S>

  type ProductInfoFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductInfoFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductInfoFileCountAggregateInputType | true
    }

  export interface ProductInfoFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductInfoFile'], meta: { name: 'ProductInfoFile' } }
    /**
     * Find zero or one ProductInfoFile that matches the filter.
     * @param {ProductInfoFileFindUniqueArgs} args - Arguments to find a ProductInfoFile
     * @example
     * // Get one ProductInfoFile
     * const productInfoFile = await prisma.productInfoFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductInfoFileFindUniqueArgs>(args: SelectSubset<T, ProductInfoFileFindUniqueArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ProductInfoFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductInfoFileFindUniqueOrThrowArgs} args - Arguments to find a ProductInfoFile
     * @example
     * // Get one ProductInfoFile
     * const productInfoFile = await prisma.productInfoFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductInfoFileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductInfoFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ProductInfoFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileFindFirstArgs} args - Arguments to find a ProductInfoFile
     * @example
     * // Get one ProductInfoFile
     * const productInfoFile = await prisma.productInfoFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductInfoFileFindFirstArgs>(args?: SelectSubset<T, ProductInfoFileFindFirstArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ProductInfoFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileFindFirstOrThrowArgs} args - Arguments to find a ProductInfoFile
     * @example
     * // Get one ProductInfoFile
     * const productInfoFile = await prisma.productInfoFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductInfoFileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductInfoFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ProductInfoFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductInfoFiles
     * const productInfoFiles = await prisma.productInfoFile.findMany()
     * 
     * // Get first 10 ProductInfoFiles
     * const productInfoFiles = await prisma.productInfoFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productInfoFileWithIdOnly = await prisma.productInfoFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductInfoFileFindManyArgs>(args?: SelectSubset<T, ProductInfoFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ProductInfoFile.
     * @param {ProductInfoFileCreateArgs} args - Arguments to create a ProductInfoFile.
     * @example
     * // Create one ProductInfoFile
     * const ProductInfoFile = await prisma.productInfoFile.create({
     *   data: {
     *     // ... data to create a ProductInfoFile
     *   }
     * })
     * 
     */
    create<T extends ProductInfoFileCreateArgs>(args: SelectSubset<T, ProductInfoFileCreateArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ProductInfoFiles.
     * @param {ProductInfoFileCreateManyArgs} args - Arguments to create many ProductInfoFiles.
     * @example
     * // Create many ProductInfoFiles
     * const productInfoFile = await prisma.productInfoFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductInfoFileCreateManyArgs>(args?: SelectSubset<T, ProductInfoFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductInfoFile.
     * @param {ProductInfoFileDeleteArgs} args - Arguments to delete one ProductInfoFile.
     * @example
     * // Delete one ProductInfoFile
     * const ProductInfoFile = await prisma.productInfoFile.delete({
     *   where: {
     *     // ... filter to delete one ProductInfoFile
     *   }
     * })
     * 
     */
    delete<T extends ProductInfoFileDeleteArgs>(args: SelectSubset<T, ProductInfoFileDeleteArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ProductInfoFile.
     * @param {ProductInfoFileUpdateArgs} args - Arguments to update one ProductInfoFile.
     * @example
     * // Update one ProductInfoFile
     * const productInfoFile = await prisma.productInfoFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductInfoFileUpdateArgs>(args: SelectSubset<T, ProductInfoFileUpdateArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ProductInfoFiles.
     * @param {ProductInfoFileDeleteManyArgs} args - Arguments to filter ProductInfoFiles to delete.
     * @example
     * // Delete a few ProductInfoFiles
     * const { count } = await prisma.productInfoFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductInfoFileDeleteManyArgs>(args?: SelectSubset<T, ProductInfoFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductInfoFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductInfoFiles
     * const productInfoFile = await prisma.productInfoFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductInfoFileUpdateManyArgs>(args: SelectSubset<T, ProductInfoFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductInfoFile.
     * @param {ProductInfoFileUpsertArgs} args - Arguments to update or create a ProductInfoFile.
     * @example
     * // Update or create a ProductInfoFile
     * const productInfoFile = await prisma.productInfoFile.upsert({
     *   create: {
     *     // ... data to create a ProductInfoFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductInfoFile we want to update
     *   }
     * })
     */
    upsert<T extends ProductInfoFileUpsertArgs>(args: SelectSubset<T, ProductInfoFileUpsertArgs<ExtArgs>>): Prisma__ProductInfoFileClient<$Result.GetResult<Prisma.$ProductInfoFilePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ProductInfoFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileCountArgs} args - Arguments to filter ProductInfoFiles to count.
     * @example
     * // Count the number of ProductInfoFiles
     * const count = await prisma.productInfoFile.count({
     *   where: {
     *     // ... the filter for the ProductInfoFiles we want to count
     *   }
     * })
    **/
    count<T extends ProductInfoFileCountArgs>(
      args?: Subset<T, ProductInfoFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductInfoFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductInfoFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductInfoFileAggregateArgs>(args: Subset<T, ProductInfoFileAggregateArgs>): Prisma.PrismaPromise<GetProductInfoFileAggregateType<T>>

    /**
     * Group by ProductInfoFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductInfoFileGroupByArgs} args - Group by arguments.
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
      T extends ProductInfoFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductInfoFileGroupByArgs['orderBy'] }
        : { orderBy?: ProductInfoFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductInfoFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductInfoFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductInfoFile model
   */
  readonly fields: ProductInfoFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductInfoFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductInfoFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the ProductInfoFile model
   */ 
  interface ProductInfoFileFieldRefs {
    readonly id: FieldRef<"ProductInfoFile", 'Int'>
    readonly url: FieldRef<"ProductInfoFile", 'String'>
    readonly filename: FieldRef<"ProductInfoFile", 'String'>
    readonly originalname: FieldRef<"ProductInfoFile", 'String'>
    readonly mimetype: FieldRef<"ProductInfoFile", 'String'>
    readonly size: FieldRef<"ProductInfoFile", 'Int'>
    readonly sortOrder: FieldRef<"ProductInfoFile", 'Int'>
    readonly productId: FieldRef<"ProductInfoFile", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductInfoFile findUnique
   */
  export type ProductInfoFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * Filter, which ProductInfoFile to fetch.
     */
    where: ProductInfoFileWhereUniqueInput
  }

  /**
   * ProductInfoFile findUniqueOrThrow
   */
  export type ProductInfoFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * Filter, which ProductInfoFile to fetch.
     */
    where: ProductInfoFileWhereUniqueInput
  }

  /**
   * ProductInfoFile findFirst
   */
  export type ProductInfoFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * Filter, which ProductInfoFile to fetch.
     */
    where?: ProductInfoFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductInfoFiles to fetch.
     */
    orderBy?: ProductInfoFileOrderByWithRelationInput | ProductInfoFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductInfoFiles.
     */
    cursor?: ProductInfoFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductInfoFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductInfoFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductInfoFiles.
     */
    distinct?: ProductInfoFileScalarFieldEnum | ProductInfoFileScalarFieldEnum[]
  }

  /**
   * ProductInfoFile findFirstOrThrow
   */
  export type ProductInfoFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * Filter, which ProductInfoFile to fetch.
     */
    where?: ProductInfoFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductInfoFiles to fetch.
     */
    orderBy?: ProductInfoFileOrderByWithRelationInput | ProductInfoFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductInfoFiles.
     */
    cursor?: ProductInfoFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductInfoFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductInfoFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductInfoFiles.
     */
    distinct?: ProductInfoFileScalarFieldEnum | ProductInfoFileScalarFieldEnum[]
  }

  /**
   * ProductInfoFile findMany
   */
  export type ProductInfoFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * Filter, which ProductInfoFiles to fetch.
     */
    where?: ProductInfoFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductInfoFiles to fetch.
     */
    orderBy?: ProductInfoFileOrderByWithRelationInput | ProductInfoFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductInfoFiles.
     */
    cursor?: ProductInfoFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductInfoFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductInfoFiles.
     */
    skip?: number
    distinct?: ProductInfoFileScalarFieldEnum | ProductInfoFileScalarFieldEnum[]
  }

  /**
   * ProductInfoFile create
   */
  export type ProductInfoFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductInfoFile.
     */
    data: XOR<ProductInfoFileCreateInput, ProductInfoFileUncheckedCreateInput>
  }

  /**
   * ProductInfoFile createMany
   */
  export type ProductInfoFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductInfoFiles.
     */
    data: ProductInfoFileCreateManyInput | ProductInfoFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductInfoFile update
   */
  export type ProductInfoFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductInfoFile.
     */
    data: XOR<ProductInfoFileUpdateInput, ProductInfoFileUncheckedUpdateInput>
    /**
     * Choose, which ProductInfoFile to update.
     */
    where: ProductInfoFileWhereUniqueInput
  }

  /**
   * ProductInfoFile updateMany
   */
  export type ProductInfoFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductInfoFiles.
     */
    data: XOR<ProductInfoFileUpdateManyMutationInput, ProductInfoFileUncheckedUpdateManyInput>
    /**
     * Filter which ProductInfoFiles to update
     */
    where?: ProductInfoFileWhereInput
    /**
     * Limit how many ProductInfoFiles to update.
     */
    limit?: number
  }

  /**
   * ProductInfoFile upsert
   */
  export type ProductInfoFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductInfoFile to update in case it exists.
     */
    where: ProductInfoFileWhereUniqueInput
    /**
     * In case the ProductInfoFile found by the `where` argument doesn't exist, create a new ProductInfoFile with this data.
     */
    create: XOR<ProductInfoFileCreateInput, ProductInfoFileUncheckedCreateInput>
    /**
     * In case the ProductInfoFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductInfoFileUpdateInput, ProductInfoFileUncheckedUpdateInput>
  }

  /**
   * ProductInfoFile delete
   */
  export type ProductInfoFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
    /**
     * Filter which ProductInfoFile to delete.
     */
    where: ProductInfoFileWhereUniqueInput
  }

  /**
   * ProductInfoFile deleteMany
   */
  export type ProductInfoFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductInfoFiles to delete
     */
    where?: ProductInfoFileWhereInput
    /**
     * Limit how many ProductInfoFiles to delete.
     */
    limit?: number
  }

  /**
   * ProductInfoFile without action
   */
  export type ProductInfoFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductInfoFile
     */
    select?: ProductInfoFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductInfoFile
     */
    omit?: ProductInfoFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInfoFileInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    id: number | null
    subtotal: number | null
    deliveryFee: number | null
    total: number | null
    expectedMileageKm: number | null
  }

  export type OrderSumAggregateOutputType = {
    id: number | null
    subtotal: number | null
    deliveryFee: number | null
    total: number | null
    expectedMileageKm: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: number | null
    customerName: string | null
    email: string | null
    phone: string | null
    address: string | null
    deliveryMethod: $Enums.DeliveryMethod | null
    note: string | null
    status: $Enums.OrderStatus | null
    adminStatus: $Enums.AdminRequestStatus | null
    subtotal: number | null
    deliveryFee: number | null
    total: number | null
    rentalPlace: string | null
    rentalFrom: Date | null
    rentalTo: Date | null
    country: string | null
    city: string | null
    postalCode: string | null
    street: string | null
    expectedMileageKm: number | null
    visitCountries: string | null
    rentalAccessories: string | null
    createdAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: number | null
    customerName: string | null
    email: string | null
    phone: string | null
    address: string | null
    deliveryMethod: $Enums.DeliveryMethod | null
    note: string | null
    status: $Enums.OrderStatus | null
    adminStatus: $Enums.AdminRequestStatus | null
    subtotal: number | null
    deliveryFee: number | null
    total: number | null
    rentalPlace: string | null
    rentalFrom: Date | null
    rentalTo: Date | null
    country: string | null
    city: string | null
    postalCode: string | null
    street: string | null
    expectedMileageKm: number | null
    visitCountries: string | null
    rentalAccessories: string | null
    createdAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    customerName: number
    email: number
    phone: number
    address: number
    deliveryMethod: number
    note: number
    status: number
    adminStatus: number
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace: number
    rentalFrom: number
    rentalTo: number
    country: number
    city: number
    postalCode: number
    street: number
    expectedMileageKm: number
    visitCountries: number
    rentalAccessories: number
    createdAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    id?: true
    subtotal?: true
    deliveryFee?: true
    total?: true
    expectedMileageKm?: true
  }

  export type OrderSumAggregateInputType = {
    id?: true
    subtotal?: true
    deliveryFee?: true
    total?: true
    expectedMileageKm?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    customerName?: true
    email?: true
    phone?: true
    address?: true
    deliveryMethod?: true
    note?: true
    status?: true
    adminStatus?: true
    subtotal?: true
    deliveryFee?: true
    total?: true
    rentalPlace?: true
    rentalFrom?: true
    rentalTo?: true
    country?: true
    city?: true
    postalCode?: true
    street?: true
    expectedMileageKm?: true
    visitCountries?: true
    rentalAccessories?: true
    createdAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    customerName?: true
    email?: true
    phone?: true
    address?: true
    deliveryMethod?: true
    note?: true
    status?: true
    adminStatus?: true
    subtotal?: true
    deliveryFee?: true
    total?: true
    rentalPlace?: true
    rentalFrom?: true
    rentalTo?: true
    country?: true
    city?: true
    postalCode?: true
    street?: true
    expectedMileageKm?: true
    visitCountries?: true
    rentalAccessories?: true
    createdAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    customerName?: true
    email?: true
    phone?: true
    address?: true
    deliveryMethod?: true
    note?: true
    status?: true
    adminStatus?: true
    subtotal?: true
    deliveryFee?: true
    total?: true
    rentalPlace?: true
    rentalFrom?: true
    rentalTo?: true
    country?: true
    city?: true
    postalCode?: true
    street?: true
    expectedMileageKm?: true
    visitCountries?: true
    rentalAccessories?: true
    createdAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: number
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note: string | null
    status: $Enums.OrderStatus
    adminStatus: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace: string | null
    rentalFrom: Date | null
    rentalTo: Date | null
    country: string | null
    city: string | null
    postalCode: string | null
    street: string | null
    expectedMileageKm: number | null
    visitCountries: string | null
    rentalAccessories: string | null
    createdAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    deliveryMethod?: boolean
    note?: boolean
    status?: boolean
    adminStatus?: boolean
    subtotal?: boolean
    deliveryFee?: boolean
    total?: boolean
    rentalPlace?: boolean
    rentalFrom?: boolean
    rentalTo?: boolean
    country?: boolean
    city?: boolean
    postalCode?: boolean
    street?: boolean
    expectedMileageKm?: boolean
    visitCountries?: boolean
    rentalAccessories?: boolean
    createdAt?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    emails?: boolean | Order$emailsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    customerName?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    deliveryMethod?: boolean
    note?: boolean
    status?: boolean
    adminStatus?: boolean
    subtotal?: boolean
    deliveryFee?: boolean
    total?: boolean
    rentalPlace?: boolean
    rentalFrom?: boolean
    rentalTo?: boolean
    country?: boolean
    city?: boolean
    postalCode?: boolean
    street?: boolean
    expectedMileageKm?: boolean
    visitCountries?: boolean
    rentalAccessories?: boolean
    createdAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "email" | "phone" | "address" | "deliveryMethod" | "note" | "status" | "adminStatus" | "subtotal" | "deliveryFee" | "total" | "rentalPlace" | "rentalFrom" | "rentalTo" | "country" | "city" | "postalCode" | "street" | "expectedMileageKm" | "visitCountries" | "rentalAccessories" | "createdAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    emails?: boolean | Order$emailsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      emails: Prisma.$OrderEmailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      customerName: string
      email: string
      phone: string
      address: string
      deliveryMethod: $Enums.DeliveryMethod
      note: string | null
      status: $Enums.OrderStatus
      adminStatus: $Enums.AdminRequestStatus
      subtotal: number
      deliveryFee: number
      total: number
      rentalPlace: string | null
      rentalFrom: Date | null
      rentalTo: Date | null
      country: string | null
      city: string | null
      postalCode: string | null
      street: string | null
      expectedMileageKm: number | null
      visitCountries: string | null
      rentalAccessories: string | null
      createdAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    emails<T extends Order$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Order$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'Int'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly email: FieldRef<"Order", 'String'>
    readonly phone: FieldRef<"Order", 'String'>
    readonly address: FieldRef<"Order", 'String'>
    readonly deliveryMethod: FieldRef<"Order", 'DeliveryMethod'>
    readonly note: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly adminStatus: FieldRef<"Order", 'AdminRequestStatus'>
    readonly subtotal: FieldRef<"Order", 'Int'>
    readonly deliveryFee: FieldRef<"Order", 'Int'>
    readonly total: FieldRef<"Order", 'Int'>
    readonly rentalPlace: FieldRef<"Order", 'String'>
    readonly rentalFrom: FieldRef<"Order", 'DateTime'>
    readonly rentalTo: FieldRef<"Order", 'DateTime'>
    readonly country: FieldRef<"Order", 'String'>
    readonly city: FieldRef<"Order", 'String'>
    readonly postalCode: FieldRef<"Order", 'String'>
    readonly street: FieldRef<"Order", 'String'>
    readonly expectedMileageKm: FieldRef<"Order", 'Int'>
    readonly visitCountries: FieldRef<"Order", 'String'>
    readonly rentalAccessories: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.emails
   */
  export type Order$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    where?: OrderEmailWhereInput
    orderBy?: OrderEmailOrderByWithRelationInput | OrderEmailOrderByWithRelationInput[]
    cursor?: OrderEmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderEmailScalarFieldEnum | OrderEmailScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    qty: number | null
    unitPrice: number | null
    lineTotal: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    qty: number | null
    unitPrice: number | null
    lineTotal: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    qty: number | null
    unitPrice: number | null
    lineTotal: number | null
    createdAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    qty: number | null
    unitPrice: number | null
    lineTotal: number | null
    createdAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    qty?: true
    unitPrice?: true
    lineTotal?: true
  }

  export type OrderItemSumAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    qty?: true
    unitPrice?: true
    lineTotal?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    qty?: true
    unitPrice?: true
    lineTotal?: true
    createdAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    qty?: true
    unitPrice?: true
    lineTotal?: true
    createdAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    qty?: true
    unitPrice?: true
    lineTotal?: true
    createdAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: number
    orderId: number
    productId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    qty?: boolean
    unitPrice?: boolean
    lineTotal?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>



  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    qty?: boolean
    unitPrice?: boolean
    lineTotal?: boolean
    createdAt?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "qty" | "unitPrice" | "lineTotal" | "createdAt", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      productId: number
      qty: number
      unitPrice: number
      lineTotal: number
      createdAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the OrderItem model
   */ 
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'Int'>
    readonly orderId: FieldRef<"OrderItem", 'Int'>
    readonly productId: FieldRef<"OrderItem", 'Int'>
    readonly qty: FieldRef<"OrderItem", 'Int'>
    readonly unitPrice: FieldRef<"OrderItem", 'Int'>
    readonly lineTotal: FieldRef<"OrderItem", 'Int'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model OrderEmail
   */

  export type AggregateOrderEmail = {
    _count: OrderEmailCountAggregateOutputType | null
    _avg: OrderEmailAvgAggregateOutputType | null
    _sum: OrderEmailSumAggregateOutputType | null
    _min: OrderEmailMinAggregateOutputType | null
    _max: OrderEmailMaxAggregateOutputType | null
  }

  export type OrderEmailAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    attempts: number | null
  }

  export type OrderEmailSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    attempts: number | null
  }

  export type OrderEmailMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    kind: $Enums.OrderEmailKind | null
    to: string | null
    subject: string | null
    html: string | null
    status: $Enums.OrderEmailStatus | null
    attempts: number | null
    lastError: string | null
    sentAt: Date | null
    providerMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderEmailMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    kind: $Enums.OrderEmailKind | null
    to: string | null
    subject: string | null
    html: string | null
    status: $Enums.OrderEmailStatus | null
    attempts: number | null
    lastError: string | null
    sentAt: Date | null
    providerMessageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderEmailCountAggregateOutputType = {
    id: number
    orderId: number
    kind: number
    to: number
    subject: number
    html: number
    status: number
    attempts: number
    lastError: number
    sentAt: number
    providerMessageId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderEmailAvgAggregateInputType = {
    id?: true
    orderId?: true
    attempts?: true
  }

  export type OrderEmailSumAggregateInputType = {
    id?: true
    orderId?: true
    attempts?: true
  }

  export type OrderEmailMinAggregateInputType = {
    id?: true
    orderId?: true
    kind?: true
    to?: true
    subject?: true
    html?: true
    status?: true
    attempts?: true
    lastError?: true
    sentAt?: true
    providerMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderEmailMaxAggregateInputType = {
    id?: true
    orderId?: true
    kind?: true
    to?: true
    subject?: true
    html?: true
    status?: true
    attempts?: true
    lastError?: true
    sentAt?: true
    providerMessageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderEmailCountAggregateInputType = {
    id?: true
    orderId?: true
    kind?: true
    to?: true
    subject?: true
    html?: true
    status?: true
    attempts?: true
    lastError?: true
    sentAt?: true
    providerMessageId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderEmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderEmail to aggregate.
     */
    where?: OrderEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEmails to fetch.
     */
    orderBy?: OrderEmailOrderByWithRelationInput | OrderEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderEmails
    **/
    _count?: true | OrderEmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderEmailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderEmailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderEmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderEmailMaxAggregateInputType
  }

  export type GetOrderEmailAggregateType<T extends OrderEmailAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderEmail[P]>
      : GetScalarType<T[P], AggregateOrderEmail[P]>
  }




  export type OrderEmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderEmailWhereInput
    orderBy?: OrderEmailOrderByWithAggregationInput | OrderEmailOrderByWithAggregationInput[]
    by: OrderEmailScalarFieldEnum[] | OrderEmailScalarFieldEnum
    having?: OrderEmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderEmailCountAggregateInputType | true
    _avg?: OrderEmailAvgAggregateInputType
    _sum?: OrderEmailSumAggregateInputType
    _min?: OrderEmailMinAggregateInputType
    _max?: OrderEmailMaxAggregateInputType
  }

  export type OrderEmailGroupByOutputType = {
    id: number
    orderId: number
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status: $Enums.OrderEmailStatus
    attempts: number
    lastError: string | null
    sentAt: Date | null
    providerMessageId: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderEmailCountAggregateOutputType | null
    _avg: OrderEmailAvgAggregateOutputType | null
    _sum: OrderEmailSumAggregateOutputType | null
    _min: OrderEmailMinAggregateOutputType | null
    _max: OrderEmailMaxAggregateOutputType | null
  }

  type GetOrderEmailGroupByPayload<T extends OrderEmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderEmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderEmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderEmailGroupByOutputType[P]>
            : GetScalarType<T[P], OrderEmailGroupByOutputType[P]>
        }
      >
    >


  export type OrderEmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    kind?: boolean
    to?: boolean
    subject?: boolean
    html?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    sentAt?: boolean
    providerMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderEmail"]>



  export type OrderEmailSelectScalar = {
    id?: boolean
    orderId?: boolean
    kind?: boolean
    to?: boolean
    subject?: boolean
    html?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    sentAt?: boolean
    providerMessageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderEmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "kind" | "to" | "subject" | "html" | "status" | "attempts" | "lastError" | "sentAt" | "providerMessageId" | "createdAt" | "updatedAt", ExtArgs["result"]["orderEmail"]>
  export type OrderEmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderEmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderEmail"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      kind: $Enums.OrderEmailKind
      to: string
      subject: string
      html: string
      status: $Enums.OrderEmailStatus
      attempts: number
      lastError: string | null
      sentAt: Date | null
      providerMessageId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["orderEmail"]>
    composites: {}
  }

  type OrderEmailGetPayload<S extends boolean | null | undefined | OrderEmailDefaultArgs> = $Result.GetResult<Prisma.$OrderEmailPayload, S>

  type OrderEmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderEmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderEmailCountAggregateInputType | true
    }

  export interface OrderEmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderEmail'], meta: { name: 'OrderEmail' } }
    /**
     * Find zero or one OrderEmail that matches the filter.
     * @param {OrderEmailFindUniqueArgs} args - Arguments to find a OrderEmail
     * @example
     * // Get one OrderEmail
     * const orderEmail = await prisma.orderEmail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderEmailFindUniqueArgs>(args: SelectSubset<T, OrderEmailFindUniqueArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one OrderEmail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderEmailFindUniqueOrThrowArgs} args - Arguments to find a OrderEmail
     * @example
     * // Get one OrderEmail
     * const orderEmail = await prisma.orderEmail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderEmailFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderEmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first OrderEmail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailFindFirstArgs} args - Arguments to find a OrderEmail
     * @example
     * // Get one OrderEmail
     * const orderEmail = await prisma.orderEmail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderEmailFindFirstArgs>(args?: SelectSubset<T, OrderEmailFindFirstArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first OrderEmail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailFindFirstOrThrowArgs} args - Arguments to find a OrderEmail
     * @example
     * // Get one OrderEmail
     * const orderEmail = await prisma.orderEmail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderEmailFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderEmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more OrderEmails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderEmails
     * const orderEmails = await prisma.orderEmail.findMany()
     * 
     * // Get first 10 OrderEmails
     * const orderEmails = await prisma.orderEmail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderEmailWithIdOnly = await prisma.orderEmail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderEmailFindManyArgs>(args?: SelectSubset<T, OrderEmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a OrderEmail.
     * @param {OrderEmailCreateArgs} args - Arguments to create a OrderEmail.
     * @example
     * // Create one OrderEmail
     * const OrderEmail = await prisma.orderEmail.create({
     *   data: {
     *     // ... data to create a OrderEmail
     *   }
     * })
     * 
     */
    create<T extends OrderEmailCreateArgs>(args: SelectSubset<T, OrderEmailCreateArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many OrderEmails.
     * @param {OrderEmailCreateManyArgs} args - Arguments to create many OrderEmails.
     * @example
     * // Create many OrderEmails
     * const orderEmail = await prisma.orderEmail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderEmailCreateManyArgs>(args?: SelectSubset<T, OrderEmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderEmail.
     * @param {OrderEmailDeleteArgs} args - Arguments to delete one OrderEmail.
     * @example
     * // Delete one OrderEmail
     * const OrderEmail = await prisma.orderEmail.delete({
     *   where: {
     *     // ... filter to delete one OrderEmail
     *   }
     * })
     * 
     */
    delete<T extends OrderEmailDeleteArgs>(args: SelectSubset<T, OrderEmailDeleteArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one OrderEmail.
     * @param {OrderEmailUpdateArgs} args - Arguments to update one OrderEmail.
     * @example
     * // Update one OrderEmail
     * const orderEmail = await prisma.orderEmail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderEmailUpdateArgs>(args: SelectSubset<T, OrderEmailUpdateArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more OrderEmails.
     * @param {OrderEmailDeleteManyArgs} args - Arguments to filter OrderEmails to delete.
     * @example
     * // Delete a few OrderEmails
     * const { count } = await prisma.orderEmail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderEmailDeleteManyArgs>(args?: SelectSubset<T, OrderEmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderEmails
     * const orderEmail = await prisma.orderEmail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderEmailUpdateManyArgs>(args: SelectSubset<T, OrderEmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderEmail.
     * @param {OrderEmailUpsertArgs} args - Arguments to update or create a OrderEmail.
     * @example
     * // Update or create a OrderEmail
     * const orderEmail = await prisma.orderEmail.upsert({
     *   create: {
     *     // ... data to create a OrderEmail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderEmail we want to update
     *   }
     * })
     */
    upsert<T extends OrderEmailUpsertArgs>(args: SelectSubset<T, OrderEmailUpsertArgs<ExtArgs>>): Prisma__OrderEmailClient<$Result.GetResult<Prisma.$OrderEmailPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of OrderEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailCountArgs} args - Arguments to filter OrderEmails to count.
     * @example
     * // Count the number of OrderEmails
     * const count = await prisma.orderEmail.count({
     *   where: {
     *     // ... the filter for the OrderEmails we want to count
     *   }
     * })
    **/
    count<T extends OrderEmailCountArgs>(
      args?: Subset<T, OrderEmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderEmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderEmailAggregateArgs>(args: Subset<T, OrderEmailAggregateArgs>): Prisma.PrismaPromise<GetOrderEmailAggregateType<T>>

    /**
     * Group by OrderEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderEmailGroupByArgs} args - Group by arguments.
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
      T extends OrderEmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderEmailGroupByArgs['orderBy'] }
        : { orderBy?: OrderEmailGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderEmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderEmail model
   */
  readonly fields: OrderEmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderEmail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderEmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the OrderEmail model
   */ 
  interface OrderEmailFieldRefs {
    readonly id: FieldRef<"OrderEmail", 'Int'>
    readonly orderId: FieldRef<"OrderEmail", 'Int'>
    readonly kind: FieldRef<"OrderEmail", 'OrderEmailKind'>
    readonly to: FieldRef<"OrderEmail", 'String'>
    readonly subject: FieldRef<"OrderEmail", 'String'>
    readonly html: FieldRef<"OrderEmail", 'String'>
    readonly status: FieldRef<"OrderEmail", 'OrderEmailStatus'>
    readonly attempts: FieldRef<"OrderEmail", 'Int'>
    readonly lastError: FieldRef<"OrderEmail", 'String'>
    readonly sentAt: FieldRef<"OrderEmail", 'DateTime'>
    readonly providerMessageId: FieldRef<"OrderEmail", 'String'>
    readonly createdAt: FieldRef<"OrderEmail", 'DateTime'>
    readonly updatedAt: FieldRef<"OrderEmail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderEmail findUnique
   */
  export type OrderEmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * Filter, which OrderEmail to fetch.
     */
    where: OrderEmailWhereUniqueInput
  }

  /**
   * OrderEmail findUniqueOrThrow
   */
  export type OrderEmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * Filter, which OrderEmail to fetch.
     */
    where: OrderEmailWhereUniqueInput
  }

  /**
   * OrderEmail findFirst
   */
  export type OrderEmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * Filter, which OrderEmail to fetch.
     */
    where?: OrderEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEmails to fetch.
     */
    orderBy?: OrderEmailOrderByWithRelationInput | OrderEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderEmails.
     */
    cursor?: OrderEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderEmails.
     */
    distinct?: OrderEmailScalarFieldEnum | OrderEmailScalarFieldEnum[]
  }

  /**
   * OrderEmail findFirstOrThrow
   */
  export type OrderEmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * Filter, which OrderEmail to fetch.
     */
    where?: OrderEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEmails to fetch.
     */
    orderBy?: OrderEmailOrderByWithRelationInput | OrderEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderEmails.
     */
    cursor?: OrderEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderEmails.
     */
    distinct?: OrderEmailScalarFieldEnum | OrderEmailScalarFieldEnum[]
  }

  /**
   * OrderEmail findMany
   */
  export type OrderEmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * Filter, which OrderEmails to fetch.
     */
    where?: OrderEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderEmails to fetch.
     */
    orderBy?: OrderEmailOrderByWithRelationInput | OrderEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderEmails.
     */
    cursor?: OrderEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderEmails.
     */
    skip?: number
    distinct?: OrderEmailScalarFieldEnum | OrderEmailScalarFieldEnum[]
  }

  /**
   * OrderEmail create
   */
  export type OrderEmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderEmail.
     */
    data: XOR<OrderEmailCreateInput, OrderEmailUncheckedCreateInput>
  }

  /**
   * OrderEmail createMany
   */
  export type OrderEmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderEmails.
     */
    data: OrderEmailCreateManyInput | OrderEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderEmail update
   */
  export type OrderEmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderEmail.
     */
    data: XOR<OrderEmailUpdateInput, OrderEmailUncheckedUpdateInput>
    /**
     * Choose, which OrderEmail to update.
     */
    where: OrderEmailWhereUniqueInput
  }

  /**
   * OrderEmail updateMany
   */
  export type OrderEmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderEmails.
     */
    data: XOR<OrderEmailUpdateManyMutationInput, OrderEmailUncheckedUpdateManyInput>
    /**
     * Filter which OrderEmails to update
     */
    where?: OrderEmailWhereInput
    /**
     * Limit how many OrderEmails to update.
     */
    limit?: number
  }

  /**
   * OrderEmail upsert
   */
  export type OrderEmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderEmail to update in case it exists.
     */
    where: OrderEmailWhereUniqueInput
    /**
     * In case the OrderEmail found by the `where` argument doesn't exist, create a new OrderEmail with this data.
     */
    create: XOR<OrderEmailCreateInput, OrderEmailUncheckedCreateInput>
    /**
     * In case the OrderEmail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderEmailUpdateInput, OrderEmailUncheckedUpdateInput>
  }

  /**
   * OrderEmail delete
   */
  export type OrderEmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
    /**
     * Filter which OrderEmail to delete.
     */
    where: OrderEmailWhereUniqueInput
  }

  /**
   * OrderEmail deleteMany
   */
  export type OrderEmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderEmails to delete
     */
    where?: OrderEmailWhereInput
    /**
     * Limit how many OrderEmails to delete.
     */
    limit?: number
  }

  /**
   * OrderEmail without action
   */
  export type OrderEmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderEmail
     */
    select?: OrderEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderEmail
     */
    omit?: OrderEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderEmailInclude<ExtArgs> | null
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


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    isActive: 'isActive'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const BrandScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    isActive: 'isActive'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    articleNumber: 'articleNumber',
    description: 'description',
    price: 'price',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categoryId: 'categoryId',
    brandId: 'brandId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    sortOrder: 'sortOrder',
    productId: 'productId'
  };

  export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum]


  export const ProductInfoFileScalarFieldEnum: {
    id: 'id',
    url: 'url',
    filename: 'filename',
    originalname: 'originalname',
    mimetype: 'mimetype',
    size: 'size',
    sortOrder: 'sortOrder',
    productId: 'productId'
  };

  export type ProductInfoFileScalarFieldEnum = (typeof ProductInfoFileScalarFieldEnum)[keyof typeof ProductInfoFileScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    email: 'email',
    phone: 'phone',
    address: 'address',
    deliveryMethod: 'deliveryMethod',
    note: 'note',
    status: 'status',
    adminStatus: 'adminStatus',
    subtotal: 'subtotal',
    deliveryFee: 'deliveryFee',
    total: 'total',
    rentalPlace: 'rentalPlace',
    rentalFrom: 'rentalFrom',
    rentalTo: 'rentalTo',
    country: 'country',
    city: 'city',
    postalCode: 'postalCode',
    street: 'street',
    expectedMileageKm: 'expectedMileageKm',
    visitCountries: 'visitCountries',
    rentalAccessories: 'rentalAccessories',
    createdAt: 'createdAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    qty: 'qty',
    unitPrice: 'unitPrice',
    lineTotal: 'lineTotal',
    createdAt: 'createdAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const OrderEmailScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    kind: 'kind',
    to: 'to',
    subject: 'subject',
    html: 'html',
    status: 'status',
    attempts: 'attempts',
    lastError: 'lastError',
    sentAt: 'sentAt',
    providerMessageId: 'providerMessageId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderEmailScalarFieldEnum = (typeof OrderEmailScalarFieldEnum)[keyof typeof OrderEmailScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const CategoryOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug'
  };

  export type CategoryOrderByRelevanceFieldEnum = (typeof CategoryOrderByRelevanceFieldEnum)[keyof typeof CategoryOrderByRelevanceFieldEnum]


  export const BrandOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug'
  };

  export type BrandOrderByRelevanceFieldEnum = (typeof BrandOrderByRelevanceFieldEnum)[keyof typeof BrandOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ProductOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug',
    articleNumber: 'articleNumber',
    description: 'description'
  };

  export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum]


  export const ProductImageOrderByRelevanceFieldEnum: {
    url: 'url'
  };

  export type ProductImageOrderByRelevanceFieldEnum = (typeof ProductImageOrderByRelevanceFieldEnum)[keyof typeof ProductImageOrderByRelevanceFieldEnum]


  export const ProductInfoFileOrderByRelevanceFieldEnum: {
    url: 'url',
    filename: 'filename',
    originalname: 'originalname',
    mimetype: 'mimetype'
  };

  export type ProductInfoFileOrderByRelevanceFieldEnum = (typeof ProductInfoFileOrderByRelevanceFieldEnum)[keyof typeof ProductInfoFileOrderByRelevanceFieldEnum]


  export const OrderOrderByRelevanceFieldEnum: {
    customerName: 'customerName',
    email: 'email',
    phone: 'phone',
    address: 'address',
    note: 'note',
    rentalPlace: 'rentalPlace',
    country: 'country',
    city: 'city',
    postalCode: 'postalCode',
    street: 'street',
    visitCountries: 'visitCountries',
    rentalAccessories: 'rentalAccessories'
  };

  export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum]


  export const OrderEmailOrderByRelevanceFieldEnum: {
    to: 'to',
    subject: 'subject',
    html: 'html',
    lastError: 'lastError',
    providerMessageId: 'providerMessageId'
  };

  export type OrderEmailOrderByRelevanceFieldEnum = (typeof OrderEmailOrderByRelevanceFieldEnum)[keyof typeof OrderEmailOrderByRelevanceFieldEnum]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DeliveryMethod'
   */
  export type EnumDeliveryMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryMethod'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'AdminRequestStatus'
   */
  export type EnumAdminRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRequestStatus'>
    


  /**
   * Reference to a field of type 'OrderEmailKind'
   */
  export type EnumOrderEmailKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderEmailKind'>
    


  /**
   * Reference to a field of type 'OrderEmailStatus'
   */
  export type EnumOrderEmailStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderEmailStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    isActive?: BoolFilter<"Category"> | boolean
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    products?: ProductOrderByRelationAggregateInput
    _relevance?: CategoryOrderByRelevanceInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    isActive?: BoolFilter<"Category"> | boolean
    products?: ProductListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean
  }

  export type BrandWhereInput = {
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    id?: IntFilter<"Brand"> | number
    name?: StringFilter<"Brand"> | string
    slug?: StringFilter<"Brand"> | string
    isActive?: BoolFilter<"Brand"> | boolean
    products?: ProductListRelationFilter
  }

  export type BrandOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    products?: ProductOrderByRelationAggregateInput
    _relevance?: BrandOrderByRelevanceInput
  }

  export type BrandWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    name?: StringFilter<"Brand"> | string
    isActive?: BoolFilter<"Brand"> | boolean
    products?: ProductListRelationFilter
  }, "id" | "slug">

  export type BrandOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _avg?: BrandAvgOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
    _sum?: BrandSumOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    OR?: BrandScalarWhereWithAggregatesInput[]
    NOT?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Brand"> | number
    name?: StringWithAggregatesFilter<"Brand"> | string
    slug?: StringWithAggregatesFilter<"Brand"> | string
    isActive?: BoolWithAggregatesFilter<"Brand"> | boolean
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    articleNumber?: StringNullableFilter<"Product"> | string | null
    description?: StringFilter<"Product"> | string
    price?: IntFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: IntFilter<"Product"> | number
    brandId?: IntNullableFilter<"Product"> | number | null
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    brand?: XOR<BrandNullableScalarRelationFilter, BrandWhereInput> | null
    images?: ProductImageListRelationFilter
    infoFiles?: ProductInfoFileListRelationFilter
    orderItems?: OrderItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articleNumber?: SortOrderInput | SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrderInput | SortOrder
    category?: CategoryOrderByWithRelationInput
    brand?: BrandOrderByWithRelationInput
    images?: ProductImageOrderByRelationAggregateInput
    infoFiles?: ProductInfoFileOrderByRelationAggregateInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    _relevance?: ProductOrderByRelevanceInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    articleNumber?: StringNullableFilter<"Product"> | string | null
    description?: StringFilter<"Product"> | string
    price?: IntFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: IntFilter<"Product"> | number
    brandId?: IntNullableFilter<"Product"> | number | null
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    brand?: XOR<BrandNullableScalarRelationFilter, BrandWhereInput> | null
    images?: ProductImageListRelationFilter
    infoFiles?: ProductInfoFileListRelationFilter
    orderItems?: OrderItemListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articleNumber?: SortOrderInput | SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    articleNumber?: StringNullableWithAggregatesFilter<"Product"> | string | null
    description?: StringWithAggregatesFilter<"Product"> | string
    price?: IntWithAggregatesFilter<"Product"> | number
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    categoryId?: IntWithAggregatesFilter<"Product"> | number
    brandId?: IntNullableWithAggregatesFilter<"Product"> | number | null
  }

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    id?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    sortOrder?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
    product?: ProductOrderByWithRelationInput
    _relevance?: ProductImageOrderByRelevanceInput
  }

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    url?: StringFilter<"ProductImage"> | string
    sortOrder?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
    _count?: ProductImageCountOrderByAggregateInput
    _avg?: ProductImageAvgOrderByAggregateInput
    _max?: ProductImageMaxOrderByAggregateInput
    _min?: ProductImageMinOrderByAggregateInput
    _sum?: ProductImageSumOrderByAggregateInput
  }

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    OR?: ProductImageScalarWhereWithAggregatesInput[]
    NOT?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductImage"> | number
    url?: StringWithAggregatesFilter<"ProductImage"> | string
    sortOrder?: IntWithAggregatesFilter<"ProductImage"> | number
    productId?: IntWithAggregatesFilter<"ProductImage"> | number
  }

  export type ProductInfoFileWhereInput = {
    AND?: ProductInfoFileWhereInput | ProductInfoFileWhereInput[]
    OR?: ProductInfoFileWhereInput[]
    NOT?: ProductInfoFileWhereInput | ProductInfoFileWhereInput[]
    id?: IntFilter<"ProductInfoFile"> | number
    url?: StringFilter<"ProductInfoFile"> | string
    filename?: StringFilter<"ProductInfoFile"> | string
    originalname?: StringNullableFilter<"ProductInfoFile"> | string | null
    mimetype?: StringNullableFilter<"ProductInfoFile"> | string | null
    size?: IntNullableFilter<"ProductInfoFile"> | number | null
    sortOrder?: IntFilter<"ProductInfoFile"> | number
    productId?: IntFilter<"ProductInfoFile"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductInfoFileOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    originalname?: SortOrderInput | SortOrder
    mimetype?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
    product?: ProductOrderByWithRelationInput
    _relevance?: ProductInfoFileOrderByRelevanceInput
  }

  export type ProductInfoFileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    filename?: string
    AND?: ProductInfoFileWhereInput | ProductInfoFileWhereInput[]
    OR?: ProductInfoFileWhereInput[]
    NOT?: ProductInfoFileWhereInput | ProductInfoFileWhereInput[]
    url?: StringFilter<"ProductInfoFile"> | string
    originalname?: StringNullableFilter<"ProductInfoFile"> | string | null
    mimetype?: StringNullableFilter<"ProductInfoFile"> | string | null
    size?: IntNullableFilter<"ProductInfoFile"> | number | null
    sortOrder?: IntFilter<"ProductInfoFile"> | number
    productId?: IntFilter<"ProductInfoFile"> | number
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "filename">

  export type ProductInfoFileOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    originalname?: SortOrderInput | SortOrder
    mimetype?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
    _count?: ProductInfoFileCountOrderByAggregateInput
    _avg?: ProductInfoFileAvgOrderByAggregateInput
    _max?: ProductInfoFileMaxOrderByAggregateInput
    _min?: ProductInfoFileMinOrderByAggregateInput
    _sum?: ProductInfoFileSumOrderByAggregateInput
  }

  export type ProductInfoFileScalarWhereWithAggregatesInput = {
    AND?: ProductInfoFileScalarWhereWithAggregatesInput | ProductInfoFileScalarWhereWithAggregatesInput[]
    OR?: ProductInfoFileScalarWhereWithAggregatesInput[]
    NOT?: ProductInfoFileScalarWhereWithAggregatesInput | ProductInfoFileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductInfoFile"> | number
    url?: StringWithAggregatesFilter<"ProductInfoFile"> | string
    filename?: StringWithAggregatesFilter<"ProductInfoFile"> | string
    originalname?: StringNullableWithAggregatesFilter<"ProductInfoFile"> | string | null
    mimetype?: StringNullableWithAggregatesFilter<"ProductInfoFile"> | string | null
    size?: IntNullableWithAggregatesFilter<"ProductInfoFile"> | number | null
    sortOrder?: IntWithAggregatesFilter<"ProductInfoFile"> | number
    productId?: IntWithAggregatesFilter<"ProductInfoFile"> | number
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: IntFilter<"Order"> | number
    customerName?: StringFilter<"Order"> | string
    email?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    address?: StringFilter<"Order"> | string
    deliveryMethod?: EnumDeliveryMethodFilter<"Order"> | $Enums.DeliveryMethod
    note?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFilter<"Order"> | $Enums.AdminRequestStatus
    subtotal?: IntFilter<"Order"> | number
    deliveryFee?: IntFilter<"Order"> | number
    total?: IntFilter<"Order"> | number
    rentalPlace?: StringNullableFilter<"Order"> | string | null
    rentalFrom?: DateTimeNullableFilter<"Order"> | Date | string | null
    rentalTo?: DateTimeNullableFilter<"Order"> | Date | string | null
    country?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    postalCode?: StringNullableFilter<"Order"> | string | null
    street?: StringNullableFilter<"Order"> | string | null
    expectedMileageKm?: IntNullableFilter<"Order"> | number | null
    visitCountries?: StringNullableFilter<"Order"> | string | null
    rentalAccessories?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
    emails?: OrderEmailListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    deliveryMethod?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    adminStatus?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    rentalPlace?: SortOrderInput | SortOrder
    rentalFrom?: SortOrderInput | SortOrder
    rentalTo?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    street?: SortOrderInput | SortOrder
    expectedMileageKm?: SortOrderInput | SortOrder
    visitCountries?: SortOrderInput | SortOrder
    rentalAccessories?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
    emails?: OrderEmailOrderByRelationAggregateInput
    _relevance?: OrderOrderByRelevanceInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    customerName?: StringFilter<"Order"> | string
    email?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    address?: StringFilter<"Order"> | string
    deliveryMethod?: EnumDeliveryMethodFilter<"Order"> | $Enums.DeliveryMethod
    note?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFilter<"Order"> | $Enums.AdminRequestStatus
    subtotal?: IntFilter<"Order"> | number
    deliveryFee?: IntFilter<"Order"> | number
    total?: IntFilter<"Order"> | number
    rentalPlace?: StringNullableFilter<"Order"> | string | null
    rentalFrom?: DateTimeNullableFilter<"Order"> | Date | string | null
    rentalTo?: DateTimeNullableFilter<"Order"> | Date | string | null
    country?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    postalCode?: StringNullableFilter<"Order"> | string | null
    street?: StringNullableFilter<"Order"> | string | null
    expectedMileageKm?: IntNullableFilter<"Order"> | number | null
    visitCountries?: StringNullableFilter<"Order"> | string | null
    rentalAccessories?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
    emails?: OrderEmailListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    deliveryMethod?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    adminStatus?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    rentalPlace?: SortOrderInput | SortOrder
    rentalFrom?: SortOrderInput | SortOrder
    rentalTo?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    street?: SortOrderInput | SortOrder
    expectedMileageKm?: SortOrderInput | SortOrder
    visitCountries?: SortOrderInput | SortOrder
    rentalAccessories?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Order"> | number
    customerName?: StringWithAggregatesFilter<"Order"> | string
    email?: StringWithAggregatesFilter<"Order"> | string
    phone?: StringWithAggregatesFilter<"Order"> | string
    address?: StringWithAggregatesFilter<"Order"> | string
    deliveryMethod?: EnumDeliveryMethodWithAggregatesFilter<"Order"> | $Enums.DeliveryMethod
    note?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusWithAggregatesFilter<"Order"> | $Enums.AdminRequestStatus
    subtotal?: IntWithAggregatesFilter<"Order"> | number
    deliveryFee?: IntWithAggregatesFilter<"Order"> | number
    total?: IntWithAggregatesFilter<"Order"> | number
    rentalPlace?: StringNullableWithAggregatesFilter<"Order"> | string | null
    rentalFrom?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    rentalTo?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    country?: StringNullableWithAggregatesFilter<"Order"> | string | null
    city?: StringNullableWithAggregatesFilter<"Order"> | string | null
    postalCode?: StringNullableWithAggregatesFilter<"Order"> | string | null
    street?: StringNullableWithAggregatesFilter<"Order"> | string | null
    expectedMileageKm?: IntNullableWithAggregatesFilter<"Order"> | number | null
    visitCountries?: StringNullableWithAggregatesFilter<"Order"> | string | null
    rentalAccessories?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    qty?: IntFilter<"OrderItem"> | number
    unitPrice?: IntFilter<"OrderItem"> | number
    lineTotal?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    qty?: IntFilter<"OrderItem"> | number
    unitPrice?: IntFilter<"OrderItem"> | number
    lineTotal?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
    createdAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderItem"> | number
    orderId?: IntWithAggregatesFilter<"OrderItem"> | number
    productId?: IntWithAggregatesFilter<"OrderItem"> | number
    qty?: IntWithAggregatesFilter<"OrderItem"> | number
    unitPrice?: IntWithAggregatesFilter<"OrderItem"> | number
    lineTotal?: IntWithAggregatesFilter<"OrderItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type OrderEmailWhereInput = {
    AND?: OrderEmailWhereInput | OrderEmailWhereInput[]
    OR?: OrderEmailWhereInput[]
    NOT?: OrderEmailWhereInput | OrderEmailWhereInput[]
    id?: IntFilter<"OrderEmail"> | number
    orderId?: IntFilter<"OrderEmail"> | number
    kind?: EnumOrderEmailKindFilter<"OrderEmail"> | $Enums.OrderEmailKind
    to?: StringFilter<"OrderEmail"> | string
    subject?: StringFilter<"OrderEmail"> | string
    html?: StringFilter<"OrderEmail"> | string
    status?: EnumOrderEmailStatusFilter<"OrderEmail"> | $Enums.OrderEmailStatus
    attempts?: IntFilter<"OrderEmail"> | number
    lastError?: StringNullableFilter<"OrderEmail"> | string | null
    sentAt?: DateTimeNullableFilter<"OrderEmail"> | Date | string | null
    providerMessageId?: StringNullableFilter<"OrderEmail"> | string | null
    createdAt?: DateTimeFilter<"OrderEmail"> | Date | string
    updatedAt?: DateTimeFilter<"OrderEmail"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderEmailOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    kind?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    html?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    _relevance?: OrderEmailOrderByRelevanceInput
  }

  export type OrderEmailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderId_kind?: OrderEmailOrderIdKindCompoundUniqueInput
    AND?: OrderEmailWhereInput | OrderEmailWhereInput[]
    OR?: OrderEmailWhereInput[]
    NOT?: OrderEmailWhereInput | OrderEmailWhereInput[]
    orderId?: IntFilter<"OrderEmail"> | number
    kind?: EnumOrderEmailKindFilter<"OrderEmail"> | $Enums.OrderEmailKind
    to?: StringFilter<"OrderEmail"> | string
    subject?: StringFilter<"OrderEmail"> | string
    html?: StringFilter<"OrderEmail"> | string
    status?: EnumOrderEmailStatusFilter<"OrderEmail"> | $Enums.OrderEmailStatus
    attempts?: IntFilter<"OrderEmail"> | number
    lastError?: StringNullableFilter<"OrderEmail"> | string | null
    sentAt?: DateTimeNullableFilter<"OrderEmail"> | Date | string | null
    providerMessageId?: StringNullableFilter<"OrderEmail"> | string | null
    createdAt?: DateTimeFilter<"OrderEmail"> | Date | string
    updatedAt?: DateTimeFilter<"OrderEmail"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "orderId_kind">

  export type OrderEmailOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    kind?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    html?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    providerMessageId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderEmailCountOrderByAggregateInput
    _avg?: OrderEmailAvgOrderByAggregateInput
    _max?: OrderEmailMaxOrderByAggregateInput
    _min?: OrderEmailMinOrderByAggregateInput
    _sum?: OrderEmailSumOrderByAggregateInput
  }

  export type OrderEmailScalarWhereWithAggregatesInput = {
    AND?: OrderEmailScalarWhereWithAggregatesInput | OrderEmailScalarWhereWithAggregatesInput[]
    OR?: OrderEmailScalarWhereWithAggregatesInput[]
    NOT?: OrderEmailScalarWhereWithAggregatesInput | OrderEmailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderEmail"> | number
    orderId?: IntWithAggregatesFilter<"OrderEmail"> | number
    kind?: EnumOrderEmailKindWithAggregatesFilter<"OrderEmail"> | $Enums.OrderEmailKind
    to?: StringWithAggregatesFilter<"OrderEmail"> | string
    subject?: StringWithAggregatesFilter<"OrderEmail"> | string
    html?: StringWithAggregatesFilter<"OrderEmail"> | string
    status?: EnumOrderEmailStatusWithAggregatesFilter<"OrderEmail"> | $Enums.OrderEmailStatus
    attempts?: IntWithAggregatesFilter<"OrderEmail"> | number
    lastError?: StringNullableWithAggregatesFilter<"OrderEmail"> | string | null
    sentAt?: DateTimeNullableWithAggregatesFilter<"OrderEmail"> | Date | string | null
    providerMessageId?: StringNullableWithAggregatesFilter<"OrderEmail"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderEmail"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrderEmail"> | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    slug: string
    isActive?: boolean
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    isActive?: boolean
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    slug: string
    isActive?: boolean
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BrandCreateInput = {
    name: string
    slug: string
    isActive?: boolean
    products?: ProductCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    isActive?: boolean
    products?: ProductUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    products?: ProductUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    products?: ProductUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    id?: number
    name: string
    slug: string
    isActive?: boolean
  }

  export type BrandUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BrandUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductCreateInput = {
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
    brandId?: number | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
    brandId?: number | null
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductImageCreateInput = {
    url: string
    sortOrder?: number
    product: ProductCreateNestedOneWithoutImagesInput
  }

  export type ProductImageUncheckedCreateInput = {
    id?: number
    url: string
    sortOrder?: number
    productId: number
  }

  export type ProductImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProductImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageCreateManyInput = {
    id?: number
    url: string
    sortOrder?: number
    productId: number
  }

  export type ProductImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type ProductInfoFileCreateInput = {
    url: string
    filename: string
    originalname?: string | null
    mimetype?: string | null
    size?: number | null
    sortOrder?: number
    product: ProductCreateNestedOneWithoutInfoFilesInput
  }

  export type ProductInfoFileUncheckedCreateInput = {
    id?: number
    url: string
    filename: string
    originalname?: string | null
    mimetype?: string | null
    size?: number | null
    sortOrder?: number
    productId: number
  }

  export type ProductInfoFileUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutInfoFilesNestedInput
  }

  export type ProductInfoFileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type ProductInfoFileCreateManyInput = {
    id?: number
    url: string
    filename: string
    originalname?: string | null
    mimetype?: string | null
    size?: number | null
    sortOrder?: number
    productId: number
  }

  export type ProductInfoFileUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductInfoFileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type OrderCreateInput = {
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    emails?: OrderEmailCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: number
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    emails?: OrderEmailUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    emails?: OrderEmailUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    emails?: OrderEmailUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: number
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: number
    orderId: number
    productId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateInput = {
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyInput = {
    id?: number
    orderId: number
    productId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEmailCreateInput = {
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status?: $Enums.OrderEmailStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    providerMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutEmailsInput
  }

  export type OrderEmailUncheckedCreateInput = {
    id?: number
    orderId: number
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status?: $Enums.OrderEmailStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    providerMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderEmailUpdateInput = {
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type OrderEmailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEmailCreateManyInput = {
    id?: number
    orderId: number
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status?: $Enums.OrderEmailStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    providerMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderEmailUpdateManyMutationInput = {
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEmailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelevanceInput = {
    fields: CategoryOrderByRelevanceFieldEnum | CategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BrandOrderByRelevanceInput = {
    fields: BrandOrderByRelevanceFieldEnum | BrandOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BrandCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
  }

  export type BrandAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
  }

  export type BrandSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type BrandNullableScalarRelationFilter = {
    is?: BrandWhereInput | null
    isNot?: BrandWhereInput | null
  }

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput
    some?: ProductImageWhereInput
    none?: ProductImageWhereInput
  }

  export type ProductInfoFileListRelationFilter = {
    every?: ProductInfoFileWhereInput
    some?: ProductInfoFileWhereInput
    none?: ProductInfoFileWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductInfoFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelevanceInput = {
    fields: ProductOrderByRelevanceFieldEnum | ProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articleNumber?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articleNumber?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    articleNumber?: SortOrder
    description?: SortOrder
    price?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    brandId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductImageOrderByRelevanceInput = {
    fields: ProductImageOrderByRelevanceFieldEnum | ProductImageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductImageAvgOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductImageSumOrderByAggregateInput = {
    id?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductInfoFileOrderByRelevanceInput = {
    fields: ProductInfoFileOrderByRelevanceFieldEnum | ProductInfoFileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductInfoFileCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    originalname?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductInfoFileAvgOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductInfoFileMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    originalname?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductInfoFileMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    originalname?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type ProductInfoFileSumOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    sortOrder?: SortOrder
    productId?: SortOrder
  }

  export type EnumDeliveryMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryMethod | EnumDeliveryMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryMethod[]
    notIn?: $Enums.DeliveryMethod[]
    not?: NestedEnumDeliveryMethodFilter<$PrismaModel> | $Enums.DeliveryMethod
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EnumAdminRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRequestStatus | EnumAdminRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRequestStatus[]
    notIn?: $Enums.AdminRequestStatus[]
    not?: NestedEnumAdminRequestStatusFilter<$PrismaModel> | $Enums.AdminRequestStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrderEmailListRelationFilter = {
    every?: OrderEmailWhereInput
    some?: OrderEmailWhereInput
    none?: OrderEmailWhereInput
  }

  export type OrderEmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelevanceInput = {
    fields: OrderOrderByRelevanceFieldEnum | OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    deliveryMethod?: SortOrder
    note?: SortOrder
    status?: SortOrder
    adminStatus?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    rentalPlace?: SortOrder
    rentalFrom?: SortOrder
    rentalTo?: SortOrder
    country?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    street?: SortOrder
    expectedMileageKm?: SortOrder
    visitCountries?: SortOrder
    rentalAccessories?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    expectedMileageKm?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    deliveryMethod?: SortOrder
    note?: SortOrder
    status?: SortOrder
    adminStatus?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    rentalPlace?: SortOrder
    rentalFrom?: SortOrder
    rentalTo?: SortOrder
    country?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    street?: SortOrder
    expectedMileageKm?: SortOrder
    visitCountries?: SortOrder
    rentalAccessories?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    deliveryMethod?: SortOrder
    note?: SortOrder
    status?: SortOrder
    adminStatus?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    rentalPlace?: SortOrder
    rentalFrom?: SortOrder
    rentalTo?: SortOrder
    country?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    street?: SortOrder
    expectedMileageKm?: SortOrder
    visitCountries?: SortOrder
    rentalAccessories?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder
    subtotal?: SortOrder
    deliveryFee?: SortOrder
    total?: SortOrder
    expectedMileageKm?: SortOrder
  }

  export type EnumDeliveryMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryMethod | EnumDeliveryMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryMethod[]
    notIn?: $Enums.DeliveryMethod[]
    not?: NestedEnumDeliveryMethodWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliveryMethodFilter<$PrismaModel>
    _max?: NestedEnumDeliveryMethodFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumAdminRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRequestStatus | EnumAdminRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRequestStatus[]
    notIn?: $Enums.AdminRequestStatus[]
    not?: NestedEnumAdminRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.AdminRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumAdminRequestStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    qty?: SortOrder
    unitPrice?: SortOrder
    lineTotal?: SortOrder
  }

  export type EnumOrderEmailKindFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailKind | EnumOrderEmailKindFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailKind[]
    notIn?: $Enums.OrderEmailKind[]
    not?: NestedEnumOrderEmailKindFilter<$PrismaModel> | $Enums.OrderEmailKind
  }

  export type EnumOrderEmailStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailStatus | EnumOrderEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailStatus[]
    notIn?: $Enums.OrderEmailStatus[]
    not?: NestedEnumOrderEmailStatusFilter<$PrismaModel> | $Enums.OrderEmailStatus
  }

  export type OrderEmailOrderByRelevanceInput = {
    fields: OrderEmailOrderByRelevanceFieldEnum | OrderEmailOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderEmailOrderIdKindCompoundUniqueInput = {
    orderId: number
    kind: $Enums.OrderEmailKind
  }

  export type OrderEmailCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    kind?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    html?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    sentAt?: SortOrder
    providerMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderEmailAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    attempts?: SortOrder
  }

  export type OrderEmailMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    kind?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    html?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    sentAt?: SortOrder
    providerMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderEmailMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    kind?: SortOrder
    to?: SortOrder
    subject?: SortOrder
    html?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    sentAt?: SortOrder
    providerMessageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderEmailSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    attempts?: SortOrder
  }

  export type EnumOrderEmailKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailKind | EnumOrderEmailKindFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailKind[]
    notIn?: $Enums.OrderEmailKind[]
    not?: NestedEnumOrderEmailKindWithAggregatesFilter<$PrismaModel> | $Enums.OrderEmailKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderEmailKindFilter<$PrismaModel>
    _max?: NestedEnumOrderEmailKindFilter<$PrismaModel>
  }

  export type EnumOrderEmailStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailStatus | EnumOrderEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailStatus[]
    notIn?: $Enums.OrderEmailStatus[]
    not?: NestedEnumOrderEmailStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderEmailStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderEmailStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderEmailStatusFilter<$PrismaModel>
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutBrandInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput | ProductUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutBrandInput | ProductUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutBrandInput | ProductUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput | ProductUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutBrandInput | ProductUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutBrandInput | ProductUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type BrandCreateNestedOneWithoutProductsInput = {
    create?: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutProductsInput
    connect?: BrandWhereUniqueInput
  }

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductInfoFileCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductInfoFileCreateWithoutProductInput, ProductInfoFileUncheckedCreateWithoutProductInput> | ProductInfoFileCreateWithoutProductInput[] | ProductInfoFileUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductInfoFileCreateOrConnectWithoutProductInput | ProductInfoFileCreateOrConnectWithoutProductInput[]
    createMany?: ProductInfoFileCreateManyProductInputEnvelope
    connect?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductInfoFileUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductInfoFileCreateWithoutProductInput, ProductInfoFileUncheckedCreateWithoutProductInput> | ProductInfoFileCreateWithoutProductInput[] | ProductInfoFileUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductInfoFileCreateOrConnectWithoutProductInput | ProductInfoFileCreateOrConnectWithoutProductInput[]
    createMany?: ProductInfoFileCreateManyProductInputEnvelope
    connect?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type BrandUpdateOneWithoutProductsNestedInput = {
    create?: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutProductsInput
    upsert?: BrandUpsertWithoutProductsInput
    disconnect?: BrandWhereInput | boolean
    delete?: BrandWhereInput | boolean
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutProductsInput, BrandUpdateWithoutProductsInput>, BrandUncheckedUpdateWithoutProductsInput>
  }

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductInfoFileUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductInfoFileCreateWithoutProductInput, ProductInfoFileUncheckedCreateWithoutProductInput> | ProductInfoFileCreateWithoutProductInput[] | ProductInfoFileUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductInfoFileCreateOrConnectWithoutProductInput | ProductInfoFileCreateOrConnectWithoutProductInput[]
    upsert?: ProductInfoFileUpsertWithWhereUniqueWithoutProductInput | ProductInfoFileUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductInfoFileCreateManyProductInputEnvelope
    set?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    disconnect?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    delete?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    connect?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    update?: ProductInfoFileUpdateWithWhereUniqueWithoutProductInput | ProductInfoFileUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductInfoFileUpdateManyWithWhereWithoutProductInput | ProductInfoFileUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductInfoFileScalarWhereInput | ProductInfoFileScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductInfoFileUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductInfoFileCreateWithoutProductInput, ProductInfoFileUncheckedCreateWithoutProductInput> | ProductInfoFileCreateWithoutProductInput[] | ProductInfoFileUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductInfoFileCreateOrConnectWithoutProductInput | ProductInfoFileCreateOrConnectWithoutProductInput[]
    upsert?: ProductInfoFileUpsertWithWhereUniqueWithoutProductInput | ProductInfoFileUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductInfoFileCreateManyProductInputEnvelope
    set?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    disconnect?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    delete?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    connect?: ProductInfoFileWhereUniqueInput | ProductInfoFileWhereUniqueInput[]
    update?: ProductInfoFileUpdateWithWhereUniqueWithoutProductInput | ProductInfoFileUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductInfoFileUpdateManyWithWhereWithoutProductInput | ProductInfoFileUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductInfoFileScalarWhereInput | ProductInfoFileScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    upsert?: ProductUpsertWithoutImagesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutImagesInput, ProductUpdateWithoutImagesInput>, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductCreateNestedOneWithoutInfoFilesInput = {
    create?: XOR<ProductCreateWithoutInfoFilesInput, ProductUncheckedCreateWithoutInfoFilesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutInfoFilesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutInfoFilesNestedInput = {
    create?: XOR<ProductCreateWithoutInfoFilesInput, ProductUncheckedCreateWithoutInfoFilesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutInfoFilesInput
    upsert?: ProductUpsertWithoutInfoFilesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutInfoFilesInput, ProductUpdateWithoutInfoFilesInput>, ProductUncheckedUpdateWithoutInfoFilesInput>
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderEmailCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderEmailCreateWithoutOrderInput, OrderEmailUncheckedCreateWithoutOrderInput> | OrderEmailCreateWithoutOrderInput[] | OrderEmailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderEmailCreateOrConnectWithoutOrderInput | OrderEmailCreateOrConnectWithoutOrderInput[]
    createMany?: OrderEmailCreateManyOrderInputEnvelope
    connect?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderEmailUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderEmailCreateWithoutOrderInput, OrderEmailUncheckedCreateWithoutOrderInput> | OrderEmailCreateWithoutOrderInput[] | OrderEmailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderEmailCreateOrConnectWithoutOrderInput | OrderEmailCreateOrConnectWithoutOrderInput[]
    createMany?: OrderEmailCreateManyOrderInputEnvelope
    connect?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
  }

  export type EnumDeliveryMethodFieldUpdateOperationsInput = {
    set?: $Enums.DeliveryMethod
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EnumAdminRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.AdminRequestStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderEmailUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderEmailCreateWithoutOrderInput, OrderEmailUncheckedCreateWithoutOrderInput> | OrderEmailCreateWithoutOrderInput[] | OrderEmailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderEmailCreateOrConnectWithoutOrderInput | OrderEmailCreateOrConnectWithoutOrderInput[]
    upsert?: OrderEmailUpsertWithWhereUniqueWithoutOrderInput | OrderEmailUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderEmailCreateManyOrderInputEnvelope
    set?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    disconnect?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    delete?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    connect?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    update?: OrderEmailUpdateWithWhereUniqueWithoutOrderInput | OrderEmailUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderEmailUpdateManyWithWhereWithoutOrderInput | OrderEmailUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderEmailScalarWhereInput | OrderEmailScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderEmailUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderEmailCreateWithoutOrderInput, OrderEmailUncheckedCreateWithoutOrderInput> | OrderEmailCreateWithoutOrderInput[] | OrderEmailUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderEmailCreateOrConnectWithoutOrderInput | OrderEmailCreateOrConnectWithoutOrderInput[]
    upsert?: OrderEmailUpsertWithWhereUniqueWithoutOrderInput | OrderEmailUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderEmailCreateManyOrderInputEnvelope
    set?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    disconnect?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    delete?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    connect?: OrderEmailWhereUniqueInput | OrderEmailWhereUniqueInput[]
    update?: OrderEmailUpdateWithWhereUniqueWithoutOrderInput | OrderEmailUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderEmailUpdateManyWithWhereWithoutOrderInput | OrderEmailUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderEmailScalarWhereInput | OrderEmailScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderCreateNestedOneWithoutEmailsInput = {
    create?: XOR<OrderCreateWithoutEmailsInput, OrderUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutEmailsInput
    connect?: OrderWhereUniqueInput
  }

  export type EnumOrderEmailKindFieldUpdateOperationsInput = {
    set?: $Enums.OrderEmailKind
  }

  export type EnumOrderEmailStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderEmailStatus
  }

  export type OrderUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<OrderCreateWithoutEmailsInput, OrderUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutEmailsInput
    upsert?: OrderUpsertWithoutEmailsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutEmailsInput, OrderUpdateWithoutEmailsInput>, OrderUncheckedUpdateWithoutEmailsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDeliveryMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryMethod | EnumDeliveryMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryMethod[]
    notIn?: $Enums.DeliveryMethod[]
    not?: NestedEnumDeliveryMethodFilter<$PrismaModel> | $Enums.DeliveryMethod
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumAdminRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRequestStatus | EnumAdminRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRequestStatus[]
    notIn?: $Enums.AdminRequestStatus[]
    not?: NestedEnumAdminRequestStatusFilter<$PrismaModel> | $Enums.AdminRequestStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumDeliveryMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryMethod | EnumDeliveryMethodFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryMethod[]
    notIn?: $Enums.DeliveryMethod[]
    not?: NestedEnumDeliveryMethodWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliveryMethodFilter<$PrismaModel>
    _max?: NestedEnumDeliveryMethodFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumAdminRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRequestStatus | EnumAdminRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRequestStatus[]
    notIn?: $Enums.AdminRequestStatus[]
    not?: NestedEnumAdminRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.AdminRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumAdminRequestStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderEmailKindFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailKind | EnumOrderEmailKindFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailKind[]
    notIn?: $Enums.OrderEmailKind[]
    not?: NestedEnumOrderEmailKindFilter<$PrismaModel> | $Enums.OrderEmailKind
  }

  export type NestedEnumOrderEmailStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailStatus | EnumOrderEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailStatus[]
    notIn?: $Enums.OrderEmailStatus[]
    not?: NestedEnumOrderEmailStatusFilter<$PrismaModel> | $Enums.OrderEmailStatus
  }

  export type NestedEnumOrderEmailKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailKind | EnumOrderEmailKindFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailKind[]
    notIn?: $Enums.OrderEmailKind[]
    not?: NestedEnumOrderEmailKindWithAggregatesFilter<$PrismaModel> | $Enums.OrderEmailKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderEmailKindFilter<$PrismaModel>
    _max?: NestedEnumOrderEmailKindFilter<$PrismaModel>
  }

  export type NestedEnumOrderEmailStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderEmailStatus | EnumOrderEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderEmailStatus[]
    notIn?: $Enums.OrderEmailStatus[]
    not?: NestedEnumOrderEmailStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderEmailStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderEmailStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderEmailStatusFilter<$PrismaModel>
  }

  export type ProductCreateWithoutCategoryInput = {
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId?: number | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    articleNumber?: StringNullableFilter<"Product"> | string | null
    description?: StringFilter<"Product"> | string
    price?: IntFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: IntFilter<"Product"> | number
    brandId?: IntNullableFilter<"Product"> | number | null
  }

  export type ProductCreateWithoutBrandInput = {
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutBrandInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBrandInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput>
  }

  export type ProductCreateManyBrandInputEnvelope = {
    data: ProductCreateManyBrandInput | ProductCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutBrandInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutBrandInput, ProductUncheckedUpdateWithoutBrandInput>
    create: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutBrandInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutBrandInput, ProductUncheckedUpdateWithoutBrandInput>
  }

  export type ProductUpdateManyWithWhereWithoutBrandInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutBrandInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    name: string
    slug: string
    isActive?: boolean
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    slug: string
    isActive?: boolean
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type BrandCreateWithoutProductsInput = {
    name: string
    slug: string
    isActive?: boolean
  }

  export type BrandUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    slug: string
    isActive?: boolean
  }

  export type BrandCreateOrConnectWithoutProductsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
  }

  export type ProductImageCreateWithoutProductInput = {
    url: string
    sortOrder?: number
  }

  export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: number
    url: string
    sortOrder?: number
  }

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageCreateManyProductInputEnvelope = {
    data: ProductImageCreateManyProductInput | ProductImageCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductInfoFileCreateWithoutProductInput = {
    url: string
    filename: string
    originalname?: string | null
    mimetype?: string | null
    size?: number | null
    sortOrder?: number
  }

  export type ProductInfoFileUncheckedCreateWithoutProductInput = {
    id?: number
    url: string
    filename: string
    originalname?: string | null
    mimetype?: string | null
    size?: number | null
    sortOrder?: number
  }

  export type ProductInfoFileCreateOrConnectWithoutProductInput = {
    where: ProductInfoFileWhereUniqueInput
    create: XOR<ProductInfoFileCreateWithoutProductInput, ProductInfoFileUncheckedCreateWithoutProductInput>
  }

  export type ProductInfoFileCreateManyProductInputEnvelope = {
    data: ProductInfoFileCreateManyProductInput | ProductInfoFileCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutProductInput = {
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: number
    orderId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BrandUpsertWithoutProductsInput = {
    update: XOR<BrandUpdateWithoutProductsInput, BrandUncheckedUpdateWithoutProductsInput>
    create: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutProductsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutProductsInput, BrandUncheckedUpdateWithoutProductsInput>
  }

  export type BrandUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BrandUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    update: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    data: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
  }

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    OR?: ProductImageScalarWhereInput[]
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    id?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    sortOrder?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
  }

  export type ProductInfoFileUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductInfoFileWhereUniqueInput
    update: XOR<ProductInfoFileUpdateWithoutProductInput, ProductInfoFileUncheckedUpdateWithoutProductInput>
    create: XOR<ProductInfoFileCreateWithoutProductInput, ProductInfoFileUncheckedCreateWithoutProductInput>
  }

  export type ProductInfoFileUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductInfoFileWhereUniqueInput
    data: XOR<ProductInfoFileUpdateWithoutProductInput, ProductInfoFileUncheckedUpdateWithoutProductInput>
  }

  export type ProductInfoFileUpdateManyWithWhereWithoutProductInput = {
    where: ProductInfoFileScalarWhereInput
    data: XOR<ProductInfoFileUpdateManyMutationInput, ProductInfoFileUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductInfoFileScalarWhereInput = {
    AND?: ProductInfoFileScalarWhereInput | ProductInfoFileScalarWhereInput[]
    OR?: ProductInfoFileScalarWhereInput[]
    NOT?: ProductInfoFileScalarWhereInput | ProductInfoFileScalarWhereInput[]
    id?: IntFilter<"ProductInfoFile"> | number
    url?: StringFilter<"ProductInfoFile"> | string
    filename?: StringFilter<"ProductInfoFile"> | string
    originalname?: StringNullableFilter<"ProductInfoFile"> | string | null
    mimetype?: StringNullableFilter<"ProductInfoFile"> | string | null
    size?: IntNullableFilter<"ProductInfoFile"> | number | null
    sortOrder?: IntFilter<"ProductInfoFile"> | number
    productId?: IntFilter<"ProductInfoFile"> | number
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    qty?: IntFilter<"OrderItem"> | number
    unitPrice?: IntFilter<"OrderItem"> | number
    lineTotal?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type ProductCreateWithoutImagesInput = {
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    infoFiles?: ProductInfoFileCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
    brandId?: number | null
    infoFiles?: ProductInfoFileUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
  }

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductUpdateWithoutImagesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    infoFiles?: ProductInfoFileUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    infoFiles?: ProductInfoFileUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutInfoFilesInput = {
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutInfoFilesInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
    brandId?: number | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutInfoFilesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutInfoFilesInput, ProductUncheckedCreateWithoutInfoFilesInput>
  }

  export type ProductUpsertWithoutInfoFilesInput = {
    update: XOR<ProductUpdateWithoutInfoFilesInput, ProductUncheckedUpdateWithoutInfoFilesInput>
    create: XOR<ProductCreateWithoutInfoFilesInput, ProductUncheckedCreateWithoutInfoFilesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutInfoFilesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutInfoFilesInput, ProductUncheckedUpdateWithoutInfoFilesInput>
  }

  export type ProductUpdateWithoutInfoFilesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutInfoFilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderItemCreateWithoutOrderInput = {
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number
    productId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderEmailCreateWithoutOrderInput = {
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status?: $Enums.OrderEmailStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    providerMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderEmailUncheckedCreateWithoutOrderInput = {
    id?: number
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status?: $Enums.OrderEmailStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    providerMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderEmailCreateOrConnectWithoutOrderInput = {
    where: OrderEmailWhereUniqueInput
    create: XOR<OrderEmailCreateWithoutOrderInput, OrderEmailUncheckedCreateWithoutOrderInput>
  }

  export type OrderEmailCreateManyOrderInputEnvelope = {
    data: OrderEmailCreateManyOrderInput | OrderEmailCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderEmailUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderEmailWhereUniqueInput
    update: XOR<OrderEmailUpdateWithoutOrderInput, OrderEmailUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderEmailCreateWithoutOrderInput, OrderEmailUncheckedCreateWithoutOrderInput>
  }

  export type OrderEmailUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderEmailWhereUniqueInput
    data: XOR<OrderEmailUpdateWithoutOrderInput, OrderEmailUncheckedUpdateWithoutOrderInput>
  }

  export type OrderEmailUpdateManyWithWhereWithoutOrderInput = {
    where: OrderEmailScalarWhereInput
    data: XOR<OrderEmailUpdateManyMutationInput, OrderEmailUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderEmailScalarWhereInput = {
    AND?: OrderEmailScalarWhereInput | OrderEmailScalarWhereInput[]
    OR?: OrderEmailScalarWhereInput[]
    NOT?: OrderEmailScalarWhereInput | OrderEmailScalarWhereInput[]
    id?: IntFilter<"OrderEmail"> | number
    orderId?: IntFilter<"OrderEmail"> | number
    kind?: EnumOrderEmailKindFilter<"OrderEmail"> | $Enums.OrderEmailKind
    to?: StringFilter<"OrderEmail"> | string
    subject?: StringFilter<"OrderEmail"> | string
    html?: StringFilter<"OrderEmail"> | string
    status?: EnumOrderEmailStatusFilter<"OrderEmail"> | $Enums.OrderEmailStatus
    attempts?: IntFilter<"OrderEmail"> | number
    lastError?: StringNullableFilter<"OrderEmail"> | string | null
    sentAt?: DateTimeNullableFilter<"OrderEmail"> | Date | string | null
    providerMessageId?: StringNullableFilter<"OrderEmail"> | string | null
    createdAt?: DateTimeFilter<"OrderEmail"> | Date | string
    updatedAt?: DateTimeFilter<"OrderEmail"> | Date | string
  }

  export type OrderCreateWithoutItemsInput = {
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
    emails?: OrderEmailCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: number
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
    emails?: OrderEmailUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    images?: ProductImageCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
    brandId?: number | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    infoFiles?: ProductInfoFileUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: OrderEmailUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emails?: OrderEmailUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderCreateWithoutEmailsInput = {
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutEmailsInput = {
    id?: number
    customerName: string
    email: string
    phone: string
    address: string
    deliveryMethod: $Enums.DeliveryMethod
    note?: string | null
    status?: $Enums.OrderStatus
    adminStatus?: $Enums.AdminRequestStatus
    subtotal: number
    deliveryFee: number
    total: number
    rentalPlace?: string | null
    rentalFrom?: Date | string | null
    rentalTo?: Date | string | null
    country?: string | null
    city?: string | null
    postalCode?: string | null
    street?: string | null
    expectedMileageKm?: number | null
    visitCountries?: string | null
    rentalAccessories?: string | null
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutEmailsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutEmailsInput, OrderUncheckedCreateWithoutEmailsInput>
  }

  export type OrderUpsertWithoutEmailsInput = {
    update: XOR<OrderUpdateWithoutEmailsInput, OrderUncheckedUpdateWithoutEmailsInput>
    create: XOR<OrderCreateWithoutEmailsInput, OrderUncheckedCreateWithoutEmailsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutEmailsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutEmailsInput, OrderUncheckedUpdateWithoutEmailsInput>
  }

  export type OrderUpdateWithoutEmailsInput = {
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutEmailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    deliveryMethod?: EnumDeliveryMethodFieldUpdateOperationsInput | $Enums.DeliveryMethod
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    adminStatus?: EnumAdminRequestStatusFieldUpdateOperationsInput | $Enums.AdminRequestStatus
    subtotal?: IntFieldUpdateOperationsInput | number
    deliveryFee?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    rentalPlace?: NullableStringFieldUpdateOperationsInput | string | null
    rentalFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rentalTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    street?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMileageKm?: NullableIntFieldUpdateOperationsInput | number | null
    visitCountries?: NullableStringFieldUpdateOperationsInput | string | null
    rentalAccessories?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductCreateManyCategoryInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    brandId?: number | null
  }

  export type ProductUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductCreateManyBrandInput = {
    id?: number
    name: string
    slug: string
    articleNumber?: string | null
    description: string
    price: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categoryId: number
  }

  export type ProductUpdateWithoutBrandInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    infoFiles?: ProductInfoFileUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageCreateManyProductInput = {
    id?: number
    url: string
    sortOrder?: number
  }

  export type ProductInfoFileCreateManyProductInput = {
    id?: number
    url: string
    filename: string
    originalname?: string | null
    mimetype?: string | null
    size?: number | null
    sortOrder?: number
  }

  export type OrderItemCreateManyProductInput = {
    id?: number
    orderId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
  }

  export type ProductImageUpdateWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductInfoFileUpdateWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductInfoFileUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ProductInfoFileUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalname?: NullableStringFieldUpdateOperationsInput | string | null
    mimetype?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableIntFieldUpdateOperationsInput | number | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUpdateWithoutProductInput = {
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: number
    productId: number
    qty: number
    unitPrice: number
    lineTotal: number
    createdAt?: Date | string
  }

  export type OrderEmailCreateManyOrderInput = {
    id?: number
    kind: $Enums.OrderEmailKind
    to: string
    subject: string
    html: string
    status?: $Enums.OrderEmailStatus
    attempts?: number
    lastError?: string | null
    sentAt?: Date | string | null
    providerMessageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    qty?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    lineTotal?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEmailUpdateWithoutOrderInput = {
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEmailUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderEmailUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    kind?: EnumOrderEmailKindFieldUpdateOperationsInput | $Enums.OrderEmailKind
    to?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderEmailStatusFieldUpdateOperationsInput | $Enums.OrderEmailStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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