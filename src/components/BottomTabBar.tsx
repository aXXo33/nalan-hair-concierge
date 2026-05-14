import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Scissors, Image, Sparkles, Crown } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/services', label: 'Services', icon: Scissors },
  { to: '/gallery', label: 'Gallery', icon: Image },
  { to: '/aftercare', label: 'Aftercare', icon: Sparkles },
  { to: '/vip', label: 'VIP', icon: Crown }
];

export default function BottomTabBar() {
  return (
    <nav className="tabbar" aria-label="Primary">
      {tabs.map(t => {
        const Icon = t.icon;
        return (
          <NavLink key={t.to} to={t.to} end={t.to === '/'} className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
            <Icon size={18} strokeWidth={1.5} />
            <span>{t.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
