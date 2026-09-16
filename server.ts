import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini API client if GEMINI_API_KEY exists
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.error("Failed to initialize Gemini AI", e);
}

// In-Memory Database Seed
let services = [
  { id: '1', title: 'Création de sites web', description: 'Sites vitrines, e-commerce, applications web modernes et ultra-rapides.', icon: 'Globe', category: 'Web', popular: true },
  { id: '2', title: 'Création d’applications Android', description: 'Applications mobiles natives et performantes publiées sur Google Play Store.', icon: 'Smartphone', category: 'Mobile', popular: true },
  { id: '3', title: 'Développement de logiciels', description: 'Logiciels sur mesure pour ordinateurs (Windows/Mac/Linux) adaptés à vos processus.', icon: 'Code', category: 'Logiciel', popular: false },
  { id: '4', title: 'Design graphique', description: 'Logos professionnels, chartes graphiques, affiches, flyers et visuels publicitaires.', icon: 'Palette', category: 'Design', popular: true },
  { id: '5', title: 'Gestion des réseaux sociaux', description: 'Community management, création de contenu, stratégies de visibilité et publicité digitale.', icon: 'Share2', category: 'Marketing', popular: false },
  { id: '6', title: 'Solutions pour entreprises', description: 'Transformation numérique, outils de productivité, ERP et automatisation.', icon: 'Briefcase', category: 'Entreprise', popular: true },
  { id: '7', title: 'Systèmes de gestion', description: 'Logiciels de facturation, stock, comptabilité, paie et gestion de la relation client (CRM).', icon: 'Database', category: 'Logiciel', popular: false },
  { id: '8', title: 'Maintenance informatique', description: 'Dépannage matériel/logiciel, sécurisation de réseaux et support technique 24/7.', icon: 'Wrench', category: 'Support', popular: false },
  { id: '9', title: 'Conseil numérique', description: 'Audit digital, stratégie technologique et accompagnement à la digitalisation.', icon: 'Cpu', category: 'Conseil', popular: false },
  { id: '10', title: 'Autres services personnalisés', description: 'Solutions sur mesure selon vos exigences techniques et professionnelles spécifiques.', icon: 'Sparkles', category: 'Sur mesure', popular: false },
];

let products = [
  {
    id: 'p1',
    title: 'Site Vitrine Professionnel',
    category: 'Sites web',
    description: 'Un site web moderne, rapide et responsive pour présenter votre entreprise, vos produits ou vos services.',
    price: '150 $',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: ['Design moderne', 'Responsive (mobile + desktop)', 'Formulaire de contact', 'Optimisation SEO de base'],
    popular: true
  },
  {
    id: 'p2',
    title: 'Application Android Professionnelle',
    category: 'Applications',
    description: 'Application mobile sur mesure connectée avec API pour votre business ou startup.',
    price: '300 $',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    features: ['Interface intuitive (UI/UX)', 'Publication Google Play Store', 'Notifications Push', 'Panneau d’administration'],
    popular: true
  },
  {
    id: 'p3',
    title: 'Pack Logo & Identité Visuelle',
    category: 'Design graphique',
    description: 'Créez une image de marque unique et mémorable qui inspire confiance à vos clients.',
    price: '50 $',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    features: ['3 propositions de logos', 'Fichiers sources HD (AI, PNG, JPG)', 'Charte graphique simplifiée', 'Carte de visite offerte'],
    popular: false
  },
  {
    id: 'p4',
    title: 'Gestion des Réseaux Sociaux (1 Mois)',
    category: 'Marketing',
    description: 'Boostez votre présence en ligne avec 15 visuels créatifs, publications régulières et modération.',
    price: '100 $',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    features: ['15 visuels professionnels', 'Planning de publication', 'Rédaction accrocheuse', 'Rapport de performance'],
    popular: true
  },
  {
    id: 'p5',
    title: 'Logiciel de Gestion de Stock & Facturation',
    category: 'Logiciel',
    description: 'Solution complète pour automatiser la comptabilité, le stock et la vente de votre commerce.',
    price: 'Sur devis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: ['Gestion des stocks en temps réel', 'Impression factures & reçus', 'Statistiques des ventes', 'Multi-utilisateurs'],
    popular: false
  },
  {
    id: 'p6',
    title: 'Audit & Conseil Numérique Entreprise',
    category: 'Conseil',
    description: 'Analyse approfondie de votre infrastructure et recommandation de solutions digitales.',
    price: '80 $',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    features: ['Diagnostic complet', 'Rapport stratégique', 'Plan d’action chiffré', '2h de consultation directes'],
    popular: false
  }
];

let requests = [
  {
    id: 'req-1',
    trackingNumber: '#NB-2025-001',
    name: 'Jean Dupont',
    phone: '+243 998 123 456',
    email: 'jean.dupont@example.com',
    service: 'Création de sites web',
    item: 'Site Vitrine Professionnel',
    description: 'Besoin d’un site web vitrine pour notre agence immobilière à Kinshasa.',
    budget: '200$ - 500$',
    status: 'En cours',
    createdAt: '2025-09-12'
  },
  {
    id: 'req-2',
    trackingNumber: '#NB-2025-002',
    name: 'Marie Lema',
    phone: '+243 897 654 321',
    email: 'marie.lema@example.com',
    service: 'Création d’applications Android',
    item: 'Application Android Professionnelle',
    description: 'Application de livraison de repas à domicile.',
    budget: '500$ - 1000$',
    status: 'En cours',
    createdAt: '2025-09-10'
  },
  {
    id: 'req-3',
    trackingNumber: '#NB-2025-003',
    name: 'Patrick Mukendi',
    phone: '+243 990 111 222',
    email: 'patrick.m@example.com',
    service: 'Design graphique',
    item: 'Pack Logo & Identité Visuelle',
    description: 'Refonte complète du logo de notre marque agroalimentaire.',
    budget: 'Moins de 100$',
    status: 'Terminée',
    createdAt: '2025-09-05'
  },
  {
    id: 'req-4',
    trackingNumber: '#NB-2025-004',
    name: 'Sandra K.',
    phone: '+243 815 777 888',
    email: 'sandra.k@example.com',
    service: 'Gestion des réseaux sociaux',
    item: 'Gestion des Réseaux Sociaux (1 Mois)',
    description: 'Campagne publicitaire Facebook et Instagram pour notre boutique de mode.',
    budget: '100$ - 200$',
    status: 'En attente',
    createdAt: '2025-09-01'
  }
];

let projects = [
  {
    id: 'proj-1',
    title: 'Refonte Site Web Immobilier',
    clientName: 'Jean Dupont',
    service: 'Création de sites web',
    progress: 75,
    status: 'En cours',
    deadline: '2025-09-30',
    notes: 'Intégration du catalogue de biens et formulaire de visite.'
  },
  {
    id: 'proj-2',
    title: 'Application Mobile Livraisons',
    clientName: 'Marie Lema',
    service: 'Création d’applications Android',
    progress: 40,
    status: 'En cours',
    deadline: '2025-10-15',
    notes: 'Développement des interfaces utilisateur et connexion API.'
  },
  {
    id: 'proj-3',
    title: 'Identité Visuelle Agro',
    clientName: 'Patrick Mukendi',
    service: 'Design graphique',
    progress: 100,
    status: 'Terminé',
    deadline: '2025-09-10',
    notes: 'Livraison des fichiers sources et charte graphique validée.'
  }
];

let clients: Array<{ id: string; name: string; phone: string; email: string; status: string; createdAt: string; company?: string }> = [
  { id: 'c1', name: 'Jean Dupont', phone: '+243 998 123 456', email: 'jean.dupont@example.com', status: 'Actif', createdAt: '2025-09-12', company: 'ImmoKin' },
  { id: 'c2', name: 'Marie Lema', phone: '+243 897 654 321', email: 'marie.lema@example.com', status: 'Actif', createdAt: '2025-09-10', company: 'KinFood' },
  { id: 'c3', name: 'Patrick Mukendi', phone: '+243 990 111 222', email: 'patrick.m@example.com', status: 'VIP', createdAt: '2025-09-05', company: 'AgroCongo' },
  { id: 'c4', name: 'Sandra K.', phone: '+243 815 777 888', email: 'sandra.k@example.com', status: 'Actif', createdAt: '2025-09-01', company: 'Mode RDC' },
  { id: 'c5', name: 'David Tshibola', phone: '+243 812 303 444', email: 'david.tshibola@example.com', status: 'Actif', createdAt: '2025-08-25', company: 'TechSolutions' }
];

let messages = [
  { id: 'm1', name: 'Alain Kabeya', email: 'alain@example.com', phone: '+243 990 000 111', subject: 'Partenariat commercial', message: 'Bonjour, j’aimerais discuter d’un partenariat sur Kinshasa.', createdAt: '2025-09-14', read: false },
  { id: 'm2', name: 'Chantal Mbuyi', email: 'chantal@example.com', phone: '+243 820 555 666', subject: 'Formation équipe', message: 'Proposez-vous des formations en développement web pour notre personnel ?', createdAt: '2025-09-13', read: true }
];

let notifications = [
  { id: 'n1', userId: 'c1', title: 'Mise à jour projet', message: 'Votre projet de site web progresse bien (75%).', date: '2025-09-14', read: false },
  { id: 'n2', userId: 'c2', title: 'Demande validée', message: 'Votre demande #NB-2025-002 a été acceptée.', date: '2025-09-11', read: true }
];

let users = [
  { id: 'u1', name: 'Néhémie Administrateur', email: 'admin@nehemiebusiness.com', phone: '+243 97 888 5682', role: 'admin', token: 'admin-token-xyz' },
  { id: 'u2', name: 'Jean Dupont', email: 'jean.dupont@example.com', phone: '+243 998 123 456', role: 'client', token: 'client-token-123' }
];

let mediaItems: Array<{ id: string; title: string; type: 'photo' | 'video'; url: string; category: string; description: string; date: string }> = [
  { id: 'med-1', title: 'Équipe Néhémie Business en intervention', type: 'photo', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', category: 'Équipe', description: 'Séance de travail et développement web.', date: '2025-09-12' },
  { id: 'med-2', title: 'Présentation Application Mobile Android', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-in-an-office-41825-large.mp4', category: 'Mobile', description: 'Démonstration vidéo de notre application de livraison.', date: '2025-09-10' },
  { id: 'med-3', title: 'Atelier Design Graphique & Branding', type: 'photo', url: 'https://images.unsplash.com/photo-1542744094-3a31243364d0?auto=format&fit=crop&w=800&q=80', category: 'Design', description: 'Création d’identités visuelles professionnelles.', date: '2025-09-08' }
];

// API Routes
app.get("/api/services", (req, res) => {
  res.json(services);
});

app.post("/api/services", (req, res) => {
  const newService = { id: Date.now().toString(), ...req.body };
  services.push(newService);
  res.status(201).json(newService);
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = { id: 'p' + Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/api/requests", (req, res) => {
  res.json(requests);
});

app.post("/api/requests", (req, res) => {
  const count = requests.length + 1;
  const trackingNumber = `#NB-2025-${String(count).padStart(3, '0')}`;
  const newReq = {
    id: 'req-' + Date.now(),
    trackingNumber,
    status: 'En attente',
    createdAt: new Date().toISOString().split('T')[0],
    ...req.body
  };
  requests.unshift(newReq);

  const existingClient = clients.find(c => c.phone === newReq.phone || c.email === newReq.email);
  if (!existingClient) {
    clients.unshift({
      id: 'c' + Date.now(),
      name: newReq.name,
      phone: newReq.phone,
      email: newReq.email,
      status: 'Actif',
      createdAt: new Date().toISOString().split('T')[0],
      company: ''
    });
  }

  notifications.unshift({
    id: 'n' + Date.now(),
    userId: existingClient ? existingClient.id : 'c' + Date.now(),
    title: 'Demande enregistrée',
    message: `Votre demande ${trackingNumber} a été bien reçue.`,
    date: new Date().toISOString().split('T')[0],
    read: false
  });

  res.status(201).json(newReq);
});

app.put("/api/requests/:id", (req, res) => {
  const { id } = req.params;
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...req.body };
    res.json(requests[index]);
  } else {
    res.status(404).json({ error: "Demande non trouvée" });
  }
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const newProj = { id: 'proj-' + Date.now(), ...req.body };
  projects.unshift(newProj);
  res.status(201).json(newProj);
});

app.get("/api/clients", (req, res) => {
  res.json(clients);
});

app.post("/api/clients", (req, res) => {
  const newClient = { id: 'c' + Date.now(), createdAt: new Date().toISOString().split('T')[0], company: '', ...req.body };
  clients.unshift(newClient);
  res.status(201).json(newClient);
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const newMsg = { id: 'm' + Date.now(), createdAt: new Date().toISOString().split('T')[0], read: false, ...req.body };
  messages.unshift(newMsg);
  res.status(201).json(newMsg);
});

app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

app.put("/api/notifications/:id/read", (req, res) => {
  const n = notifications.find(item => item.id === req.params.id);
  if (n) {
    n.read = true;
    res.json(n);
  } else {
    res.status(404).json({ error: "Notification non trouvée" });
  }
});

app.get("/api/media", (req, res) => {
  res.json(mediaItems);
});

app.post("/api/media", (req, res) => {
  const newMedia = { id: 'med-' + Date.now(), date: new Date().toISOString().split('T')[0], ...req.body };
  mediaItems.unshift(newMedia);
  res.status(201).json(newMedia);
});

app.delete("/api/media/:id", (req, res) => {
  const { id } = req.params;
  mediaItems = mediaItems.filter(m => m.id !== id);
  res.json({ success: true });
});

app.get("/api/stats", (req, res) => {
  res.json({
    clientsCount: clients.length,
    demandsCount: requests.length,
    projectsCount: projects.length,
    revenue: "14 250 $",
    pendingDemands: requests.filter(r => r.status === 'En attente').length,
    activeProjects: projects.filter(p => p.status === 'En cours').length
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    res.json({ success: true, user });
  } else if (email === 'admin@nehemie.com' || email.includes('admin')) {
    res.json({ success: true, user: users[0] });
  } else {
    const newClientUser = {
      id: 'u' + Date.now(),
      name: email.split('@')[0],
      email,
      phone: '+243 800 000 000',
      role: 'client' as const,
      token: 'token-' + Date.now()
    };
    users.push(newClientUser);
    res.json({ success: true, user: newClientUser });
  }
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, phone } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "Cet email est déjà utilisé." });
  }
  const newUser = {
    id: 'u' + Date.now(),
    name,
    email,
    phone,
    role: 'client' as const,
    token: 'token-' + Date.now()
  };
  users.push(newUser);
  clients.unshift({
    id: 'c' + Date.now(),
    name,
    phone,
    email,
    status: 'Actif',
    createdAt: new Date().toISOString().split('T')[0],
    company: ''
  });
  res.status(201).json({ success: true, user: newUser });
});

// Gemini AI Chat Assistant
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!ai) {
      return res.json({ reply: "Bonjour ! Je suis l'assistant virtuel de Néhémie Business. Comment pouvons-nous vous aider dans vos projets digitaux à Kinshasa ?" });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tu es l'assistant virtuel intelligent, professionnel et chaleureux de l'agence "Néhémie Business" (Groupe Marcus Technologie), basée à Kinshasa, RDC.
      Voici les informations clés sur l'entreprise à utiliser pour répondre précisément à toutes les questions des clients :
      - Domaines et services : Création de sites web (vitrines, e-commerce), Création d'applications Android, Développement de logiciels sur mesure, Design graphique (logos, chartes), Gestion des réseaux sociaux (community management), Solutions d'entreprise et ERP, Systèmes de gestion (stock, facturation), Maintenance informatique, Conseil numérique.
      - Produits & Tarifs du catalogue :
        * Site Vitrine Professionnel (150 $)
        * Application Android Professionnelle (300 $)
        * Pack Logo & Identité Visuelle (50 $)
        * Gestion des Réseaux Sociaux - 1 Mois (100 $)
        * Logiciel de Gestion de Stock & Facturation (Sur devis)
        * Audit & Conseil Numérique Entreprise (80 $)
      - Coordonnées officielles :
        * WhatsApp : +243 97 888 5682
        * Appel normal : +243 841 069 748
        * Gmail : nehemiekitambala087@gmail.com
        * Localisation : Kinshasa, République Démocratique du Congo
      - Fonctionnalités de l'application : Devis en ligne, Espace client, Tableau de bord administrateur, Album photos & vidéos des réalisations, Catalogue produits, et Assistant IA.

      Réponds toujours de manière polie, précise, structurée et accueillante en français aux questions du client concernant l'application, les services, les prix ou les contacts.

      Question du client : ${message}`
    });
    
    res.json({ reply: response.text || "Je suis à votre entière disposition pour vous accompagner dans votre projet avec Néhémie Business !" });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.json({ reply: "Bonjour ! Néhémie Business est à votre service à Kinshasa. Contactez-nous sur WhatsApp au +243 97 888 5682 ou par email à nehemiekitambala087@gmail.com pour toute question ou devis." });
  }
});

// AI News with Google Search Grounding
app.get("/api/news", async (req, res) => {
  try {
    if (!ai) {
      return res.json({
        articles: [
          {
            title: "L'essor de la transformation numérique à Kinshasa et en RDC",
            summary: "Les entreprises technologiques et startups congolaises accélèrent l'adoption des solutions cloud, mobiles et de l'intelligence artificielle pour stimuler l'économie locale.",
            date: "Septembre 2026",
            source: "Néhémie Business Tech",
            url: "#"
          },
          {
            title: "Nouvelles tendances 2026 en développement d'applications mobiles",
            summary: "L'intégration de l'IA générative et des architectures cloud optimisées révolutionnent l'expérience utilisateur sur Android et iOS en Afrique.",
            date: "Septembre 2026",
            source: "Tech Africa",
            url: "#"
          }
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Génère 4 actualités récentes et pertinentes sur les technologies, le développement web/mobile, l'intelligence artificielle et la transformation numérique en République Démocratique du Congo (Kinshasa) et en Afrique.
      Retourne UNIQUEMENT un objet JSON valide au format strict suivant:
      {
        "articles": [
          {
            "title": "Titre de l'actualité",
            "summary": "Résumé détaillé de 2-3 phrases sur la tendance technologique.",
            "date": "Date récente",
            "source": "Nom de la source",
            "url": "https://..."
          }
        ]
      }`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || '';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    // Extract JSON part if extra text
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonStr = cleaned.substring(jsonStart, jsonEnd + 1);
      const data = JSON.parse(jsonStr);
      return res.json(data);
    }
    const data = JSON.parse(cleaned);
    res.json(data);
  } catch (error) {
    console.error("AI News Error:", error);
    res.json({
      articles: [
        {
          title: "L'essor du numérique à Kinshasa : Néhémie Business en première ligne",
          summary: "Découvrez comment les entreprises congolaises adoptent les applications mobiles et les sites web professionnels pour booster leur visibilité.",
          date: "Septembre 2026",
          source: "Néhémie Business",
          url: "#"
        },
        {
          title: "Intelligence Artificielle et Innovation en Afrique",
          summary: "Les outils d'IA transforment le paysage des affaires et du développement logiciel à travers le continent.",
          date: "Septembre 2026",
          source: "Tech Review",
          url: "#"
        }
      ]
    });
  }
});

// Start server without top-level await
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then(vite => {
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error("Error starting vite server", err);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT} (without vite middleware)`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
