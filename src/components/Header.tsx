import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';
import { WHATSAPP, INSTAGRAM } from '../lib/links';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/quote', label: 'Hair Quote' },
    { to: '/bridal', label: 'Bridal Consultation' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/aftercare', label: 'Aftercare' },
    { to: '/vip', label: 'VIP Rewards' },
    { to: '/admin', label: 'Admin' }
  ];

  return (
    <>
      <header className="header">
        <Link to="/" className="header-logo" aria-label="Nalan Hair Concierge home">
          {imgFailed ? (
            <span style={{ fontFamily: 'var(--serif)', fontSize: 14, letterSpacing: '0.06em' }}>N · I</span>
          ) : (
            <img
              src="/assets/nalan-logo.png"
              alt="Nalan Incioglu"
              onError={() => setImgFailed(true)}
            />
          )}
        </Link>
        <div className="header-text">
          <div className="header-title">Nalan Hair Concierge</div>
          <div className="header-sub">by Hair by Nalan Incioglu</div>
        </div>
        <button className="header-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </header>

      {open && (
        <>
          <div className="drawer-backdrop" onClick={() => setOpen(false)} />
          <aside className="drawer" role="dialog">
            <button className="header-menu-btn" style={{ alignSelf: 'flex-end', marginBottom: 8 }} onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
            <h4>Menu</h4>
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            ))}
            <div className="drawer-footer">
              <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram</a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
