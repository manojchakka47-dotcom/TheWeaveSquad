import { StudentBuilder, HackathonEvent, AppStats } from '../types';

export const INITIAL_HACKATHONS: HackathonEvent[] = [
  {
    id: 'hack-vizag-4',
    name: 'Hack With Vizag 4.0',
    tagline: 'Annual Flagship Coastal Andhra 36-Hour Hackathon',
    date: 'Nov 14-16, 2026',
    venue: 'VIIT Campus & Tech Hub, Duvvada, Visakhapatnam',
    hub: 'Visakhapatnam, Andhra Pradesh',
    maxTeamSize: 3,
    minCommitScore: 65,
    registeredBuildersCount: 312,
    badges: ['High Priority', 'Hardware & Software', 'Cash Pool: ₹1,50,000']
  },
  {
    id: 'sih-2026',
    name: 'Smart India Hackathon',
    tagline: 'National Level College Problem-Solving Initiative',
    date: 'Dec 02-04, 2026',
    venue: 'Visakhapatnam Regional Nodal Centre (GITAM/AU)',
    hub: 'All Vizag Engineering Campuses',
    maxTeamSize: 3,
    minCommitScore: 70,
    registeredBuildersCount: 684,
    badges: ['Strict Composition Rules', 'Ministry Themes', 'Hardware/Software']
  },
  {
    id: 'vizag-fintech-sprint',
    name: 'Vizag AI & FinTech Sprint',
    tagline: 'FinTech Valley Vizag 24-Hour Rapid Prototyping',
    date: 'Dec 18-19, 2026',
    venue: 'Rushikonda IT Park / Innovation Valley',
    hub: 'Rushikonda Tech Zone',
    maxTeamSize: 3,
    minCommitScore: 75,
    registeredBuildersCount: 198,
    badges: ['Angel Backing', 'FinTech APIs']
  }
];

export const INITIAL_SAMPLE_BUILDERS: StudentBuilder[] = [
  {
    id: 'builder-1',
    name: 'Rahul Verma',
    college: 'VIIT Vizag',
    year: '3rd Year',
    branch: 'Computer Science',
    primarySkills: ['Python', 'Flask'],
    verifiedScore: 88,
    verifiedCommits: 142,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 1.8,
    matchReason: 'Advanced Python logic engine, verified REST endpoints, instant local team compatibility',
    githubHandle: 'rahul-vizag-dev',
    phoneWhatsapp: '+91 98480 32145',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Lead Backend & API Architect',
    verifiedBreakdown: [
      { skill: 'Python / Flask', score: 88, level: 'Advanced Logic', detail: '142 verified original commits in modular backend microservices' },
      { skill: 'Postgres & Redis', score: 82, level: 'Intermediate Database', detail: 'Indexed query patterns and session caching' },
      { skill: 'REST API Design', score: 89, level: 'Proficient', detail: 'Swagger/OpenAPI compliant endpoint architectures' }
    ]
  },
  {
    id: 'builder-2',
    name: 'Ananya Sri',
    college: 'GVP Gajuwaka',
    year: '2nd Year',
    branch: 'Information Technology',
    primarySkills: ['React', 'Tailwind'],
    verifiedScore: 85,
    verifiedCommits: 119,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 4.5,
    matchReason: 'Pixel-perfect mobile responsiveness, high Figma-to-code velocity, zero UI latency',
    githubHandle: 'ananya-ui-builder',
    phoneWhatsapp: '+91 98480 65432',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Frontend & UI System Lead',
    verifiedBreakdown: [
      { skill: 'React / Next.js', score: 85, level: 'Advanced Component Builder', detail: 'Modular component architecture with custom state hooks' },
      { skill: 'Tailwind CSS', score: 91, level: 'Design System Master', detail: 'Fluid responsive layouts and dark mode theming' },
      { skill: 'Figma to Code', score: 84, level: 'Rapid Prototyping', detail: 'Rapid turnaround for hackathon pitch decks' }
    ]
  },
  {
    id: 'builder-3',
    name: 'Kiran Kumar',
    college: 'ANITS Sangivalasa',
    year: '4th Year',
    branch: 'CSE (AI & DS)',
    primarySkills: ['Figma', 'UI'],
    verifiedScore: 92,
    verifiedCommits: 98,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 12.2,
    matchReason: 'Top-tier interaction design, hackathon pitch deck specialist, comprehensive design tokens',
    githubHandle: 'kiran-design-works',
    phoneWhatsapp: '+91 98480 98765',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Head of Product & UX Design',
    verifiedBreakdown: [
      { skill: 'Figma & Design Systems', score: 92, level: 'Advanced Design', detail: 'Complete interactive prototypes and micro-animations' },
      { skill: 'Pitch Deck & Wireframing', score: 94, level: 'Hackathon Winning', detail: 'Designed 3 prize-winning national hackathon interfaces' },
      { skill: 'HTML / CSS Assets', score: 88, level: 'Asset Export', detail: 'Production-ready SVG icons and responsive tokens' }
    ]
  },
  {
    id: 'builder-4',
    name: 'Suresh Raja',
    college: 'GITAM Vizag',
    year: '3rd Year',
    branch: 'Computer Science',
    primarySkills: ['Node.js', 'Mongo'],
    verifiedScore: 79,
    verifiedCommits: 84,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 8.7,
    matchReason: 'Solid real-time socket connections, fast API scaffolding, express middleware expertise',
    githubHandle: 'suresh-gitam-code',
    phoneWhatsapp: '+91 98480 11223',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Backend & Database Engineer',
    verifiedBreakdown: [
      { skill: 'Node.js & Express', score: 79, level: 'Intermediate API', detail: 'Real-time WebSocket event pipelines and CRUD logic' },
      { skill: 'MongoDB & Mongoose', score: 81, level: 'NoSQL Schema', detail: 'Aggregation pipelines and indexing for fast lookups' }
    ]
  },
  {
    id: 'builder-5',
    name: 'Pooja M',
    college: 'VIIT Vizag',
    year: '3rd Year',
    branch: 'Information Technology',
    primarySkills: ['Flutter', 'Mobile'],
    verifiedScore: 81,
    verifiedCommits: 104,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 1.5,
    matchReason: 'Cross-platform mobile apps built in under 24 hours with native device feature integration',
    githubHandle: 'pooja-flutter-vizag',
    phoneWhatsapp: '+91 98480 44556',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Mobile App Developer (Flutter/Dart)',
    verifiedBreakdown: [
      { skill: 'Flutter & Dart', score: 81, level: 'Proficient Mobile', detail: 'BLoC pattern, offline persistence, and seamless native bindings' },
      { skill: 'Firebase Integration', score: 86, level: 'Cloud Services', detail: 'Instant auth, push notifications, and real-time Firestore sync' }
    ]
  },
  {
    id: 'builder-6',
    name: 'Likith K',
    college: 'Vignan Institute',
    year: '4th Year',
    branch: 'AI & Machine Learning',
    primarySkills: ['AI', 'PyTorch'],
    verifiedScore: 74,
    verifiedCommits: 92,
    isSample: true,
    status: 'Available',
    activeEvent: 'Smart India Hackathon',
    distanceKm: 7.1,
    matchReason: 'Model fine-tuning, HuggingFace transformers, lightweight ONNX deployment for edge inference',
    githubHandle: 'likith-ai-vignan',
    phoneWhatsapp: '+91 98480 77889',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Machine Learning & AI Specialist',
    verifiedBreakdown: [
      { skill: 'PyTorch / HuggingFace', score: 74, level: 'Applied ML', detail: 'Fine-tuned LLM embeddings and vision classifiers' },
      { skill: 'FastAPI Serving', score: 78, level: 'Inference Backend', detail: 'Containerized endpoints with low latency predictions' }
    ]
  },
  {
    id: 'builder-7',
    name: 'Divya S',
    college: 'GVP Gajuwaka',
    year: '3rd Year',
    branch: 'Computer Science',
    primarySkills: ['React', 'Next.js'],
    verifiedScore: 90,
    verifiedCommits: 168,
    isSample: true,
    status: 'Available',
    activeEvent: 'Smart India Hackathon',
    distanceKm: 4.8,
    matchReason: 'Full stack Next.js velocity, pristine TypeScript types, won SIH internal college round',
    githubHandle: 'divya-next-dev',
    phoneWhatsapp: '+91 98480 99001',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Full Stack Web Lead',
    verifiedBreakdown: [
      { skill: 'Next.js & TypeScript', score: 90, level: 'Advanced Web Logic', detail: 'Server actions, optimistic updates, and SSR optimizations' },
      { skill: 'UI Component Architecture', score: 89, level: 'Modular Design', detail: 'Shadcn/Tailwind custom libraries with accessible keyboard controls' }
    ]
  },
  {
    id: 'builder-8',
    name: 'Venkatesh B',
    college: 'ANITS',
    year: '2nd Year',
    branch: 'Information Technology',
    primarySkills: ['Go', 'Backend'],
    verifiedScore: 68,
    verifiedCommits: 76,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 12.5,
    matchReason: 'High concurrency backend in Go, gRPC interfaces, microsecond latency benchmark tests',
    githubHandle: 'venkat-golang-dev',
    phoneWhatsapp: '+91 98480 33445',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Systems & High-Performance Backend',
    verifiedBreakdown: [
      { skill: 'Go / Golang', score: 68, level: 'Intermediate Systems', detail: 'Goroutines, channels, and low-memory microservices' },
      { skill: 'Docker & Microservices', score: 72, level: 'DevOps / Containers', detail: 'Multi-stage builds and automated deployment workflows' }
    ]
  },
  {
    id: 'builder-9',
    name: 'Tarun C',
    college: 'AU College of Eng',
    year: '4th Year',
    branch: 'CSE',
    primarySkills: ['UI/UX Design'],
    verifiedScore: 86,
    verifiedCommits: 88,
    isSample: true,
    status: 'Available',
    activeEvent: 'Hack With Vizag 4.0',
    distanceKm: 9.3,
    matchReason: 'Andhra University design veteran, rapid user flow mapping, pitch narrative design',
    githubHandle: 'tarun-au-design',
    phoneWhatsapp: '+91 98480 55667',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Product Designer & Storyteller',
    verifiedBreakdown: [
      { skill: 'UI/UX Prototyping', score: 86, level: 'Advanced Design', detail: 'High fidelity mobile & web flows tested across student users' },
      { skill: 'Design Strategy', score: 90, level: 'Problem Framer', detail: 'Synthesizing problem statements into clear pitch propositions' }
    ]
  },
  {
    id: 'builder-10',
    name: 'Sneha P',
    college: 'VIIT Vizag',
    year: '3rd Year',
    branch: 'Computer Science',
    primarySkills: ['Fast API', 'Python'],
    verifiedScore: 83,
    verifiedCommits: 124,
    isSample: true,
    status: 'Available',
    activeEvent: 'Smart India Hackathon',
    distanceKm: 2.1,
    matchReason: 'FastAPI microservices, clean Pydantic validations, async worker pipelines for hackathons',
    githubHandle: 'sneha-fastapi-py',
    phoneWhatsapp: '+91 98480 88990',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    roleTitle: 'Backend Microservices Engineer',
    verifiedBreakdown: [
      { skill: 'FastAPI & Pydantic', score: 83, level: 'Advanced REST', detail: 'Asynchronous route handlers and automated docs' },
      { skill: 'Python Data Pipeline', score: 85, level: 'Data Processing', detail: 'Pandas, NumPy, and clean dataset ingestion scripts' }
    ]
  }
];

export const INITIAL_APP_STATS: AppStats = {
  matchRequestVolume: 348,
  teamCompletionRate: 94.2,
  ghostingDropoutRate: 2.1
};

export const AVAILABLE_ROLES = [
  'React Dev',
  'UI/UX Design',
  'Python / Backend',
  'AI / PyTorch',
  'Flutter / Mobile',
  'Node.js / Database',
  'Go / Concurrency'
];

export const LOCAL_COLLEGES = [
  'VIIT Vizag',
  'GVP Gajuwaka',
  'ANITS Sangivalasa',
  'GITAM Vizag',
  'AU College of Eng',
  'Vignan Institute'
];
