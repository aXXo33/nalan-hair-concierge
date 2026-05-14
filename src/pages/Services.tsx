import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

type Service = {
  title: string;
  description: string;
  consultation: boolean;
  to: string;
  cta: string;
};

const services: Service[] = [
  { title: 'Bridal Hair', description: 'Trial, day-of styling and a bespoke plan for the bride and her party.', consultation: true, to: '/bridal', cta: 'Bridal Consultation' },
  { title: 'Balayage & Blonde', description: 'Hand-painted lightening, soft dimension and tonal refinement.', consultation: true, to: '/quote', cta: 'Request Quote' },
  { title: 'Colour Transformation', description: 'From dark to light, or a complete tonal reset across multiple sessions.', consultation: true, to: '/quote', cta: 'Request Quote' },
  { title: 'Hair Extensions', description: 'Tape, weft and bespoke methods, carefully matched to your hair.', consultation: true, to: '/quote', cta: 'Request Quote' },
  { title: 'Hollywood Waves', description: 'Glamorous, polished waves for events and occasions.', consultation: false, to: '/quote', cta: 'Request Quote' },
  { title: 'Event Hair', description: 'Elegant updos and styling for premieres, parties and private events.', consultation: false, to: '/quote', cta: 'Request Quote' }
];

export default function Services() {
  return (
    <>
      <SectionTitle eyebrow="Services" title="A considered menu" />
      <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Every service begins with a quiet conversation about your hair history, lifestyle and desired finish.</p>
      <div className="service-grid">
        {services.map(s => (
          <div key={s.title} className="service-card">
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <span className={'badge ' + (s.consultation ? 'badge-soft' : 'badge-line')}>
              {s.consultation ? 'Consultation required' : 'No consultation required'}
            </span>
            <Link to={s.to} className="btn btn-secondary" style={{ marginTop: 4 }}>{s.cta}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
