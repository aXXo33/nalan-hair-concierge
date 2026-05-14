import { Link } from 'react-router-dom';
import {
  Sparkles,
  Crown,
  ShieldCheck,
  MessageCircle,
  Instagram,
  ArrowRight,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Heart,
  Users,
  Sparkle,
} from 'lucide-react';
import { WHATSAPP, INSTAGRAM } from '../lib/links';

const ctas = [
  { to: '/bridal', label: 'Book Bridal Consultation', primary: true },
  { to: '/quote', label: 'Get a Hair Quote' },
  { to: '/gallery', label: 'View Transformations' },
  { to: '/aftercare', label: 'Aftercare Guide' },
  { to: '/vip', label: 'VIP Rewards' },
];

const steps = [
  {
    n: '01',
    icon: MessageSquare,
    title: 'Share your hair goal',
    body: 'Tell us about the look you want and the occasion.',
  },
  {
    n: '02',
    icon: ImageIcon,
    title: 'Upload your current hair photos',
    body: 'Natural daylight images help us understand your starting point.',
  },
  {
    n: '03',
    icon: FileText,
    title: 'Receive your personalised hair plan',
    body: 'A considered recommendation tailored to your hair and goal.',
  },
  {
    n: '04',
    icon: MessageCircle,
    title: 'Continue the consultation via WhatsApp',
    body: 'Final details, timing and your appointment are confirmed personally.',
  },
];

const trust = [
  {
    icon: Heart,
    title: '1000+ happy clients',
    body: 'Trusted by London brides and colour clients.',
  },
  {
    icon: Crown,
    title: 'Bridal & event specialist',
    body: 'Wedding day hair planned with calm and care.',
  },
  {
    icon: Users,
    title: 'Women-only appointment experience',
    body: 'A private, considered space. Hair only. By appointment.',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="hero-pill">London · By appointment only</span>
        <h1>
          Your hair journey begins <em>before</em> the appointment.
        </h1>
        <p className="hero-sub">
          Bridal, balayage and colour transformation consultations for women in
          London.
        </p>
        <div className="hero-cta">
          {ctas.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className={
                'btn btn-block ' + (c.primary ? 'btn-primary' : 'btn-secondary')
              }
            >
              {c.label} <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="eyebrow">The journey</div>
        <h2 className="section-title">How your consultation works</h2>
        <div className="steps-grid">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="step-card">
                <div className="step-top">
                  <span className="step-num">{s.n}</span>
                  <span className="step-icon">
                    <Icon size={16} />
                  </span>
                </div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home-section">
        <div className="eyebrow">Why Nalan</div>
        <h2 className="section-title">A quietly considered hair studio</h2>
        <div className="trust-grid">
          {trust.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="trust-card">
                <div className="trust-icon">
                  <Icon size={18} />
                </div>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="hairline" />

      <div className="eyebrow">Connect</div>
      <div className="contact-row">
        <a
          className="btn btn-secondary"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a
          className="btn btn-secondary"
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={16} /> Instagram
        </a>
      </div>
    </>
  );
}
