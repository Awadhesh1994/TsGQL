// tslint:disable
// graphql typescript definitions

declare namespace GraphQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
rawat: string;
awadhesh: string | null;
hello: string;
}

interface IRawatOnQueryArguments {
fname?: string | null;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface IMutation {
__typename: "Mutation";
login: Array<IError>;
register: Array<IError>;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
username: string;
email: string;
password: string;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}
}

// tslint:enable
