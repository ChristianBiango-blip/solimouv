"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleTestInsert() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/test-db", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        setResult(`✅ Insertion réussie ! ID: ${data.insertedId}`);
      } else {
        setResult(`❌ Erreur : ${data.error}`);
      }
    } catch {
      setResult("❌ Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-bold">Solimouv'</h1>

      <button
        onClick={handleTestInsert}
        disabled={loading}
        className="rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Insertion en cours..." : "Tester MongoDB"}
      </button>

      {result && (
        <p className="max-w-md text-center text-sm">{result}</p>
      )}
    </div>
  );
}
