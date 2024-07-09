import React from 'react'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function page() {
  const session = await auth()

  return (
    <div>
      {session && (
        <>
          <h1>
            {JSON.stringify(session.user)}
          </h1>
          <form action={ async ()=>{
            "use server"

            await signOut()
          }}>
            <Button type='submit'>signOut</Button>
          </form>
        </>
      )}
    </div>
  )
}
