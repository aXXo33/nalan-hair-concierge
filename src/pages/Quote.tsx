import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FileDrop from '../components/FileDrop';
import SuccessScreen from '../components/SuccessScreen';
import { useStore, newId, QuoteRequest } from '../context/StoreContext';

const NALAN_WHATSAPP = '447939535030';
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
    setForm((s) => ({
      ...s,
      previousTreatments: s.previousTreatments.includes(t)
        ? s.previousTreatments.filter((x) => x !== t)
        : [...s.previousTreatments, t],
    }));
  }

  function buildWhatsAppMessage() {
    const treatmentsLabel = form.previousTreatments.length
      ? form.previousTreatments.join(', ')
      : '—';
    const lines = [
      'New Hair Quote Request — Nalan Hair Concierge',
      '',
      'Name: ' + (form.fullName || '—'),
      'Phone: ' + (form.phone || '—'),
      'Email: ' + (form.email || '—'),
      'Current hair colour: ' + (form.currentColour || '—'),
      'Desired result: ' + (form.desiredResult || '—'),
      'Hair length: ' + form.hairLength,
      'Previous treatments: ' + treatmentsLabel,
      'Preferred appointment date: ' + (form.preferredDate || '—'),
      'Notes: ' + (form.notes || '—'),
      '',
      'Please attach your current hair photos and inspiration photo in this WhatsApp chat.',
    ];
    return lines.join('\n');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.desiredResult.trim()) {
      return;
    }
    const message = buildWhatsAppMessage();
    const url = 'https://wa.me/' + NALAN_WHATSAPP + '?text=' + encodeURIComponent(message);

    dispatch({
      type: 'addQuote',
      payload: {
        ...form,
        id: newId(),
        createdAt: new Date().toISOString(),
        contacted: false,
      },
    });

    window.open(url, '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessScreen
        title="Your hair plan request is ready"
        message="Please send the WhatsApp message to Nalan so the consultation can continue. Remember to attach your current hair photos and inspiration photo in the chat."
      />
    );
  }

  return (
    <div className="page">
      <SectionTitle eyebrow="Hair Quote" title="A bespoke colour plan" />
      <p className="page-subtitle">Share a few details about your hair and the result you have in mind. We reply personally, never automatically.</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="eyebrow">Your details</div>
        <label className="field">
          <span>Full name</span>
          <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required />
        </label>
        <label className="field">
          <span>Phone or WhatsApp</span>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+44" required />
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
        </label>

        <div className="eyebrow">Your hair</div>
        <label className="field">
          <span>Current hair colour</span>
          <input value={form.currentColour} onChange={(e) => update('currentColour', e.target.value)} placeholder="Natural brunette, previously highlighted..." />
        </label>
        <label className="field">
          <span>Desired result</span>
          <textarea value={form.desiredResult} onChange={(e) => update('desiredResult', e.target.value)} placeholder="Describe the finish you have in mind..." required rows={3} />
        </label>
        <label className="field">
          <span>Hair length</span>
          <select value={form.hairLength} onChange={(e) => update('hairLength', e.target.value)}>
            {lengths.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <div className="field">
          <span>Previous treatments</span>
          <div className="chip-row">
            {treatments.map((t) => (
              <button type="button" key={t} className={'chip ' + (form.previousTreatments.includes(t) ? 'chip-active' : '')} onClick={() => toggleTreatment(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="eyebrow">Photos</div>
        <p className="form-helper">Natural daylight photos help us understand your current colour, condition and the safest route to your desired result. After submitting, you will be asked to attach them in WhatsApp.</p>
        <FileDrop label="Current hair (front, side, back)" multiple values={form.currentPhotos} onChange={(urls) => update('currentPhotos', urls)} />
        <FileDrop label="Inspiration photo" values={form.inspirationPhoto ? [form.inspirationPhoto] : []} onChange={(urls) => update('inspirationPhoto', urls[0] || null)} />

        <div className="eyebrow">Appointment</div>
        <label className="field">
          <span>Preferred date</span>
          <input type="date" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} />
        </label>
        <label className="field">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} placeholder="Anything else we should know..." />
        </label>

        <button type="submit" className="btn btn-primary btn-block">Request My Hair Plan</button>
        <p className="form-helper" style={{textAlign: 'center', marginTop: '12px'}}>Submitting will open WhatsApp so you can send your request directly to Nalan.</p>
      </form>
    </div>
  );
}
