# auth-redwood

1st draft of [Auth.js] and [Redwood] v8 integration.

This is a POC of a potential `@auth/redwood` package.
See [Auth.js' current integrations].

## Notable functions
- `AuthMiddleware` from `api/src/lib/auth.server`: this is the entry point for the middleware.
  - Usage can be seen in the `registerMiddleware` of `web/src/entry.server`
- `createAuth` from `web/src/auth`: this is the entry point for creating the client-side hooks.
  - Usage can be seen in `web/src/pages/IndexPage/IndexPage`

## Open questions/tasks
- do we even want to touch graphql? this draft doesn't touch it all
  - if you're doing SSR, the usefulness of this client-side graphql auth decreases since server-to-server auth will likely be used.
- can we guard routes? through middleware or through `<Route>`?

## Local dependencies
- env vars; see `./.env.example` for what needs to be set.
- docker installed and running

## Local demo
```shell
yarn db:init  # runs a local postgres in docker
yarn start    # runs the RW app
```

[Auth.js]: https://authjs.dev/
[Redwood]: https://redwoodjs.com/
[Auth.js' current integrations]: https://authjs.dev/getting-started/integrations
