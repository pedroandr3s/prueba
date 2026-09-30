"use client";

import { useState } from "react";

// Formulario de subida: es Client Component porque usa estado y eventos.
export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return setResult("Elige un archivo primero.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/analyze", { method: "POST", body: formData });
    const data = await response.json();
    setResult(response.ok ? data.summary : `Error: ${data.error}`);
    setLoading(false);
  }

  return (
    <section id="resumir" className="px-8 py-16 text-center">
      <h2 className="text-2xl font-bold mb-8">Resume tu documento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.docx,.xlsx,.md,.txt,.csv,.json,.html,.xml,.log,.png,.jpg,.jpeg,.webp,.gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          {loading ? "Resumiendo..." : "Resumir"}
        </button>
      </form>
      {result && <p className="mt-6 whitespace-pre-wrap">{result}</p>}
    </section>
  );
}
