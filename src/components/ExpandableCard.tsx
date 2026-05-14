import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ExpandableCard({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="expandable">
      <button className="expandable-header" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <h3>{title}</h3>
        {open ? <Minus size={18} color="var(--champagne)" /> : <Plus size={18} color="var(--champagne)" />}
      </button>
      {open && (
        <div className="expandable-body">
          <ul>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
