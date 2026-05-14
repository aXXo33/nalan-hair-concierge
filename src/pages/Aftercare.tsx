import SectionTitle from '../components/SectionTitle';
import ExpandableCard from '../components/ExpandableCard';

const sections = [
  { title: 'After balayage care', items: [
    'Wait 48 hours before the first wash to allow the tone to settle.',
    'Use a sulphate-free shampoo and a weekly bond-building treatment.',
    'Rinse with cool water to preserve shine and tone.',
    'Apply a UV or heat protectant before styling or sun exposure.',
    'Book a toning glaze every 6 to 8 weeks for a refined finish.'
  ]},
  { title: 'Blonde maintenance', items: [
    'Use a violet shampoo once a week, no more, to soften warmth.',
    'Avoid hard-water build-up with a clarifying mask once a month.',
    'Limit hot styling and always use a thermal protectant.',
    'Plan a tone refresh every 4 to 6 weeks between lightening sessions.'
  ]},
  { title: 'Extensions care', items: [
    'Brush gently from the ends upwards with a soft-bristle brush.',
    'Wash with a hydrating, residue-free shampoo and lightweight conditioner.',
    'Sleep on a silk pillowcase and tie hair loosely in a low braid.',
    'Return for a maintenance appointment every 6 to 10 weeks.'
  ]},
  { title: 'Bridal hair preparation', items: [
    'Schedule a trial 4 to 8 weeks before the wedding.',
    'Avoid a fresh cut on the day. Have a refining trim two weeks prior.',
    'Hydrate hair weekly with a nourishing treatment in the lead-up.',
    'Arrive on the day with clean, fully dry hair unless agreed otherwise.'
  ]},
  { title: 'When to rebook', items: [
    'Balayage: every 8 to 12 weeks.',
    'Blonde refresh and toner: every 4 to 6 weeks.',
    'Extensions maintenance: every 6 to 10 weeks.',
    'Trim and refine: every 8 to 10 weeks.'
  ]}
];

export default function Aftercare() {
  return (
    <>
      <SectionTitle eyebrow="Aftercare" title="A quiet ritual" />
      <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Calm, considered advice to keep colour, shine and softness between visits.</p>
      {sections.map(s => <ExpandableCard key={s.title} title={s.title} items={s.items} />)}
    </>
  );
}
