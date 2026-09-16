import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Shield, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-black text-slate-300 border-t border-amber-500/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-amber-500/40">
              <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white tracking-wide">NÉHÉMIE <span className="text-amber-500">BUSINESS</span></h3>
              <p className="text-xs text-slate-400">Agence Digitale & Technologique</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Votre partenaire de confiance à Kinshasa et partout en RDC pour propulser vos projets vers le succès numérique.
          </p>
          <div className="flex items-center space-x-2.5 pt-2">
            <a
              href="https://wa.me/243978885682"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-md"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all shadow-md"
              title="TikTok"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-md"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all shadow-md"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-amber-400 font-semibold text-base mb-4 tracking-wide uppercase text-xs">Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => { setCurrentTab('accueil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Accueil
              </button>
            </li>
            <li>
              <button onClick={() => { setCurrentTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Nos services
              </button>
            </li>
            <li>
              <button onClick={() => { setCurrentTab('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Catalogue & Produits
              </button>
            </li>
            <li>
              <button onClick={() => { setCurrentTab('album'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Album Photos & Vidéos
              </button>
            </li>
            <li>
              <button onClick={() => { setCurrentTab('actualites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Actualités & Tendances
              </button>
            </li>
            <li>
              <button onClick={() => { setCurrentTab('devis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Demander un devis
              </button>
            </li>
            <li>
              <button onClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-500">›</span> Contact & Localisation
              </button>
            </li>
          </ul>
        </div>

        {/* Services List */}
        <div>
          <h4 className="text-amber-400 font-semibold text-base mb-4 tracking-wide uppercase text-xs">Expertises Clés</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">• Création de sites web</li>
            <li className="flex items-center gap-2">• Applications Android</li>
            <li className="flex items-center gap-2">• Développement logiciels</li>
            <li className="flex items-center gap-2">• Design graphique & Logos</li>
            <li className="flex items-center gap-2">• Solutions pour entreprises</li>
            <li className="flex items-center gap-2">• Systèmes de gestion & ERP</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-amber-400 font-semibold text-base mb-4 tracking-wide uppercase text-xs">Coordonnées</h4>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>Kinshasa, République Démocratique du Congo</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <span>WhatsApp: +243 97 888 5682<br/>Tél: +243 841 069 748</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <span>nehemiekitambala087@gmail.com</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium"
            >
              <Shield className="w-3.5 h-3.5" /> Accès Tableau de bord Administrateur
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} GM Tech. Tous droits réservés.</p>
        <p className="mt-2 sm:mt-0">Ensemble pour votre réussite numérique !</p>
      </div>
    </footer>
  );
};
