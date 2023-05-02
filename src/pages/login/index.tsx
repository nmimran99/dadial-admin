import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import { signIn } from "next-auth/react"
import useRouter from "next/router";

export const LoginPage = () => {

  const router = useRouter
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false
    })

    if(!result || result.status ==  500) {
      setError("תקלת שרת. אנא צור קשר עם המתחזק")
    } else if (result.status == 401) {
      setError("שם משתמש או סיסמא שגויים")
    } else {
      router.push("/")
    }
  }

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
    setError("");
  }

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value);
    setError("");
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="w-screen h-screen">
        <Image src="/img/loginpage.jpg" width={1100} height={1100} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col justify-center items-center w-96 h-96 bg-white bg-opacity-20 backdrop-blur-xl shadow-xl border border-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl text-white">
        <div className="mx-auto text-center text-2xl font-bold py-8">
          התחברות לעמדת קבלה
        </div>
        <div className="border w-4/5 rounded-lg mx-auto p-1 my-1">
          <div className="px-1 text-gray-200">
            שם משתמש
          </div>
          <input className="w-4/5 rounded-lg h-8 bg-transparent outline-none mr-2 text-xl"
            type="text"
            onChange={handleChangeUsername}
          />
        </div>
        <div className="border w-4/5 rounded-lg mx-auto p-1 my-1 relative">
          <div className="px-1 text-gray-200">
            סיסמא
          </div>
          <input className="w-4/5 rounded-lg h-8 bg-transparent outline-none mr-2 text-xl"
            type="password"
            onChange={handleChangePassword}
          />
        </div>
        {
          error &&
          <div className="text-sm text-red-500 font-bold w-4/5 text-right px-2">{error}</div>
        }
        <button className="border w-4/5 rounded-lg mx-auto h-10 my-1 text-lg bg-black bg-opacity-40 font-bold hover:bg-blue-500"
          onClick={handleSubmit}
        >
          התחברות
        </button>
      </div>
    </div>
  )
};

module.exports = LoginPage;
