import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FileDrop from '../components/FileDrop';
import SuccessScreen from '../components/SuccessScreen';
import { useStore, newId, BridalRequest } from '../context/StoreContext';

const styles = [
  'Hollywood waves',
  'Elegant bun',
  'Soft updo',
  'Half-up half-down',
  'Other',
];

export default function Bridal() {
  const { dispatch } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<
    Omit<BridalRequest, 'id' | 'createdAt' | 'contacted'>
  >({
    brideName: '',
    weddingDate: '',
    venue: '',
    trialRequired: true,
    partyType: 'bridal-only',
    numberOfPeople: 1,
    preferredStyle: styles[0],
    inspirationPhoto: null,
    phone: '',
    notes: '',
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const entry: BridalRequest = {
      id: newId(),
      createdAt: new Date().toISOString(),
      contacted: false,
      ...form,
    };
    dispatch({ type: 'addBridal', payload: entry });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (submitted) {
    return (
      <SuccessScreen
        title="Your bridal plan is being prepared"
        message="Your request has been received. Nalan’s team will review your details and continue the consultation via WhatsApp."
      />
    );
  }

  return (
    <>
      <SectionTitle
        eyebrow="Bridal Consultation"
        title="Your wedding hair, considered"
      />
      <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
        Tell us about your wedding day and we’ll help shape a bridal hair plan
        that feels elegant, calm and personal.
      </p>

      <form onSubmit={submit}>
        <div className="form-section">
          <div className="eyebrow">The bride</div>
          <div className="form-field">
            <label>Bride name</label>
            <input
              required
              value={form.brideName}
              onChange={(e) => update('brideName', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Wedding date</label>
            <input
              type="date"
              required
              value={form.weddingDate}
              onChange={(e) => update('weddingDate', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Wedding venue or location</label>
            <input
              value={form.venue}
              onChange={(e) => update('venue', e.target.value)}
              placeholder="Venue, London or area"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="eyebrow">Preferences</div>
          <div className="form-field">
            <label>Trial required</label>
            <div className="toggle">
              <button
                type="button"
                className={form.trialRequired ? 'active' : ''}
                onClick={() => update('trialRequired', true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={!form.trialRequired ? 'active' : ''}
                onClick={() => update('trialRequired', false)}
              >
                No
              </button>
            </div>
          </div>

          <div className="form-field">
            <label>Bridal hair only or bridal party</label>
            <div className="radio-group">
              <button
                type="button"
                className={
                  'chip-check ' +
                  (form.partyType === 'bridal-only' ? 'checked' : '')
                }
                onClick={() => update('partyType', 'bridal-only')}
              >
                Bridal only
              </button>
              <button
                type="button"
                className={
                  'chip-check ' +
                  (form.partyType === 'bridal-party' ? 'checked' : '')
                }
                onClick={() => update('partyType', 'bridal-party')}
              >
                Bridal party
              </button>
            </div>
          </div>

          <div className="form-field">
            <label>Number of people</label>
            <input
              type="number"
              min={1}
              value={form.numberOfPeople}
              onChange={(e) => update('numberOfPeople', Number(e.target.value))}
            />
          </div>

          <div className="form-field">
            <label>Preferred style</label>
            <select
              value={form.preferredStyle}
              onChange={(e) => update('preferredStyle', e.target.value)}
            >
              {styles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="eyebrow">Inspiration</div>
          <FileDrop
            label="Inspiration photo"
            values={form.inspirationPhoto ? [form.inspirationPhoto] : []}
            onChange={(v) => update('inspirationPhoto', v[0] || null)}
          />
        </div>

        <div className="form-section">
          <div className="eyebrow">Contact</div>
          <div className="form-field">
            <label>Phone or WhatsApp</label>
            <input
              required
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+44"
            />
          </div>
          <div className="form-field">
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Anything we should know about the day"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ marginTop: 8 }}
        >
          Create My Bridal Hair Plan
        </button>
      </form>
    </>
  );
}
