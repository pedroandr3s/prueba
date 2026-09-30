import Image from "next/image";

const features = [
  {
    title: "Resúmenes rápidos",
    description: "Obtén resúmenes concisos de tus documentos en segundos.",
    icon: "/icons/summary.svg",
  },
  {
    title: "Soporte para múltiples formatos",
    description: "Sube PDFs, Word, Excel, Markdown o imágenes y la IA los procesará.",
    icon: "/icons/formats.svg",
  },
  {
    title: "Fácil de usar",
    description: "Interfaz intuitiva que permite subir y resumir documentos sin complicaciones.",
    icon: "./next.svg",
  },
];

export default function Features() {
  return (
    <section id="caracteristicas" className="px-8 py-16 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Características</h2>
      <div className="grid grid-cols-1 md:grid-cols- 3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image src={feature.icon} alt={feature.title} width={64} height={64} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}