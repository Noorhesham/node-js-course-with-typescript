"use client";
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button onClick={() => signOut()}>signout</button>
  )
}

export default SignOutButton