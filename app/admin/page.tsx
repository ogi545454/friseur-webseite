"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();

  const [appointments, setAppointments] =
    useState<any[]>([]);

  // Login prüfen + Daten laden
  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem(
        "adminLoggedIn"
      );

    if (!isLoggedIn) {

      router.push("/admin/login");

      return;

    }

    fetchAppointments();

  }, []);

  // Termine laden
  const fetchAppointments =
    async () => {

      try {

        const response =
          await fetch(
            "/api/appointments"
          );

        const data =
          await response.json();

        setAppointments(data);

      } catch (error) {

        console.log(error);

      }

    };

  // Termin löschen
  const deleteAppointment =
    async (id: number) => {

      try {

        await fetch(
          `/api/appointments/${id}`,
          {
            method: "DELETE",
          }
        );

        fetchAppointments();

      } catch (error) {

        console.log(error);

      }

    };

  // Logout
  const logout = () => {

    localStorage.removeItem(
      "adminLoggedIn"
    );

    router.push("/admin/login");

  };

  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 px-6 py-3 rounded-2xl hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {appointments.length === 0 && (

          <div className="bg-gray-900 p-6 rounded-2xl text-center">

            Keine Termine vorhanden

          </div>

        )}

        {appointments.map(
          (appointment: any) => (

            <div
              key={appointment.id}
              className="bg-gray-900 p-6 rounded-2xl flex justify-between items-center"
            >

              <div className="flex flex-col gap-2">

                <p>
                  <strong>Name:</strong>{" "}
                  {appointment.customerName}
                </p>

                <p>
                  <strong>Telefon:</strong>{" "}
                  {appointment.customerPhone}
                </p>

                <p>
                  <strong>E-Mail:</strong>{" "}
                  {appointment.customerEmail}
                </p>

                <p>
                  <strong>Mitarbeiter:</strong>{" "}
                  {appointment.employee}
                </p>

                <p>
                  <strong>Service:</strong>{" "}
                  {appointment.service}
                </p>

                <p>
                  <strong>Datum:</strong>{" "}
                  {appointment.date}
                </p>

                <p>
                  <strong>Uhrzeit:</strong>{" "}
                  {appointment.time}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteAppointment(
                    appointment.id
                  )
                }
                className="bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Löschen
              </button>

            </div>

          )
        )}

      </div>

    </main>
  );
}