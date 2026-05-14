import { useState } from 'react';
import {
  Lock,
  Trash2,
  Phone,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useStore, QuoteRequest, BridalRequest } from '../context/StoreContext';

const PASSPHRASE = 'nalan2026';

function StatusBadge({ contacted }: { contacted: boolean }) {
  return (
    <span
      className={'status-badge ' + (contacted ? 'status-done' : 'status-new')}
    >
      {contacted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
      {contacted ? 'Contacted' : 'New'}
    </span>
  );
}

function formatDate(value: string) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState<'quotes' | 'bridal'>('quotes');
  const { state, dispatch } = useStore();

  if (!unlocked) {
    return (
      <>
        <SectionTitle eyebrow="Admin" title="Private area" />
        <div className="card lock-card">
          <div className="lock-icon">
            <Lock size={26} strokeWidth={1.5} />
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Enter the studio passphrase to view submitted requests.
          </p>
          <div className="form-field" style={{ textAlign: 'left' }}>
            <label>Passphrase</label>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {err && (
            <p style={{ color: '#A65A4A', fontSize: 13, marginBottom: 10 }}>
              {err}
            </p>
          )}
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              if (input === PASSPHRASE) {
                setUnlocked(true);
                setErr('');
              } else setErr('That passphrase is not recognised.');
            }}
          >
            Enter
          </button>
        </div>
      </>
    );
  }

  const quotes = state.quotes;
  const bridal = state.bridal;

  return (
    <>
      <SectionTitle eyebrow="Admin" title="Submitted requests" />
      <div className="admin-tabs">
        <button
          className={'admin-tab ' + (tab === 'quotes' ? 'is-active' : '')}
          onClick={() => setTab('quotes')}
        >
          Hair quotes <span className="admin-count">{quotes.length}</span>
        </button>
        <button
          className={'admin-tab ' + (tab === 'bridal' ? 'is-active' : '')}
          onClick={() => setTab('bridal')}
        >
          Bridal <span className="admin-count">{bridal.length}</span>
        </button>
      </div>

      {tab === 'quotes' && (
        <div className="req-list">
          {quotes.length === 0 && (
            <p className="empty-state">No hair quote requests yet.</p>
          )}
          {quotes.map((entry: QuoteRequest) => (
            <div key={entry.id} className="req-card">
              <div className="req-head">
                <div className="req-head-left">
                  <div className="req-name">
                    <User size={14} /> {entry.fullName || '—'}
                  </div>
                  <div className="req-type">Hair Quote</div>
                </div>
                <StatusBadge contacted={entry.contacted} />
              </div>
              <div className="req-meta">
                <div className="req-meta-item">
                  <Phone size={13} /> {entry.phone || '—'}
                </div>
                <div className="req-meta-item">
                  <Calendar size={13} /> {formatDate(entry.preferredDate)}
                </div>
              </div>
              <div className="req-details">
                <div>
                  <span className="req-label">Email</span>
                  <span>{entry.email || '—'}</span>
                </div>
                <div>
                  <span className="req-label">Current colour</span>
                  <span>{entry.currentColour || '—'}</span>
                </div>
                <div>
                  <span className="req-label">Desired result</span>
                  <span>{entry.desiredResult || '—'}</span>
                </div>
                <div>
                  <span className="req-label">Hair length</span>
                  <span>{entry.hairLength || '—'}</span>
                </div>
                <div>
                  <span className="req-label">History</span>
                  <span>
                    {entry.previousTreatments && entry.previousTreatments.length
                      ? entry.previousTreatments.join(', ')
                      : '—'}
                  </span>
                </div>
              </div>
              {entry.notes && (
                <div className="req-notes">
                  <span className="req-label">
                    <FileText size={12} /> Notes
                  </span>
                  <p>{entry.notes}</p>
                </div>
              )}
              {entry.inspirationPhoto && (
                <div className="req-photo">
                  <img src={entry.inspirationPhoto} alt="inspiration" />
                </div>
              )}
              <button
                className="btn btn-secondary btn-block"
                onClick={() =>
                  dispatch({ type: 'toggleContactedQuote', id: entry.id })
                }
              >
                {entry.contacted ? 'Mark as new' : 'Mark contacted'}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'bridal' && (
        <div className="req-list">
          {bridal.length === 0 && (
            <p className="empty-state">No bridal consultations yet.</p>
          )}
          {bridal.map((entry: BridalRequest) => (
            <div key={entry.id} className="req-card">
              <div className="req-head">
                <div className="req-head-left">
                  <div className="req-name">
                    <User size={14} /> {entry.brideName || '—'}
                  </div>
                  <div className="req-type">Bridal Consultation</div>
                </div>
                <StatusBadge contacted={entry.contacted} />
              </div>
              <div className="req-meta">
                <div className="req-meta-item">
                  <Phone size={13} /> {entry.phone || '—'}
                </div>
                <div className="req-meta-item">
                  <Calendar size={13} /> Wedding {formatDate(entry.weddingDate)}
                </div>
              </div>
              <div className="req-details">
                <div>
                  <span className="req-label">Venue</span>
                  <span>{entry.venue || '—'}</span>
                </div>
                <div>
                  <span className="req-label">Trial</span>
                  <span>{entry.trialRequired ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="req-label">Party</span>
                  <span>
                    {entry.partyType === 'bridal-only'
                      ? 'Bridal only'
                      : 'Bridal party'}
                  </span>
                </div>
                <div>
                  <span className="req-label">People</span>
                  <span>{entry.numberOfPeople}</span>
                </div>
                <div>
                  <span className="req-label">Style</span>
                  <span>{entry.preferredStyle || '—'}</span>
                </div>
              </div>
              {entry.notes && (
                <div className="req-notes">
                  <span className="req-label">
                    <FileText size={12} /> Notes
                  </span>
                  <p>{entry.notes}</p>
                </div>
              )}
              {entry.inspirationPhoto && (
                <div className="req-photo">
                  <img src={entry.inspirationPhoto} alt="inspiration" />
                </div>
              )}
              <button
                className="btn btn-secondary btn-block"
                onClick={() =>
                  dispatch({ type: 'toggleContactedBridal', id: entry.id })
                }
              >
                {entry.contacted ? 'Mark as new' : 'Mark contacted'}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
