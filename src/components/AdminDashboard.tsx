import React, { useState, useEffect } from 'react';
import { User as UserType, QuoteRequest, Project, Client, ServiceItem, ProductItem, ContactMessage } from '../types';
import { LayoutDashboard, Users, FileText, Briefcase, Layers, ShoppingBag, MessageSquare, BarChart3, ShieldCheck, Plus, Check, Trash2, Edit } from 'lucide-react';

interface AdminDashboardProps {
  currentUser: UserType | null;
  setCurrentTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, setCurrentTab }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'demandes' | 'projets' | 'services' | 'produits' | 'messages' | 'statistiques' | 'utilisateurs'>('dashboard');
  
  const [stats, setStats] = useState({ clientsCount: 0, demandsCount: 0, projectsCount: 0, revenue: '0 $', pendingDemands: 0, activeProjects: 0 });
  const [clients, setClients] = useState<Client[]>([]);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // New item modal states
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProd, setNewProd] = useState({ title: '', category: 'Sites web', description: '', price: '150 $', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', features: ['Design pro', 'Responsive'] });

  const loadData = () => {
    fetch('/api/stats').then(res => res.json()).then(data => setStats(data));
    fetch('/api/clients').then(res => res.json()).then(data => setClients(data));
    fetch('/api/requests').then(res => res.json()).then(data => setRequests(data));
    fetch('/api/projects').then(res => res.json()).then(data => setProjects(data));
    fetch('/api/services').then(res => res.json()).then(data => setServices(data));
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
    fetch('/api/messages').then(res => res.json()).then(data => setMessages(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'En attente' | 'En cours' | 'Terminée') => {
    await fetch(`/api/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    loadData();
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd)
    });
    setNewProductModal(false);
    loadData();
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Accès Restreint</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Vous devez être connecté en tant qu'administrateur de GM Tech pour accéder à cette interface.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('accueil')}
          className="px-8 py-3 rounded-xl font-bold bg-amber-500 text-[#0A192F]"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0A192F] font-black text-2xl shadow-lg">
            NB
          </div>
          <div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Panneau d'Administration Officiel</div>
            <h2 className="text-2xl font-extrabold text-white">GM Tech — Gestion</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            ● Connecté en Admin
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none border-b border-slate-800 gap-2">
        {[
          { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'demandes', label: 'Demandes', icon: FileText },
          { id: 'projets', label: 'Projets', icon: Briefcase },
          { id: 'services', label: 'Services', icon: Layers },
          { id: 'produits', label: 'Produits', icon: ShoppingBag },
          { id: 'messages', label: 'Messages', icon: MessageSquare },
          { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
          { id: 'utilisateurs', label: 'Utilisateurs', icon: Users },
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-[#0A192F] shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Total Clients</div>
                <div className="text-3xl font-black text-white">{stats.clientsCount}</div>
                <div className="text-xs text-emerald-400 font-medium">Clients actifs enregistrés</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Demandes de Devis</div>
                <div className="text-3xl font-black text-amber-400">{stats.demandsCount}</div>
                <div className="text-xs text-amber-400 font-medium">{stats.pendingDemands} en attente</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Projets en Cours</div>
                <div className="text-3xl font-black text-amber-400">{stats.activeProjects}</div>
                <div className="text-xs text-amber-400 font-medium">Sur {stats.projectsCount} total projets</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2 shadow-lg">
                <div className="text-xs text-slate-400 font-semibold uppercase">Revenus Estimés</div>
                <div className="text-3xl font-black text-emerald-400">{stats.revenue}</div>
                <div className="text-xs text-slate-400 font-medium">Chiffre d'affaires global</div>
              </div>
            </div>

            {/* Recent Demands Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">Demandes récentes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800 text-xs uppercase text-slate-400 font-semibold">
                    <tr>
                      <th className="p-4 rounded-l-xl">Réf</th>
                      <th className="p-4">Client</th>
                      <th className="p-4">Service</th>
                      <th className="p-4">Budget</th>
                      <th className="p-4">Statut</th>
                      <th className="p-4 rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {requests.slice(0, 5).map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-bold text-amber-400">{r.trackingNumber}</td>
                        <td className="p-4 font-medium text-white">
                          <div>{r.name}</div>
                          <div className="text-xs text-slate-400">{r.phone}</div>
                        </td>
                        <td className="p-4">{r.service}</td>
                        <td className="p-4">{r.budget}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            r.status === 'Terminée' ? 'bg-emerald-500/20 text-emerald-400' :
                            r.status === 'En cours' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-4 flex items-center space-x-2">
                          <button onClick={() => handleUpdateStatus(r.id, 'En cours')} className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-[#0A192F]">Cours</button>
                          <button onClick={() => handleUpdateStatus(r.id, 'Terminée')} className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white">Finie</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Liste des Clients ({clients.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-xs uppercase text-slate-400 font-semibold">
                  <tr>
                    <th className="p-4 rounded-l-xl">Nom</th>
                    <th className="p-4">Téléphone</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Entreprise</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {clients.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-white">{c.name}</td>
                      <td className="p-4">{c.phone}</td>
                      <td className="p-4">{c.email}</td>
                      <td className="p-4">{c.company || '—'}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">{c.status}</span>
                      </td>
                      <td className="p-4 text-slate-400">{c.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DEMANDES TAB */}
        {activeTab === 'demandes' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Toutes les Demandes de Devis ({requests.length})</h3>
            <div className="space-y-4">
              {requests.map((r) => (
                <div key={r.id} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-3">
                      <span className="text-amber-400 font-mono font-bold text-base">{r.trackingNumber}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        r.status === 'Terminée' ? 'bg-emerald-500/20 text-emerald-400' :
                        r.status === 'En cours' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>{r.status}</span>
                    </div>
                    <div className="text-lg font-bold text-white">{r.name} — {r.service}</div>
                    <p className="text-xs text-slate-300">{r.description}</p>
                    <div className="text-xs text-slate-400">Tél: {r.phone} | Email: {r.email} | Budget: {r.budget}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleUpdateStatus(r.id, 'En attente')} className="px-3 py-1.5 rounded-lg text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white">Attente</button>
                    <button onClick={() => handleUpdateStatus(r.id, 'En cours')} className="px-3 py-1.5 rounded-lg text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-[#0A192F]">Cours</button>
                    <button onClick={() => handleUpdateStatus(r.id, 'Terminée')} className="px-3 py-1.5 rounded-lg text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white">Terminée</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJETS TAB */}
        {activeTab === 'projets' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Suivi des Projets Actifs ({projects.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">{proj.service}</span>
                    <span className="text-xs font-bold text-white">{proj.progress}%</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{proj.title}</h4>
                  <p className="text-xs text-slate-400">Client : {proj.clientName} • Échéance : {proj.deadline}</p>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Gestion des Services ({services.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
                <div key={s.id} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-amber-400">{s.title}</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300">{s.category}</span>
                  </div>
                  <p className="text-xs text-slate-300">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUITS TAB */}
        {activeTab === 'produits' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Catalogue & Produits ({products.length})</h3>
              <button
                onClick={() => setNewProductModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-[#0A192F] hover:bg-amber-400 flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un produit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={p.image} alt={p.title} className="w-full h-36 object-cover" referrerPolicy="no-referrer" />
                    <div className="p-4 space-y-2">
                      <div className="text-amber-400 font-bold text-sm">{p.price}</div>
                      <h4 className="font-bold text-white">{p.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Messages de Contact ({messages.length})</h3>
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white">{m.name} <span className="text-xs text-slate-400 font-normal">({m.email} / {m.phone})</span></h4>
                    <span className="text-xs text-slate-500">{m.createdAt}</span>
                  </div>
                  <div className="text-xs font-semibold text-amber-400">Sujet : {m.subject}</div>
                  <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl">{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STATISTIQUES TAB */}
        {activeTab === 'statistiques' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Statistiques Détaillées de l'Agence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Taux de conversion devis</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-2">85%</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Satisfaction client</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-2">4.9 / 5.0</div>
              </div>
              <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Projets livrés</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-2">48+</div>
              </div>
            </div>
          </div>
        )}

        {/* UTILISATEURS TAB */}
        {activeTab === 'utilisateurs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white">Gestion des Utilisateurs</h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">GM Tech Administrateur</div>
                  <div className="text-xs text-slate-400">admin@nehemiebusiness.com • Admin</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-[#0A192F]">Actif</span>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Jean Dupont</div>
                  <div className="text-xs text-slate-400">jean.dupont@example.com • Client</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">Actif</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white">Ajouter un nouveau produit</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">Titre du produit</label>
                <input
                  type="text"
                  required
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">Catégorie</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm mt-1"
                >
                  <option>Sites web</option>
                  <option>Applications</option>
                  <option>Design graphique</option>
                  <option>Marketing</option>
                  <option>Logiciel</option>
                  <option>Conseil</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">Prix</label>
                <input
                  type="text"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">Description</label>
                <textarea
                  required
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm mt-1"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-[#0A192F] hover:bg-amber-400 shadow-md"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
