import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    }
  })
  
  if (session) {
    router.push("/inventory")
  }

  return (
   <div>
   </div>
  )
}

