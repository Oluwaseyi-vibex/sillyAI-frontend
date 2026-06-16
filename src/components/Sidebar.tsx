import { Compass, Settings, Book, CreditCard, LogOut } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm ${isActive
          ? 'bg-[rgba(124,92,252,0.12)] text-[#c4b5fd] border border-[rgba(124,92,252,0.35)] font-medium'
          : 'text-[rgba(240,239,255,0.38)] hover:text-[rgba(240,239,255,0.75)] hover:bg-[rgba(255,255,255,0.05)] border border-transparent'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div
      className="w-60 h-screen hidden md:flex flex-col fixed left-0 top-0 text-sm"
      style={{
        background: 'rgba(255,255,255,0.022)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <span
            style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: 'rgba(124,92,252,0.22)',
              border: '1px solid rgba(124,92,252,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c5cfc' }} />
          </span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '-0.025em',
              color: '#f0efff',
            }}
          >
            SillyAI
          </span>
        </Link>
      </div>

      {/* Section label */}
      <div className="px-5 mb-2">
        <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'rgba(240,239,255,0.22)', margin: 0 }}>
          Menu
        </p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <NavItem to="/learn" icon={<Book size={16} />} label="Learn" />
        <NavItem to="/mylessons" icon={<Compass size={16} />} label="My Lessons" />
      </nav>

      {/* Bottom section */}
      <div className="p-3 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <NavItem to="/billing" icon={<CreditCard size={16} />} label="Billing" />
        <NavItem to="/settings" icon={<Settings size={16} />} label="Settings" />

        {/* User card */}
        <div
          className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            style={{
              width: 30, height: 30,
              borderRadius: 8,
              background: 'rgba(124,92,252,0.2)',
              border: '1px solid rgba(124,92,252,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: 11,
              color: '#c4b5fd',
              flexShrink: 0,
            }}
          >
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate" style={{ margin: 0, fontSize: 13, fontWeight: 500, color: 'rgba(240,239,255,0.8)', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.01em' }}>
              John Doe
            </p>
            <p className="truncate" style={{ margin: 0, fontSize: 11, color: 'rgba(124,92,252,0.75)' }}>
              Pro Plan
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            title="Sign out"
            style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(240,239,255,0.25)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.18s, border-color 0.18s, color 0.18s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(239,68,68,0.1)';
              el.style.borderColor = 'rgba(239,68,68,0.3)';
              el.style.color = 'rgba(239,68,68,0.8)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(255,255,255,0.06)';
              el.style.color = 'rgba(240,239,255,0.25)';
            }}
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}