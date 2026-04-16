import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-6 py-24">
        <h1 className="brand-gradient-text text-6xl font-black">
          Solimouv'
        </h1>
        <p className="mt-4 max-w-md text-center text-lg text-gray-500">
          Festival sport & inclusion par Up Sport !
        </p>
      </main>
    </div>
  );
}
