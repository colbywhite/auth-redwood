import {Metadata} from '@redwoodjs/web'
import RedwoodLogo from "src/components/RedwoodLogo/RedwoodLogo";

const IndexPage = () => {
  return (
    <>
      <Metadata title="Index" description="Index page"/>

      <RedwoodLogo className="w-1/2" />
      <h1>
        Hello, world!
      </h1>
    </>
  )
}

export default IndexPage
