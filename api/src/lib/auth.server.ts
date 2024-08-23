import { Auth } from '@auth/core'
import type { AuthAction, AuthConfig, Session } from '@auth/core/types'

import type { CurrentUser } from '@redwoodjs/auth'
import {
  type Middleware,
  type MiddlewareRequest,
  MiddlewareResponse,
} from '@redwoodjs/web/middleware'

export interface RedwoodAuthConfig extends AuthConfig {
  prefix?: string
}

type ResolvedRedwoodAuthConfig = RedwoodAuthConfig & { prefix: string }

const DEFAULT_CONFIG: ResolvedRedwoodAuthConfig = {
  prefix: '/auth',
  trustHost: true,
  providers: [],
}

const SUPPORTED_ACTIONS: AuthAction[] = [
  'providers',
  'session',
  'csrf',
  'signin',
  'signout',
  'callback',
  'verify-request',
  'error',
]

export default function AuthMiddleware(
  config?: RedwoodAuthConfig
): [Middleware, '*'] {
  const resolvedConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  } satisfies ResolvedRedwoodAuthConfig

  const mw: Middleware = async (request, originalResponse) => {
    if (isAuthRequest(request, resolvedConfig)) {
      console.log('[auth][middleware]', 'auth request', request.url)
      const response = await authRequestHandler(
        request,
        originalResponse.toResponse(),
        resolvedConfig
      )
      return MiddlewareResponse.fromResponse(response)
    }
    const session = await getSession(request, resolvedConfig)
    if (session && session.user) {
      console.log('[auth][middleware]', 'set user', session.user)
      request.serverAuthState.set({
        currentUser: session.user as CurrentUser,
        loading: false,
        isAuthenticated: !!session,
        hasError: false,
        userMetadata: session.user,
        cookieHeader: request.headers.get('Cookie'),
        roles: [],
      })
    } else {
      console.log('[auth][middleware]', 'clear user')
      request.serverAuthState.clear()
    }
    return originalResponse
  }

  return [mw, '*']
}

function isAuthRequest(
  req: MiddlewareRequest,
  config: ResolvedRedwoodAuthConfig
) {
  const url = new URL(req.url)
  return url.pathname.startsWith(config.prefix + '/')
}

async function authRequestHandler(
  req: Request,
  res: Response,
  config: ResolvedRedwoodAuthConfig
) {
  const url = new URL(req.url)
  const action = url.pathname
    .slice(config.prefix.length + 1)
    .split('/')[0] as AuthAction
  // do nothing if it's not a supported auth action
  if (!SUPPORTED_ACTIONS.includes(action)) {
    return res
  }

  const response = await Auth(req, config)
  // is this bit Astro-specific?
  //
  // if (['callback', 'signin', 'signout'].includes(action)) {
  //   // Properly handle multiple Set-Cookie headers (they can't be concatenated in one)
  //   const getSetCookie = res.headers.getSetCookie()
  //   if (getSetCookie.length > 0) {
  //     getSetCookie.forEach((cookie) => {
  //       const { name, value, ...options } = parseString(cookie)
  //       // Astro's typings are more explicit than @types/set-cookie-parser for sameSite
  //       cookies.set(name, value, options as Parameters<(typeof cookies)['set']>[2])
  //     })
  //     response.headers.delete('Set-Cookie')
  //   }
  // }
  return response
}

/**
 * mimics a call to {@link authRequestHandler} for a session action
 */
async function getSession(
  request: MiddlewareRequest,
  config: ResolvedRedwoodAuthConfig
): Promise<Session | null> {
  const url = new URL(`${config.prefix}/session`, request.url)
  const response = await authRequestHandler(
    new Request(url, { headers: request.headers }),
    null,
    config
  )
  if (response === null) {
    return null
  }
  const { status = 200 } = response

  const data = await response.json()

  if (!data || !Object.keys(data).length) return null
  if (status === 200) {
    return data ? (data as Session) : null
  }
  throw new Error(data.message)
}
