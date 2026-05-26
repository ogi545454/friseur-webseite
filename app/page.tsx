export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-800 fixed top-0 left-0 w-full bg-black/80 backdrop-blur z-50">
        <h1 className="text-2xl font-bold">
          Barber Studio
        </h1>

        <div className="flex gap-6">
          <a href="#">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Kontakt</a>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage: "url('/logo.jpg')",
        }}
      >

        <h2 className="text-7xl font-bold mb-6">
          Premium Barber Shop
        </h2>

        <p className="text-xl text-gray-200 max-w-2xl mb-8">
          Moderne Haarschnitte, perfekte Fades und professionelles Styling.
        </p>

        <button className="bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-200 transition">
          Termin buchen
        </button>

      </section>

      {/* Services */}
      <section
        id="services"
        className="py-24 px-8 max-w-6xl mx-auto"
      >

        <h3 className="text-5xl font-bold mb-16 text-center">
          Unsere Services
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-gray-900 p-8 rounded-3xl">
            <h4 className="text-2xl font-bold mb-4">
              Herrenhaarschnitt
            </h4>

            <p className="text-gray-400 mb-4">
              Moderner Schnitt mit perfektem Finish.
            </p>

            <span className="text-2xl font-bold">
              25€
            </span>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl">
            <h4 className="text-2xl font-bold mb-4">
              Fade Cut
            </h4>

            <p className="text-gray-400 mb-4">
              Professioneller Skin Fade & Styling.
            </p>

            <span className="text-2xl font-bold">
              30€
            </span>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl">
            <h4 className="text-2xl font-bold mb-4">
              Bart Styling
            </h4>

            <p className="text-gray-400 mb-4">
              Präzise Konturen & Pflege.
            </p>

            <span className="text-2xl font-bold">
              15€
            </span>
          </div>

        </div>

      </section>

    </main>
  );
}