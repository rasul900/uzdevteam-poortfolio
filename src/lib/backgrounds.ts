export const SECTION_BACKGROUNDS = {
  hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85",
  services: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=80",
  whyUs: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80",
  portfolio: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
  process: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
  team: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80",
  testimonials: "https://images.unsplash.com/photo-1531482615710-8afdab791c7f?auto=format&fit=crop&w=1920&q=80",
  pricing: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80",
  faq: "https://images.unsplash.com/photo-1517694712202-14dd9538a880?auto=format&fit=crop&w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
} as const;

export type SectionBackgroundKey = keyof typeof SECTION_BACKGROUNDS;
