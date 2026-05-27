"use client";

import Link from "next/link";

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <div className="max-w-4xl text-center flex flex-col gap-8">

        <h1 className="text-6xl md:text-7xl font-bold">

          Premium Barber Shop

        </h1>

        <p className="text-2xl md:text-3xl text-gray-300">

          Moderne Haarschnitte, perfekte Fades und professionelles Styling.

        </p>

        <div className="flex justify-center">

          <Link href="/booking">

            <button className="bg-white text-black px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-gray-200 transition cursor-pointer">

              Termin buchen

            </button>

          </Link>

        </div>

      </div>

    </main>

  );

}