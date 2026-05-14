import { Gift, Sparkles, Crown, Users, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { WHATSAPP } from '../lib/links';

const rewards = [
  { icon: Users, title: 'Refer a friend', body: '£25 credit for you and £25 for them on their first colour service.' },
  { icon: Gift, title: 'Birthday treat', body: 'A complimentary blow-dry in your birthday month.' },
  { icon: Sparkles, title: 'Returning client reward', body: 'A small gift on your fifth visit, our way of saying thank you.' },
  { icon: Crown, title: 'Bridal party reward', body: '10% off when four or more from the same party book together.' }
];

export default function Vip() {
  return (
    <>
      <SectionTitle eyebrow="VIP Rewards" title="A quiet thank you" />
      <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Small, considered rewards for the clients who return, refer and celebrate with us.</p>
      <div style={{ display: 'grid', gap: 10 }}>
        {rewards.map(r => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="card vip-card">
              <div className="vip-icon"><Icon size={20} strokeWidth={1.5} /></div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-primary btn-block" style={{ marginTop: 18 }}>
        <MessageCircle size={16} /> Join VIP via WhatsApp
      </a>
    </>
  );
}
