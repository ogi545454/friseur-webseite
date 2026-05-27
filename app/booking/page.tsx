"use client";

import { useEffect, useState } from "react";

const times = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const holidays = [
  "2026-01-01",
  "2026-01-06",
  "2026-04-06",
  "2026-05-01",
  "2026-05-14",
  "2026-05-25",
  "2026-06-04",
  "2026-08-15",
  "2026-10-26",
  "2026-11-01",
  "2026-12-08",
  "2026-12-25",
  "2026-12-26",
];

export default function BookingPage() {

  const [selectedTime, setSelectedTime] =
    useState("");

  const [selectedService, setSelectedService] =
    useState("");

  const [selectedEmployee, setSelectedEmployee] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [confirmed, setConfirmed] =
    useState(false);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [currentWeekOffset, setCurrentWeekOffset] =
    useState(0);

  const [weekDays, setWeekDays] =
    useState<Date[]>([]);

  const [bookedAppointments, setBookedAppointments] =
    useState<any[]>([]);

  // Termine aus Datenbank laden
  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const response =
          await fetch("/api/appointments");

        const data =
          await response.json();

        setBookedAppointments(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchAppointments();

  }, []);

  // Woche laden
  useEffect(() => {

    const today = new Date();

    const currentDay = today.getDay();

    const monday = new Date(today);

    monday.setDate(
      today.getDate()
      - (currentDay === 0 ? 6 : currentDay - 1)
      + currentWeekOffset * 7
    );

    const days: Date[] = [];

    for (let i = 0; i < 6; i++) {

      const day = new Date(monday);

      day.setDate(monday.getDate() + i);

      days.push(day);

    }

    setWeekDays(days);

  }, [currentWeekOffset]);

  const handleDateSelect = (date: Date) => {

    const formattedDate =
      date.toISOString().split("T")[0];

    if (holidays.includes(formattedDate)) {

      alert("Feiertag - Salon geschlossen");

      return;

    }

    setSelectedDate(formattedDate);

  };

  // Termin speichern
  const handleBooking = async () => {

  if (
    !selectedService ||
    !selectedEmployee ||
    !selectedDate ||
    !selectedTime ||
    !customerName ||
    !customerPhone ||
    !customerEmail
  ) {

    alert("Bitte alles ausfüllen");

    return;

  }

  const confirmBooking =
    window.confirm(
      "Bist du sicher, dass du den Termin buchen möchtest?\n\nStornierungen sind nur telefonisch möglich."
    );

  if (!confirmBooking) {

    return;

  }

  try {

    const response =
      await fetch(
        "/api/appointments",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            customerName,
            customerPhone,
            customerEmail,

            employee:
              selectedEmployee,

            service:
              selectedService,

            date:
              selectedDate,

            time:
              selectedTime,

          }),

        }
      );

    if (!response.ok) {

      throw new Error(
        "Fehler beim Speichern"
      );

    }

    const updatedResponse =
      await fetch(
        "/api/appointments"
      );

    const updatedData =
      await updatedResponse.json();

    setBookedAppointments(
      updatedData
    );

    setConfirmed(true);

  } catch (error) {

    alert(
      "Termin konnte nicht gespeichert werden"
    );

  }

};

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10 text-center">
        Termin buchen
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-3xl flex flex-col gap-6">

        {/* Service */}
        <div>

          <label className="block mb-2 text-lg">
            Service auswählen
          </label>

          <select
            className="w-full p-4 rounded-xl bg-black border border-gray-700"
            onChange={(e) =>
              setSelectedService(
                e.target.value
              )
            }
          >

            <option value="">
              Service wählen
            </option>

            <option>
              Herrenhaarschnitt
            </option>

            <option>
              Fade Cut
            </option>

            <option>
              Bart Styling
            </option>

          </select>

        </div>

        {/* Mitarbeiter */}
        <div>

          <label className="block mb-2 text-lg">
            Mitarbeiter auswählen
          </label>

          <select
            className="w-full p-4 rounded-xl bg-black border border-gray-700"
            onChange={(e) =>
              setSelectedEmployee(
                e.target.value
              )
            }
          >

            <option value="">
              Mitarbeiter wählen
            </option>

            <option>Hasan</option>
            <option>Tuni</option>
            <option>Samet</option>

          </select>

        </div>

        {/* Woche wechseln */}
        <div className="flex justify-between items-center">

          <button
            onClick={() =>
              setCurrentWeekOffset(
                currentWeekOffset - 1
              )
            }
            className="bg-black border border-gray-700 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >
            ← Vorige Woche
          </button>

          <button
            onClick={() =>
              setCurrentWeekOffset(
                currentWeekOffset + 1
              )
            }
            className="bg-black border border-gray-700 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
          >
            Nächste Woche →
          </button>

        </div>

        {/* Wochenansicht */}
        <div>

          <label className="block mb-4 text-lg">
            Woche auswählen
          </label>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">

            {weekDays.map((day) => {

              const formattedDate =
                day.toISOString().split("T")[0];

              const isSelected =
                selectedDate ===
                formattedDate;

              return (
                <button
                  key={formattedDate}
                  onClick={() =>
                    handleDateSelect(day)
                  }
                  className={`p-4 rounded-2xl border transition
                  ${
                    isSelected
                      ? "bg-white text-black border-white"
                      : "bg-black border-gray-700 hover:bg-white hover:text-black"
                  }`}
                >

                  <div className="font-bold">

                    {day.toLocaleDateString(
                      "de-AT",
                      {
                        weekday: "short",
                      }
                    )}

                  </div>

                  <div className="text-lg">

                    {day.getDate()}.
                    {day.getMonth() + 1}

                  </div>

                </button>
              );
            })}

          </div>

        </div>

        {/* Freie Termine */}
        <div>

          <label className="block mb-4 text-lg">
            Freie Termine
          </label>

          <div className="grid grid-cols-3 gap-4">

            {times.map((time) => {

              const isBooked =
                bookedAppointments.some(
                  (appointment) =>
                    appointment.employee ===
                      selectedEmployee &&
                    appointment.date ===
                      selectedDate &&
                    appointment.time ===
                      time
                );

              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() =>
                    setSelectedTime(time)
                  }
                  className={`rounded-xl py-3 transition border
                  ${
                    isBooked
                      ? "bg-red-600 cursor-not-allowed border-red-600"
                      : selectedTime ===
                        time
                      ? "bg-white text-black border-white"
                      : "bg-black border-gray-700 hover:bg-white hover:text-black"
                  }`}
                >
                  {isBooked
                    ? `${time} ❌`
                    : time}
                </button>
              );
            })}

          </div>

        </div>

        {/* Kundendaten */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full p-4 rounded-xl bg-black border border-gray-700"
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Telefonnummer"
            className="w-full p-4 rounded-xl bg-black border border-gray-700"
            onChange={(e) =>
              setCustomerPhone(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="E-Mail"
            className="w-full p-4 rounded-xl bg-black border border-gray-700"
            onChange={(e) =>
              setCustomerEmail(
                e.target.value
              )
            }
          />

        </div>

        {/* Termin bestätigen */}
        <button
          onClick={handleBooking}
          className="bg-white text-black py-4 rounded-2xl text-lg font-bold hover:bg-gray-200 transition"
        >
          Termin bestätigen
        </button>

        {/* Bestätigung */}
        {confirmed && (

          <div className="bg-green-600 p-6 rounded-2xl mt-4">

            <h2 className="text-2xl font-bold mb-4">
              Termin bestätigt ✅
            </h2>

            <p>
              Service: {selectedService}
            </p>

            <p>
              Mitarbeiter: {selectedEmployee}
            </p>

            <p>
              Datum: {selectedDate}
            </p>

            <p>
              Uhrzeit: {selectedTime}
            </p>

            <p>
              Kunde: {customerName}
            </p>

          </div>

        )}

      </div>

    </main>
  );
}