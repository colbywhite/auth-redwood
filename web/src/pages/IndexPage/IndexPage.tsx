import { Metadata } from '@redwoodjs/web'

import RedwoodLogo from 'src/components/RedwoodLogo/RedwoodLogo'
import { useAuth } from 'src/lib/auth.client'

const IndexPage = () => {
  const { session, login, logout } = useAuth()
  return (
    <>
      <Metadata title="Index" description="Index page" />

      <RedwoodLogo className="w-1/2" />
      {session?.user && <h1>Hello, {session.user.name}!</h1>}
      {session ? (
        <button
          className="btn btn-outline btn-primary"
          onClick={() => logout()}
        >
          Log out
        </button>
      ) : (
        <button
          className="btn btn-outline btn-primary"
          onClick={() => login({ providerId: 'github' })}
        >
          Log in
        </button>
      )}
    </>
  )
}

export default IndexPage
