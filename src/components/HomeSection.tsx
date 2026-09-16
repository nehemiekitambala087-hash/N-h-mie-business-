import React, { useState } from 'react';
import { Globe, Smartphone, Code, Palette, Briefcase, Sparkles, ArrowRight, ShieldCheck, Zap, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
  onSelectService: (serviceName: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ setCurrentTab, onSelectService }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const quickActions = [
    { title: 'Nos services', icon: Globe, tab: 'services', desc: '10 expertises pro', color: 'from-amber-600 to-amber-700' },
    { title: 'Catalogue', icon: Smartphone, tab: 'catalogue', desc: 'Produits & tarifs', color: 'from-amber-700 to-amber-900' },
    { title: 'Demander un devis', icon: Code, tab: 'devis', desc: 'Devis rapide en ligne', color: 'from-amber-600 to-amber-800' },
    { title: 'Album / Galerie', icon: Palette, tab: 'album', desc: 'Nos réalisations visuelles', color: 'from-amber-600 to-slate-800' },
  ];

  const highlights = [
    { title: 'Création de sites web', icon: Globe, desc: 'Sites vitrines et e-commerce modernes' },
    { title: 'Applications Android', icon: Smartphone, desc: 'Apps mobiles sur mesure et performantes' },
    { title: 'Solutions Entreprises', icon: Briefcase, desc: 'Logiciels de gestion, ERP et comptabilité' },
    { title: 'Design & Social Media', icon: Sparkles, desc: 'Identité visuelle et community management' },
  ];

  const testimonials = [
    {
      name: 'Christian Ilunga',
      role: 'Directeur Général, Startup Tech Kinshasa',
      comment: "GM Tech a totalement transformé notre présence digitale avec un site web ultra rapide et un design d'une élégance remarquable. Service professionnel irréprochable !",
      rating: 5,
      initials: 'CI',
    },
    {
      name: 'Nathalie Mbuyi',
      role: 'Entrepreneure & Commerçante',
      comment: "Le logiciel de gestion et l'application mobile développés par l'équipe nous font gagner un temps précieux chaque jour. Je recommande vivement leurs compétences.",
      rating: 5,
      initials: 'NM',
    },
    {
      name: 'Héritier Kabuya',
      role: 'Responsable Marketing',
      comment: "Un accompagnement sur mesure à Kinshasa. Leur réactivité et leur maîtrise technique dépassent toutes nos attentes !",
      rating: 5,
      initials: 'HK',
    },
  ];

  return (
    <div className="space-y-16 pb-20 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Hero Section with Live Animated Background */}
      <section className="relative text-white pt-24 pb-32 overflow-hidden border-b border-amber-500/30">
        {/* Animated Background Image with Zoom Pulse */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.55, 0.45] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[url('/assets/hero_bg.jpg')] bg-cover bg-center pointer-events-none filter brightness-90"
        ></motion.div>

        {/* Animated Floating Gradient Orbs */}
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-amber-600/25 rounded-full blur-3xl pointer-events-none"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -60, 40, 0], y: [0, 50, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-amber-600/20 rounded-full blur-3xl pointer-events-none"
        ></motion.div>

        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-amber-950/70 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Agence Digitale & Technologique à Kinshasa</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                Vos idées, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-white">nos solutions !</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-slate-300 max-w-2xl leading-relaxed"
              >
                GM Tech vous accompagne dans la transformation numérique de votre entreprise : création de sites web, applications Android, logiciels de gestion, design graphique et conseil sur mesure.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={() => { setCurrentTab('devis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-8 py-4 rounded-xl font-bold bg-amber-600 text-white hover:bg-amber-500 shadow-xl shadow-amber-500/30 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Demander un devis gratuit</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setCurrentTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-8 py-4 rounded-xl font-semibold bg-slate-900/90 text-amber-400 border border-amber-500/30 hover:bg-slate-900 transition-all backdrop-blur-md"
                >
                  Découvrir nos services
                </button>
              </motion.div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 mt-8">
                <div>
                  <div className="text-3xl font-extrabold text-white">10+</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Services Pro</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-amber-400">24/7</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Support & Suivi</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Engagement Client</div>
                </div>
              </div>
            </div>

            {/* Hero Card / Logo Preview */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600 to-amber-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-amber-500/40">
                        <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">GM Tech</h3>
                        <p className="text-xs text-amber-400 font-medium">Groupe & Agence Technologique</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      ● Actif à Kinshasa
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Domaines d'Excellence</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {highlights.map((h, i) => {
                        const Icon = h.icon;
                        return (
                          <div key={i} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl space-y-1 hover:border-amber-500/40 transition-colors">
                            <Icon className="w-5 h-5 text-amber-400" />
                            <h5 className="font-bold text-xs text-white">{h.title}</h5>
                            <p className="text-[10px] text-slate-400 leading-tight">{h.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => { setCurrentTab('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full py-3 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 text-xs font-bold hover:bg-amber-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Explorer le catalogue de services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                onClick={() => { setCurrentTab(act.tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl cursor-pointer group transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${act.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{act.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{act.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission & Agency Presentation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              À PROPOS DE L'AGENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Votre partenaire technologique de confiance en République Démocratique du Congo.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Basée à Kinshasa, <strong className="text-white">GM Tech</strong> rassemble des experts passionnés par l'innovation, le développement logiciel, la création d'applications mobiles et le design de haute qualité. Notre mission est d'offrir aux entreprises et entrepreneurs des outils digitaux robustes pour accélérer leur croissance.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Qualité Garantie</h4>
                  <p className="text-xs text-slate-400">Standards professionnels stricts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Rapidité & Suivi</h4>
                  <p className="text-xs text-slate-400">Livraison et assistance dédiées.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-amber-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="flex items-center space-x-4 border-b border-slate-800 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xl">
                  NB
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">GM Tech</h3>
                  <p className="text-xs text-slate-400">Sise Kinshasa, RDC</p>
                </div>
              </div>
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <p>✓ Équipe technique qualifiée et expérimentée.</p>
                <p>✓ Devis gratuit et transparent adapté à chaque budget.</p>
                <p>✓ Suivi en temps réel de l'état d'avancement de vos projets.</p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold">Contact direct :</span>
                <span className="text-xs font-semibold text-white">+243 97 888 5682</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            AVIS & TÉMOIGNAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ce que disent nos clients
          </h2>
          <p className="text-slate-300 text-sm">
            Découvrez les retours d'expérience de ceux qui ont fait confiance à GM Tech pour leurs projets digitaux.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-6 right-8 text-amber-500/10">
              <Quote className="w-16 h-16" />
            </div>

            <div className="space-y-6 relative z-10 min-h-[160px] flex flex-col justify-between">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic">
                "{testimonials[currentTestimonial].comment}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                    {testimonials[currentTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-xs text-amber-400 font-medium">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-amber-600 hover:text-white text-slate-300 transition-all border border-slate-700 shadow-md"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-amber-600 hover:text-white text-slate-300 transition-all border border-slate-700 shadow-md"
                    aria-label="Témoignage suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentTestimonial === idx ? 'w-8 bg-amber-600' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Aller au témoignage ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-700 via-amber-700 to-amber-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-amber-500/30">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
            <span className="text-[180px] font-black">NB</span>
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold uppercase border border-white/20">
              Prêt à démarrer ?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Donnez vie à votre projet dès aujourd'hui avec GM Tech.
            </h2>
            <p className="text-sm sm:text-base font-medium text-slate-200">
              Remplissez notre formulaire de devis en 2 minutes ou contactez-nous directement par WhatsApp pour discuter de vos besoins.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { setCurrentTab('devis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-8 py-3.5 rounded-xl font-bold bg-black text-white hover:bg-slate-900 transition-all shadow-lg border border-slate-700"
              >
                Faire une demande de devis
              </button>
              <a
                href="https://wa.me/243978885682?text=Bonjour%20GM Tech%20Business,%20je%20souhaite%20discuter%20d'un%20projet."
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
