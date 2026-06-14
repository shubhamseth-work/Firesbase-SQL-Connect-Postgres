// ============================================
// GRAPHQL CLIENT SERVICE
// Executes all queries and mutations against
// Firebase Data Connect endpoint
// Handles errors, retries, and auth tokens
// ============================================

import { getAuth } from 'firebase/auth';
import config from '../config/environment';
import logger from '../utils/logger';
import { GraphQLResponse, GraphQLError } from '../graphql/types';

// -----------------------------------------------
// GRAPHQL ENDPOINT
// -----------------------------------------------
const getEndpoint = (): string => {
  if (config.emulator.enabled) {
    return `http://${config.emulator.host}:${config.emulator.dataConnectPort}/graphql`;
  }
  return config.api.graphqlEndpoint;
};

// -----------------------------------------------
// GET AUTH TOKEN
// -----------------------------------------------
const getAuthToken = async (): Promise<string | null> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    logger.error('Failed to get auth token', error);
    return null;
  }
};

// -----------------------------------------------
// EXECUTE GRAPHQL OPERATION
// -----------------------------------------------
export const executeGraphQL = async <T>(
  query: string,
  variables?: Record<string, unknown>,
  operationName?: string
): Promise<T> => {
  const endpoint = getEndpoint();
  const token    = await getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  logger.debug(`GraphQL ${operationName || 'operation'}`, {
    endpoint,
    variables,
  });

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method:  'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: variables || {},
        operationName,
      }),
    });
  } catch (networkError) {
    logger.error('GraphQL network error', networkError);
    throw new Error(
      'Network error: Unable to reach the server. Please check your connection.'
    );
  }

  if (!response.ok) {
    logger.error('GraphQL HTTP error', {
      status:     response.status,
      statusText: response.statusText,
    });
    throw new Error(
      `HTTP error ${response.status}: ${response.statusText}`
    );
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    const errorMessages = result.errors
      .map((e: GraphQLError) => e.message)
      .join(', ');

    logger.error('GraphQL errors', result.errors);
    throw new GraphQLClientError(errorMessages, result.errors);
  }

  if (result.data === null || result.data === undefined) {
    throw new Error('GraphQL returned no data');
  }

  logger.debug(`GraphQL ${operationName || 'operation'} success`);
  return result.data;
};

// -----------------------------------------------
// CUSTOM ERROR CLASS
// -----------------------------------------------
export class GraphQLClientError extends Error {
  public errors: GraphQLError[];

  constructor(message: string, errors: GraphQLError[]) {
    super(message);
    this.name   = 'GraphQLClientError';
    this.errors = errors;
  }
}

// -----------------------------------------------
// TYPED QUERY HELPER
// -----------------------------------------------
export const query = async <TData, TVariables = Record<string, unknown>>(
  queryString: string,
  variables?:  TVariables,
  operationName?: string
): Promise<TData> => {
  return executeGraphQL<TData>(
    queryString,
    variables as Record<string, unknown>,
    operationName
  );
};

// -----------------------------------------------
// TYPED MUTATION HELPER
// -----------------------------------------------
export const mutate = async <TData, TVariables = Record<string, unknown>>(
  mutationString: string,
  variables?:     TVariables,
  operationName?: string
): Promise<TData> => {
  return executeGraphQL<TData>(
    mutationString,
    variables as Record<string, unknown>,
    operationName
  );
};

export default { query, mutate, executeGraphQL };