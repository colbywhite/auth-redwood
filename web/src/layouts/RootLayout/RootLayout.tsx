import type { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="prose mx-auto my-4 flex w-96 flex-col items-center gap-8 bg-base-100 antialiased">
      {children}
    </main>
  )
}

export default RootLayout
