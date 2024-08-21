# redwood-auth

1st draft of [Auth.js] and [Redwood] v8 integration.

## Open questions/tasks
- can i allow the user to store their `auth.config.ts` in the root of their project?
  - an alternative is to simply have them configure directly as a param in `AuthMiddleware` since the client only needs the `prefix`, not the whole config object.
- are there server-side helper methods that are useful? should they hit `/auth/*` like the client, or just hit `Auth()` directly?
- is there an equivalent to `Astro.locals` that can be used in Redwood?
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
