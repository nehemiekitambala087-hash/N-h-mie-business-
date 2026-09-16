import React, { useState, useEffect } from 'react';
import { User as UserType, QuoteRequest, Project, AppNotification } from '../types';
import { FileText, Briefcase, Bell, UserCheck, Clock, CheckCircle, AlertCircle, ArrowRight, Shield, User, HelpCircle, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';

interface ClientPortalProps {
  currentUser: UserType | null;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  currentUser,
  setCurrentTab,
  onOpenAuth
}) => {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'projects' | 'notifications' | 'profile' | 'faq'>('requests');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqList = [
    {
      question: "Quels sont les délais de livraison pour les différents services ?",
      answer: "Les délais varient selon la complexité du projet : \n- Sites vitrines & Packs Logo : 3 à 7 jours ouvrés.\n- Applications Android & Sites E-commerce : 10 à 25 jours ouvrés.\n- Logiciels de gestion sur mesure & ERP : 2 à 6 semaines avec points d'étape réguliers.",
      category: "Délais de livraison"
    },
    {
      question: "Quelles sont les méthodes de paiement acceptées ?",
      answer: "Nous acceptons plusieurs modes de paiement sécurisés à Kinshasa et en RDC :\n- Mobile Money (M-Pesa, Airtel Money, Orange Money)\n- Virement bancaire professionnel\n- Paiement en espèces (Cash) dans nos bureaux à Kinshasa\n- Paiements échelonnés possibles selon l'envergure du projet (généralement 50% à la commande, 50% à la livraison).",
      category: "Paiements"
    },
    {
      question: "Comment puis-je suivre l'avancement de mon projet ?",
      answer: "Vous pouvez suivre l'état d'avancement en temps réel directement dans cet Espace Client sous l'onglet 'Suivi de projets' avec barre de progression, ou en contactant notre équipe directement par WhatsApp au +243 97 888 5682.",
      category: "Suivi"
    },
    {
      question: "Bénéficie-t-on d'un support technique après la livraison ?",
      answer: "Oui ! Tous nos projets incluent une période de garantie et de maintenance technique gratuite (de 1 mois à 1 an selon le contrat). Nous proposons ensuite des contrats de maintenance évolifs 24/7.",
      category: "Support"
    },
    {
      question: "Comment démarrer une nouvelle demande de devis ?",
      answer: "Cliquez simplement sur le bouton '+ Nouvelle demande' en haut de cette page ou rendez-vous sur l'onglet 'Demander un devis' pour remplir notre formulaire interactif.",
      category: "Commandes"
    }
  ];

  useEffect(() => {
    if (currentUser) {
      fetch('/api/requests')
        .then(res => res.json())
        .then(data => {
          // Filter requests for current user or show all if demo
          const userReqs = data.filter((r: QuoteRequest) => r.email === currentUser.email || r.name === currentUser.name || currentUser.role === 'admin');
          setRequests(userReqs.length > 0 ? userReqs : data);
        });

      fetch('/api/projects')
        .then(res => res.json())
        .then(data => setProjects(data));

      fetch('/api/notifications')
        .then(res => res.json())
        .then(data => setNotifications(data));
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
          <User className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Espace Client Sécurisé</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Veuillez vous connecter ou créer un compte pour suivre vos demandes de devis et l'avancement de vos projets en temps réel.
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-8 py-3.5 rounded-xl font-bold bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800"
          >
            Se connecter
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="px-8 py-3.5 rounded-xl font-bold bg-amber-600 text-white hover:bg-amber-500 shadow-lg shadow-amber-500/30"
          >
            Créer un compte
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Terminée':
      case 'Terminé':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Terminée</span>;
      case 'En cours':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">En cours</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">En attente</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Client Welcome Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xs text-amber-400 font-semibold uppercase">Espace Client Officiel</div>
            <h2 className="text-2xl font-extrabold text-white">Bonjour, {currentUser.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.email} • {currentUser.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-500 shadow-md flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Tableau de bord Admin</span>
            </button>
          )}
          <button
            onClick={() => { setCurrentTab('devis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800 transition-colors"
          >
            + Nouvelle demande
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'requests'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Mes demandes de devis ({requests.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Suivi de projets ({projects.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Mon Profil</span>
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'faq'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ (Délais & Paiements)</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'faq' && (
          <div className="space-y-6 max-w-4xl">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase">
                Foire Aux Questions
              </span>
              <h3 className="text-2xl font-extrabold text-white">Tout ce que vous devez savoir sur nos services</h3>
              <p className="text-slate-300 text-sm">
                Consultez nos réponses détaillées concernant les délais de livraison, les méthodes de paiement et le suivi de vos projets à Kinshasa.
              </p>
            </div>

            <div className="space-y-4">
              {faqList.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white text-base sm:text-lg">{item.question}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-slate-900 text-amber-400 text-xs font-semibold">
                          {item.category}
                        </span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-900/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">Vous avez une autre question spécifique ?</h4>
                <p className="text-xs text-slate-300 mt-1">Notre équipe vous répond instantanément sur WhatsApp.</p>
              </div>
              <a
                href="https://wa.me/243978885682?text=Bonjour%20GM Tech%20Business,%20j'ai%20une%20question%20concernant..."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md shrink-0 flex items-center gap-2 text-xs"
              >
                <span>Poser une question sur WhatsApp</span>
              </a>
            </div>
          </div>
        )}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Historique de vos demandes</h3>
            <div className="grid grid-cols-1 gap-4">
              {requests.map((req) => (
                <div key={req.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-amber-400 font-mono font-bold text-base">{req.trackingNumber}</span>
                      {getStatusBadge(req.status)}
                    </div>
                    <div className="text-lg font-bold text-white">{req.service} {req.item ? `— ${req.item}` : ''}</div>
                    <p className="text-xs text-slate-400">{req.description}</p>
                    <div className="text-xs text-slate-500">Date : {req.createdAt} • Budget : {req.budget}</div>
                  </div>
                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <a
                      href={`https://wa.me/243978885682?text=Bonjour%20GM Tech%20Business,%20je%20souhaite%20des%20nouvelles%20de%20ma%20demande%20${req.trackingNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      Discuter sur WhatsApp
                    </a>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center py-12 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400">
                  Aucune demande enregistrée.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Suivi de l'avancement des projets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">{proj.service}</span>
                    {getStatusBadge(proj.status)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">Client : {proj.clientName} • Échéance : {proj.deadline}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>Progression</span>
                      <span>{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-600 to-amber-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }}></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <b>Notes :</b> {proj.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Vos Notifications</h3>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className={`p-4 rounded-2xl border flex items-start space-x-4 ${n.read ? 'bg-slate-950 border-slate-800' : 'bg-amber-500/10 border-amber-500/30'}`}>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{n.title}</h4>
                      <span className="text-xs text-slate-500">{n.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center py-12 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400">
                  Aucune notification pour le moment.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 max-w-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Gestion du Profil</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Nom complet</label>
                <input type="text" readOnly value={currentUser.name} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Email</label>
                <input type="email" readOnly value={currentUser.email} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Téléphone</label>
                <input type="text" readOnly value={currentUser.phone} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase">Rôle utilisateur</label>
                <input type="text" readOnly value={currentUser.role.toUpperCase()} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 text-sm font-bold mt-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
