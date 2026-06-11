import { Header } from '@/components/studio/Header';
import { Hero } from '@/components/studio/Hero';
import { Scene3D } from '@/components/studio/Scene3D';
import { Services } from '@/components/studio/Services';
import { About } from '@/components/studio/About';
import { Contact } from '@/components/studio/Contact';

export default function HomePage() {
  return (
    <main className="min-h-screen font-inter">
      <Scene3D />
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div className="relative bg-white">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1e1e24] to-white pointer-events-none z-10" />
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>

      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">A</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 flex items-center gap-1">Atharv Digital <span className="text-blue-600">Photo Studio</span></span>
          </div>

          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <span className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Atharv Digital Photo Studio
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
