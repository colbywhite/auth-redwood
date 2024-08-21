import GitHub from '@auth/core/providers/github'

import type { RedwoodAuthConfig } from './src/lib/auth.server'

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies RedwoodAuthConfig
