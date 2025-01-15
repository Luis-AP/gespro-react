import { BookOpen } from 'lucide-react';

function HeroSection() {
  return (
    <div className="w-1/3 p-12 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-10 h-10 text-white" />
        <span className="text-2xl font-bold text-white">Universidad de Gulubú</span>
      </div>
      <h1 className="text-3xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Desarrollo Web
      </h1>
      <p className="text-gray-400 text-lg mt-6">
        Trabaja con tus compañeros o invidualmente para presentar las actividades de Desarrollo Web.
      </p>
    </div>
  );
}

export default HeroSection;