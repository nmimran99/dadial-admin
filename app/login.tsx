import Image from "next/image";
import { useRef } from "react";

export const LoginPage = () => {
  const username = useRef("");
  const password = useRef("");

  const handleSubmit = async () => {
    try {
      const result = await fetch(
        `/api/verify?username=${username}&password=${password}`
      );
      const res = await result.json();
      console.log(res);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div className="w-80 h-max absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
      <Image src="/img/dadial.jpg" width={500} height={100} alt={""} />
      <div className="mx-auto my-1">
        <div className="text-xl font-bold"> שם משתמש </div>
        <div className="border border-black w-full h-10 rounded-full flex justify-center align-items">
          <input
            onChange={(e) => (username.current = e.target.value)}
            type="text"
            className="outline-none w-5/6 text-lg"
          />
        </div>
      </div>
      <div className="mx-auto my-1">
        <div className="text-xl font-bold"> סיסמא </div>
        <div className="border border-black w-full h-10 rounded-full flex justify-center align-items">
          <input
            type="password"
            onChange={(e) => (password.current = e.target.value)}
            className="outline-none w-5/6 text-lg"
          />
        </div>
      </div>
      <div>
        <button
          className="w-full rounded-full my-4 bg-amber-900 text-white p-2 text-xl font-bold"
          onClick={handleSubmit}
        >
          כניסה
        </button>
      </div>
    </div>
  );
};

module.exports = LoginPage;
