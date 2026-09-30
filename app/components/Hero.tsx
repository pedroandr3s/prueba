import Image from "next/image";

// Hero: sección principal con título, descripción, botón y una imagen.
export default function Hero() {
  return (
    <section id="resumir" className="px-8 py-16 bg-blue-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Resumidor de Documentos con IA</h1>
      <p className="text-lg mb-6">Sube tus documentos y obtén resúmenes concisos en segundos.</p>
      <a href="#resumir" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Comenzar</a>
      <div className="mt-8">
        <Image src="/hero.svg" alt="Hero Image" width={600} height={400} className="mx-auto" />
      </div>
    </section>
  );
} 