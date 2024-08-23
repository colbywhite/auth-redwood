import type { User } from '@auth/core/types'

import { createAuthentication, type AuthImplementation } from '@redwoodjs/auth'

import {
  getCurrentUser,
  getUser,
  login,
  logout,
  type RedwoodLogInOptions,
} from 'src/lib/auth.client'

/**
 * @param prefix should match {@link AuthMiddleware}'s prefix config option
 * @param base
 */
function createAuth(prefix = '/auth', base?: string) {
  return createAuthentication(
    {
      type: '@auth/redwood',
      middlewareAuthEnabled: true,
      async login(opts: Omit<RedwoodLogInOptions, 'prefix'>) {
        return await login({ ...opts, prefix })
      },
      async logout(callbackUrl?: string) {
        return await logout(prefix, callbackUrl)
      },
      async getUserMetadata() {
        return getUser(prefix, base || window.location.href)
      },
      async signup() {
        throw new Error('Not implemented')
      },
      async getToken() {
        // the client doesn't need to get an explicit token since @auth/core does it for us
        return null
      },
    } satisfies AuthImplementation<User>,
    { useCurrentUser: () => getCurrentUser(prefix) }
  )
}

export const { AuthProvider, useAuth } = createAuth()
