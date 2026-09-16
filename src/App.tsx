import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { CatalogueSection } from './components/CatalogueSection';
import { AlbumSection } from './components/AlbumSection';
import { QuoteSection } from './components/QuoteSection';
import { ContactSection } from './components/ContactSection';
import { ActualitesSection } from './components/ActualitesSection';
import { ClientPortal } from './components/ClientPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ServiceItem, ProductItem, User as UserType } from './types';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('accueil');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem('nehemie_user');
    return saved ? JSON.parse(saved) : {
      id: 'u1',
      name: 'GM Tech Administrateur',
      email: 'nehemiekitambala087@gmail.com',
      phone: '+243 97 888 5682',
      role: 'admin',
      token: 'admin-token'
    };
  });

  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledItem, setPrefilledItem] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gmtech_theme');
    return saved ? JSON.parse(saved) : true;
  });

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('gmtech_theme', JSON.stringify(next));
  };

  useEffect(() => {
    // Fetch services and products
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));

    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleLoginSuccess = (user: UserType) => {
    setCurrentUser(user);
    localStorage.setItem('nehemie_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('nehemie_user');
    setCurrentTab('accueil');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col font-sans selection:bg-amber-500 selection:text-black transition-colors duration-300`}>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-black py-2.5 px-4 text-center text-xs font-bold tracking-wide shadow-md flex items-center justify-center gap-2 border-b border-amber-500/30">
        <Sparkles className="w-4 h-4 shrink-0 text-black" />
        <span>GM TECH — Groupe Marcus Technologie • Confort, énergie, électricité, solaire, plomberie et maintenance à Kinshasa</span>
      </div>

      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={(mode) => setAuthModalMode(mode)}
        onLogout={handleLogout}
        services={services}
        products={products}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1">
        {currentTab === 'accueil' && (
          <HomeSection
            setCurrentTab={setCurrentTab}
            onSelectService={(serviceName) => {
              setPrefilledService(serviceName);
              setPrefilledItem('');
            }}
          />
        )}

        {currentTab === 'services' && (
          <ServicesSection
            services={services}
            setCurrentTab={setCurrentTab}
            onSelectService={(serviceName) => {
              setPrefilledService(serviceName);
              setPrefilledItem('');
            }}
          />
        )}

        {currentTab === 'catalogue' && (
          <CatalogueSection
            products={products}
            setCurrentTab={setCurrentTab}
            onSelectProduct={(productTitle) => {
              setPrefilledItem(productTitle);
            }}
          />
        )}

        {currentTab === 'album' && (
          <AlbumSection currentUser={currentUser} />
        )}

        {currentTab === 'actualites' && (
          <ActualitesSection />
        )}

        {currentTab === 'realisations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                NOS PROJETS & RÉALISATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ils nous ont fait confiance
              </h2>
              <p className="text-slate-300 text-base">
                Quelques exemples de réalisations et domaines d'intervention de GM Tech à Kinshasa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Plateforme E-commerce Kinshasa', category: 'Sites web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', desc: 'Site de vente en ligne avec paiement mobile money.' },
                { title: 'Application Android de Livraison', category: 'Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', desc: 'App mobile intuitive de commande et suivi GPS en temps réel.' },
                { title: 'Identité Visuelle Entreprise', category: 'Design graphique', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', desc: 'Refonte complète de la charte graphique et logos professionnels.' },
                { title: 'Logiciel de Gestion de Stock', category: 'Logiciel', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', desc: 'ERP sur mesure pour entreprises commerciales et industrielles.' },
                { title: 'Campagne Community Management', category: 'Marketing', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80', desc: 'Stratégie de communication digitale et visuels publicitaires.' },
                { title: 'Audit & Conseil Numérique', category: 'Conseil', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80', desc: 'Accompagnement technologique et sécurisation de parcs informatiques.' },
              ].map((proj, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg group">
                  <div className="h-48 overflow-hidden bg-slate-800">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-xs font-semibold text-amber-400 uppercase">{proj.category}</span>
                    <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'devis' && (
          <QuoteSection
            services={services}
            prefilledService={prefilledService}
            prefilledItem={prefilledItem}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'contact' && <ContactSection />}

        {currentTab === 'client-portal' && (
          <ClientPortal
            currentUser={currentUser}
            setCurrentTab={setCurrentTab}
            onOpenAuth={(mode) => setAuthModalMode(mode)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            setCurrentTab={setCurrentTab}
          />
        )}
      </main>

      <Footer setCurrentTab={setCurrentTab} />

      {/* Auth Modal */}
      {authModalMode && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* AI Assistant Chat Modal */}
      <AiAssistantModal />
    </div>
  );
}
