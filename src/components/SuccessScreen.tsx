import { Check, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP } from '../lib/links';

export default function SuccessScreen({ title, message }: { title: string; message: string }) {
  return (
    <div className="success-screen">
      <div className="check-icon"><Check size={28} strokeWidth={1.5} /></div>
      <h2>{title}</h2>
      <p>{message}</p>
      <a className="btn btn-primary btn-block" href={WHATSAPP} target="_blank" rel="noreferrer">
        <MessageCircle size={16} /> Continue on WhatsApp
      </a>
      <Link to="/" className="btn btn-ghost btn-block" style={{ marginTop: 10 }}>Back to home</Link>
    </div>
  );
}
