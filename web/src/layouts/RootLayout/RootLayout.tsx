import type {PropsWithChildren} from "react";

const RootLayout = ({children}: PropsWithChildren) => {
  return <main className="bg-base-100 my-4 antialiased w-96 mx-auto prose flex flex-col gap-8 items-center">
    {children}
  </main>
}

export default RootLayout
