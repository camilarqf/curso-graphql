import Vue from "vue";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use({
  install(Vue) {
    //Apollolink
    const httpLink = createHttpLink({
      uri: "http://localhost:4000/",
    });
    //Apollolink
    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem("token");
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null,
        },
      };
    });

    Vue.prototype.$api = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  },
});
