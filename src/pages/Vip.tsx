import { Gift, Users, MessageCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const VIP_WHATSAPP_MESSAGE = 'Hi Nalan, I’d like to ask about the Nalan VIP Circle offers.';
const VIP_WHATSAPP_URL = `https://wa.me/447939535030?text=${encodeURIComponent(VIP_WHATSAPP_MESSAGE)}`;

const rewards = [
  {
    icon: Users,
    title: 'Refer a Friend',
    body: 'Recommend Hair by Nalan to a friend and you’ll both receive £25 credit when each of you books a qualifying colour service of £150 or more.',
    terms: 'Both clients must book separate colour services with a minimum value of £150 each. Valid for colour services only. Not valid with other offers.',
  },
  {
    icon: Gift,
    title: 'Birthday Treat',
    body: 'Celebrate your birthday month with a complimentary blow-dry when you book a full colour service.',
    terms: 'Valid during your birthday month. Full colour service required.',
  },
];

export default function Vip() {
  return (
    <>
      <SectionTitle eyebrow="VIP Circle" title="Nalan VIP Circle" />
      <p style={{ color: 'var(--muted)', marginBottom: 20, maxWidth: 560 }}>
        Nalan VIP Circle is our way of saying thank you to clients who trust us with their colour, bridal and transformation journey.
      </p>

      <div style={{ display: 'grid', gap: 14 }}>
        {rewards.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="card vip-card">
              <div className="vip-icon">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 style={{ marginBottom: 6 }}>{r.title}</h4>
                <p style={{ marginBottom: 10 }}>{r.body}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 0 }}>
                  {r.terms}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <a
          href={VIP_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary btn-block"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          <span style={{ marginLeft: 8 }}>Message us on WhatsApp</span>
        </a>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12, marginBottom: 0 }}>
          Ask Nalan’s team about current VIP Circle offers before booking.
        </p>
      </div>
    </>
  );
}
