"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    // Login Daten
    if (
      username === "admin" &&
      password === "1234"
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      router.push("/admin");

    } else {

      alert("Falsche Login Daten");

    }

  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">

      <div className="bg-gray-900 p-10 rounded-3xl w-full max-w-md flex flex-col gap-6">

        <h1 className="text-4xl font-bold text-center">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Benutzername"
          className="p-4 rounded-xl bg-black border border-gray-700"
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Passwort"
          className="p-4 rounded-xl bg-black border border-gray-700"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
        >
          Login
        </button>

      </div>

    </main>
  );
}