import { X } from 'lucide-react';

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
      <img src={src} className="lightbox-img" alt="" />
    </div>
  );
}
