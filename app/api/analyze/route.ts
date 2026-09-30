// Importa el SDK oficial de Anthropic: la clase "Anthropic" es el cliente que habla con la API de Claude.
import Anthropic from "@anthropic-ai/sdk";
// NextResponse es el helper de Next.js para construir respuestas HTTP (aquí, respuestas JSON).
import { NextResponse } from "next/server";

// Crea UNA sola instancia del cliente al cargar el módulo (se reutiliza en cada petición).
const anthropic = new Anthropic({
  // La clave se lee de la variable de entorno (.env.local) para que nunca quede escrita en el código ni llegue al navegador.
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// En el App Router de Next.js, exportar una función llamada POST define el handler del método HTTP POST
// para la ruta /api/analyze (la ruta viene de la carpeta app/api/analyze/route.ts).
// "async" porque adentro esperamos operaciones lentas (leer el archivo y llamar a la API).
export async function POST(request: Request) {
  // Lee el cuerpo de la petición como multipart/form-data (el formato que envía el FormData del frontend).
  const formData = await request.formData();
  // Obtiene el campo "file" (mismo nombre usado en formData.append("file", ...) en page.tsx).
  // "as File" le dice a TypeScript que es un archivo (get() devuelve File | string | null).
  const file = formData.get("file") as File;
  // Lee el contenido binario del archivo en memoria como ArrayBuffer.
  const buffer = await file.arrayBuffer();
  // La API de Claude recibe los documentos como texto base64: convertimos ArrayBuffer -> Buffer de Node -> string base64.
  const base64File = Buffer.from(buffer).toString("base64");

  // Llama a la API de Mensajes de Claude y espera la respuesta. (El nombre "messagge" tiene una g de más, pero funciona igual.)
  const messagge= await anthropic.messages.create({
    // Modelo a usar. OJO: el ID exacto de Sonnet 5.5 es "claude-sonnet-5-5"; si "claude-sonnet-5" falla, revisar este valor.
    model: "claude-sonnet-5",
    // Límite de tokens de la respuesta: 300 mantiene el resumen corto (y barato).
    max_tokens: 300,
    // Lista de la conversación; aquí solo enviamos un mensaje.
    messages: [
      {
        // "user" indica que el mensaje viene de nosotros (el usuario), no del modelo.
        role: "user",
        // El contenido es un arreglo de bloques porque mezclamos dos tipos: documento + texto.
        content: [
          // Bloque "document": adjunta el archivo. source.type "base64" indica que va incrustado en la petición,
          // media_type declara que es un PDF (Claude solo lee PDFs como documento), y data es el contenido codificado.
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64File } },
          // Bloque "text": la instrucción que le damos a Claude sobre qué hacer con el documento.
          { type: "text", text: "Resume este documento en 3-4 líneas." }
        ]
        }
    ],

  });
    // La respuesta trae un arreglo "content" con bloques; buscamos el primero de tipo "text" (puede haber otros tipos).
    const textBlock = messagge.content.find((block) => block.type === "text");
    // Devuelve JSON { summary: "..." } al frontend. La comprobación "textBlock?.type === 'text'" es para que
    // TypeScript sepa que existe .text; si no hubo bloque de texto, se devuelve string vacío en vez de fallar.
    return NextResponse.json({ summary: textBlock?.type === "text" ? textBlock.text : "" });
}