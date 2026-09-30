import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UploadForm from "./components/UploadForm";
import Footer from "./components/Footer";

// La página solo ordena los componentes; no necesita "use client".
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <UploadForm />
      </main>
      <Footer />
    </>
  );
}
