import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import RedwoodLogo from 'src/components/RedwoodLogo/RedwoodLogo'

const IndexPage = () => {
  const { logIn, logOut, userMetadata: user } = useAuth()
  return (
    <>
      <Metadata title="Index" description="Index page" />

      <RedwoodLogo className="w-1/2" />
      {user && <h1>Hello, {user.name}!</h1>}
      {user ? (
        <button
          className="btn btn-outline btn-primary"
          onClick={() => logOut()}
        >
          Log out
        </button>
      ) : (
        <button
          className="btn btn-outline btn-primary"
          onClick={() => logIn({ providerId: 'github' })}
        >
          Log in
        </button>
      )}
    </>
  )
}

export default IndexPage
