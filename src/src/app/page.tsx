"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';  // 追加インポート

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
      <div className="flex items-center flex-col">
        <h1 className="text-3xl m-10 font-bold">Five God Dragon</h1>
        <div className="flex items-center flex-col m-5">
          {status === "loading" ? (
            <Skeleton variant="text" animation="wave" width={175} height={25}/>
          ) : session ? (
            <>
              <div className="m-2">ログイン中のユーザー</div>
              <p className="font-bold">{session.user?.email}</p>
              <button
                onClick={() => signOut()}
                className="bg-red-500 py-2 px-3 text-xs text-white rounded-lg"
              >
                サインアウトする
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="mt-2 bg-blue-500 py-2 px-3 text-xs text-white rounded-lg">
                ログイン
              </Link>
              <Link href="/signup" className="mt-2 bg-green-500 py-2 px-3 text-xs text-white rounded-lg">
                新規登録
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
