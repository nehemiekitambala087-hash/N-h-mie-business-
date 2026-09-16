import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Globe, Smartphone, Code, Palette, Share2, Briefcase, Database, Wrench, Cpu, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  setCurrentTab: (tab: string) => void;
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  setCurrentTab,
  onSelectService
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Web', 'Mobile', 'Logiciel', 'Design', 'Marketing', 'Entreprise', 'Support', 'Conseil', 'Sur mesure'];

  const filteredServices = selectedCategory === 'Tous'
    ? services
    : services.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-7 h-7" />;
      case 'Smartphone': return <Smartphone className="w-7 h-7" />;
      case 'Code': return <Code className="w-7 h-7" />;
      case 'Palette': return <Palette className="w-7 h-7" />;
      case 'Share2': return <Share2 className="w-7 h-7" />;
      case 'Briefcase': return <Briefcase className="w-7 h-7" />;
      case 'Database': return <Database className="w-7 h-7" />;
      case 'Wrench': return <Wrench className="w-7 h-7" />;
      case 'Cpu': return <Cpu className="w-7 h-7" />;
      default: return <Sparkles className="w-7 h-7" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          NOTRE EXPERTISE PROFESSIONNELLE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Nos 10 Services au Service de Votre Succès
        </h2>
        <p className="text-slate-300 text-base">
          Des solutions digitales et technologiques complètes pour répondre à tous vos besoins professionnels à Kinshasa et en RDC.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600/20 to-amber-600/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(service.icon)}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                  {service.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Sur devis & rapide
              </span>
              <button
                onClick={() => {
                  onSelectService(service.title);
                  setCurrentTab('devis');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-600/20 text-amber-400 hover:bg-amber-600 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>Demander</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
