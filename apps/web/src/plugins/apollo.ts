import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { useAuthStore } from '../stores/auth.js'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:3001/graphql',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore()
  const token = authStore.token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  ssrMode: typeof window === 'undefined',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export const apolloPlugin = {
  install(app: any) {
    app.provide(DefaultApolloClient, apolloClient)
  },
}
