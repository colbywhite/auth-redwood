import type { TagDescriptor } from '@redwoodjs/web'

import AuthMiddleware from 'src/lib/auth.server'

import App from './App'
import { Document } from './Document'
import Routes from './Routes'

import config from '$api/auth.config'

interface Props {
  css: string[]
  meta?: TagDescriptor[]
}

export const registerMiddleware = () => {
  return [AuthMiddleware(config)]
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
