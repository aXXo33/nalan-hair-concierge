import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FilterChips from '../components/FilterChips';
import Lightbox from '../components/Lightbox';

type Item = { src: string; category: string; label: string };

// Approved salon images live in /public/assets/gallery/.
// If a file is missing, the card automatically shows a soft elegant placeholder.
const items: Item[] = [
  { src: '/assets/gallery/bridal-1.JPEG',     category: 'Bridal',     label: 'Bridal' },
  { src: '/assets/gallery/bridal-2.JPEG',     category: 'Bridal',     label: 'Bridal' },
  { src: '/assets/gallery/balayage-1.JPEG',   category: 'Balayage',   label: 'Balayage' },
  { src: '/assets/gallery/balayage-2.JPEG',   category: 'Balayage',   label: 'Balayage' },
  { src: '/assets/gallery/event-1.JPEG',      category: 'Event Hair', label: 'Event Hair' },
  { src: '/assets/gallery/event-2.JPEG',      category: 'Event Hair', label: 'Event Hair' },
  { src: '/assets/gallery/event-3.JPEG',      category: 'Event Hair', label: 'Event Hair' },
  { src: '/assets/gallery/extensions-1.JPEG', category: 'Extensions', label: 'Extensions' },
  { src: '/assets/gallery/extensions-2.JPEG', category: 'Extensions', label: 'Extensions' },
];

const filters = ['All', 'Bridal', 'Balayage', 'Extensions', 'Event Hair'];

function GalleryCard({ item, onOpen }: { item: Item; onOpen: (src: string) => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="gallery-item"
      onClick={() => { if (!failed) onOpen(item.src); }}
      style={failed ? { cursor: 'default' } : undefined}
    >
      {failed ? (
        <div
          className="gallery-placeholder"
          aria-label={`${item.label} — photo coming soon`}
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            background:
              'linear-gradient(135deg, #f7efe6 0%, #f0e3d2 45%, #e8d4b8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a8896b',
            fontFamily: 'inherit',
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span>{item.label}</span>
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <div className="gallery-label">{item.label}</div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<string | null>(null);

  const visible = filter === 'All' ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <SectionTitle eyebrow="Gallery" title="Transformations" />
      <p style={{ color: 'var(--muted)', marginBottom: 16, maxWidth: 560 }}>
        Real client transformations. Shared with permission.
      </p>

      <FilterChips options={filters} value={filter} onChange={setFilter} />

      <div className="gallery-grid">
        {visible.map((item) => (
          <GalleryCard key={item.src} item={item} onOpen={setOpen} />
        ))}
      </div>

      {open && <Lightbox src={open} onClose={() => setOpen(null)} />}
    </>
  );
}
