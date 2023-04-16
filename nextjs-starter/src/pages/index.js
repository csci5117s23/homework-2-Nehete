import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { UserButton, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Pratik's Todo App</title>
      </Head>

      <h1>Pratik's Todo App</h1>

      <SignedIn>
        <Link href={"/Todos"}>Go to Todos</Link>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignIn path="/SignIn" afterSignInUrl="/Todos"/>
      </SignedOut>
    </>
  )
}
