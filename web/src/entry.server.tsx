import GitHub from '@auth/core/providers/github'

import type { TagDescriptor } from '@redwoodjs/web'

import App from './App'
import { Document } from './Document'
import Routes from './Routes'

import AuthMiddleware from '$api/src/lib/auth.server'

interface Props {
  css: string[]
  meta?: TagDescriptor[]
}

export const registerMiddleware = () => {
  return [
    AuthMiddleware({
      providers: [
        GitHub({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ],
      secret: process.env.AUTH_SECRET,
    }),
  ]
}

export const ServerEntry: React.FC<Props> = ({ css, meta }) => {
  return (
    <Document css={css} meta={meta}>
      <App>
        <Routes />
      </App>
    </Document>
  )
}
