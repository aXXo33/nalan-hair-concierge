import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FilterChips from '../components/FilterChips';
import Lightbox from '../components/Lightbox';

type Item = { src: string; category: string; label: string };

// Unsplash hair-styling placeholders (royalty-free)
const items: Item[] = [
  { src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80', category: 'Bridal', label: 'Soft updo' },
  { src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80', category: 'Balayage', label: 'Sun-kissed balayage' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', category: 'Blonde', label: 'Champagne blonde' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', category: 'Bridal', label: 'Hollywood waves' },
  { src: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80', category: 'Extensions', label: 'Length & volume' },
  { src: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=800&q=80', category: 'Event Hair', label: 'Polished waves' },
  { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80', category: 'Balayage', label: 'Soft dimension' },
  { src: 'https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?w=800&q=80', category: 'Bridal', label: 'Half-up half-down' },
  { src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80', category: 'Blonde', label: 'Vanilla blonde' },
  { src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80', category: 'Event Hair', label: 'Sleek finish' }
];

const filters = ['All', 'Bridal', 'Balayage', 'Blonde', 'Extensions', 'Event Hair'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<string | null>(null);
  const visible = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <>
      <SectionTitle eyebrow="Gallery" title="Transformations" />
      <FilterChips options={filters} value={filter} onChange={setFilter} />
      <div className="gallery-grid">
        {visible.map((i, k) => (
          <div key={k} className="gallery-item" onClick={() => setOpen(i.src)}>
            <img src={i.src} alt={i.label} loading="lazy" />
            <div className="gallery-label">{i.label}</div>
          </div>
        ))}
      </div>
      {open && <Lightbox src={open} onClose={() => setOpen(null)} />}
    </>
  );
}
