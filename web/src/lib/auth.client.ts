import type { BuiltInProviderType } from '@auth/core/providers'
import type { Session } from '@auth/core/types'

import type { CurrentUser } from '@redwoodjs/auth'

const COMMON_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-Auth-Return-Redirect': '1',
}

export interface RedwoodLogInOptions {
  /** The base path for authentication (default: /auth) */
  prefix?: string
  callbackUrl?: string
  /** [Documentation](https://next-auth.js.org/getting-started/client#using-the-redirect-false-option) */
  redirect?: boolean
  providerId?: BuiltInProviderType
  authorizationParams?: URLSearchParamsInit
}

type URLSearchParamsInit =
  | string[][]
  | Record<string, string>
  | string
  | URLSearchParams

async function csrf(prefix: string) {
  const csrfTokenResponse = await fetch(`${prefix}/csrf`)
  const { csrfToken } = await csrfTokenResponse.json()
  return csrfToken as string
}

export async function login({
  prefix = '/auth',
  callbackUrl = window.location.href,
  redirect = true,
  providerId,
  authorizationParams,
}: RedwoodLogInOptions) {
  console.log('[auth][client][login]', {
    prefix,
    providerId,
    authorizationParams,
    redirect,
    callbackUrl,
  })
  const isCredentials = providerId === 'credentials'
  const isEmail = providerId === 'email'
  const isSupportingReturn = isCredentials || isEmail

  const signInUrl = `${prefix}/${isCredentials ? 'callback' : 'signin'}/${providerId}`
  const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`

  const csrfToken = await csrf(prefix)
  const res = await fetch(_signInUrl, {
    method: 'post',
    headers: COMMON_HEADERS,
    // @ts-expect-error -- ignore
    body: new URLSearchParams({
      redirect,
      csrfToken,
      callbackUrl,
    }),
  })

  const data = await res.clone().json()
  const error = new URL(data.url).searchParams.get('error')

  // TODO: reload/redirect in a React-y way
  if (redirect || !isSupportingReturn || !error) {
    // TODO: Do not redirect for Credentials and Email providers by default in next major
    window.location.href = data.url ?? callbackUrl
    // If url contains a hash, the browser does not reload the page. We reload manually
    if (data.url.includes('#')) window.location.reload()
    return
  }

  return res
}

export async function logout(
  prefix = '/auth',
  callbackUrl = window.location.href
) {
  console.log('[auth][client][logout]', { prefix, callbackUrl })
  const csrfToken = await csrf(prefix)
  const res = await fetch(`${prefix}/signout`, {
    method: 'post',
    headers: COMMON_HEADERS,
    body: new URLSearchParams({
      csrfToken,
      callbackUrl,
    }),
  })
  const data = await res.json()

  const url = data.url ?? callbackUrl
  window.location.href = url
  // If url contains a hash, the browser does not reload the page. We reload manually
  if (url.includes('#')) window.location.reload()
}

export async function getSession(
  prefix = '/auth',
  base = window.location.href
): Promise<Session | null> {
  const url = new URL(`${prefix}/session`, base)
  const response = await fetch(url)
  const { status = 200 } = response

  const data = await response.json()

  if (!data || !Object.keys(data).length) return null
  if (status === 200) {
    return data ? (data as Session) : null
  }
  throw new Error(data.message)
}

export async function getUser(prefix = '/auth', base = window.location.href) {
  console.log('[auth][client][getUser]')
  const session = await getSession(prefix, base)
  return session?.user
}

/**
 * This is the same as {@link getUser}, but typed to play nice with Redwood
 */
export async function getCurrentUser(
  prefix = '/auth',
  base = window.location.href
) {
  console.log('[auth][client][getCurrentUser]')
  return (await getUser(prefix, base)) as CurrentUser
}
