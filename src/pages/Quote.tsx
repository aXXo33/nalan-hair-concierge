import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FileDrop from '../components/FileDrop';
import SuccessScreen from '../components/SuccessScreen';
import { useStore, newId, QuoteRequest } from '../context/StoreContext';

const treatments = ['Colour', 'Bleach', 'Keratin', 'Extensions', 'None'];
const lengths = ['Short', 'Shoulder', 'Mid-back', 'Long', 'Extra long'];

export default function Quote() {
  const { dispatch } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<
    Omit<QuoteRequest, 'id' | 'createdAt' | 'contacted'>
  >({
    fullName: '',
    phone: '',
    email: '',
    currentColour: '',
    desiredResult: '',
    hairLength: 'Shoulder',
    previousTreatments: [],
    currentPhotos: [],
    inspirationPhoto: null,
    preferredDate: '',
    notes: '',
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function toggleTreatment(t: string) {
    update(
      'previousTreatments',
      form.previousTreatments.includes(t)
        ? form.previousTreatments.filter((x) => x !== t)
        : [...form.previousTreatments, t]
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const entry: QuoteRequest = {
      id: newId(),
      createdAt: new Date().toISOString(),
      contacted: false,
      ...form,
    };
    dispatch({ type: 'addQuote', payload: entry });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (submitted) {
    return (
      <SuccessScreen
        title="Thank you"
        message="Your request has been received. Nalan’s team will review your details and continue the consultation via WhatsApp."
      />
    );
  }

  return (
    <>
      <SectionTitle eyebrow="Hair Quote" title="A bespoke colour plan" />
      <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
        Share a few details about your hair and the result you have in mind. We
        reply personally, never automatically.
      </p>

      <form onSubmit={submit}>
        <div className="form-section">
          <div className="eyebrow">Your details</div>
          <div className="form-field">
            <label>Full name</label>
            <input
              required
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
            />
          </div>
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
            <label>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="eyebrow">Your hair</div>
          <div className="form-field">
            <label>Current hair colour</label>
            <input
              value={form.currentColour}
              onChange={(e) => update('currentColour', e.target.value)}
              placeholder="Natural brunette, previously highlighted…"
            />
          </div>
          <div className="form-field">
            <label>Desired result</label>
            <textarea
              value={form.desiredResult}
              onChange={(e) => update('desiredResult', e.target.value)}
              placeholder="Describe the finish you have in mind…"
            />
          </div>
          <div className="form-field">
            <label>Hair length</label>
            <select
              value={form.hairLength}
              onChange={(e) => update('hairLength', e.target.value)}
            >
              {lengths.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Previous treatments</label>
            <div className="checkbox-group">
              {treatments.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={
                    'chip-check ' +
                    (form.previousTreatments.includes(t) ? 'checked' : '')
                  }
                  onClick={() => toggleTreatment(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="eyebrow">Photos</div>
          <p className="form-helper">
            Natural daylight photos help us understand your current colour,
            condition and the safest route to your desired result.
          </p>
          <FileDrop
            label="Current hair photos"
            multiple
            values={form.currentPhotos}
            onChange={(v) => update('currentPhotos', v)}
          />
          <FileDrop
            label="Inspiration photo"
            values={form.inspirationPhoto ? [form.inspirationPhoto] : []}
            onChange={(v) => update('inspirationPhoto', v[0] || null)}
          />
        </div>

        <div className="form-section">
          <div className="eyebrow">Appointment</div>
          <div className="form-field">
            <label>Preferred appointment date</label>
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => update('preferredDate', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Anything else we should know"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ marginTop: 8 }}
        >
          Request My Hair Plan
        </button>
      </form>
    </>
  );
}
