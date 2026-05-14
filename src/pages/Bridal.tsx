import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FileDrop from '../components/FileDrop';
import SuccessScreen from '../components/SuccessScreen';
import { useStore, newId, BridalRequest } from '../context/StoreContext';

const NALAN_WHATSAPP = '447939535030';
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

  function buildWhatsAppMessage() {
    const partyLabel = form.partyType === 'bridal-only' ? 'Bridal only' : 'Bridal party';
    const lines = [
      'New Bridal Consultation Request — Nalan Hair Concierge',
      '',
      'Bride name: ' + (form.brideName || '—'),
      'Wedding date: ' + (form.weddingDate || '—'),
      'Venue/location: ' + (form.venue || '—'),
      'Trial required: ' + (form.trialRequired ? 'Yes' : 'No'),
      'Bridal only or bridal party: ' + partyLabel,
      'Number of people: ' + form.numberOfPeople,
      'Preferred style: ' + form.preferredStyle,
      'Phone: ' + (form.phone || '—'),
      'Notes: ' + (form.notes || '—'),
      '',
      'Please attach your inspiration photo in this WhatsApp chat.',
    ];
    return lines.join('\n');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.brideName.trim() || !form.phone.trim() || !form.weddingDate) {
      return;
    }
    const message = buildWhatsAppMessage();
    const url = 'https://wa.me/' + NALAN_WHATSAPP + '?text=' + encodeURIComponent(message);

    dispatch({
      type: 'ADD_BRIDAL',
      payload: {
        ...form,
        id: newId(),
        createdAt: Date.now(),
        contacted: false,
      },
    });

    window.open(url, '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessScreen
        title="Your bridal consultation request is ready"
        message="Please send the WhatsApp message to Nalan so the consultation can continue. Remember to attach your inspiration photo in the chat."
      />
    );
  }

  return (
    <div className="page">
      <SectionTitle
        eyebrow="Bridal Consultation"
        title="Your wedding day, beautifully planned"
        subtitle="Tell us about your wedding day and we'll help shape a bridal hair plan that feels elegant, calm and personal."
      />
      <form onSubmit={handleSubmit} className="form">
        <div className="eyebrow">About you</div>
        <label className="field">
          <span>Bride name</span>
          <input value={form.brideName} onChange={(e) => update('brideName', e.target.value)} required />
        </label>
        <label className="field">
          <span>Phone or WhatsApp</span>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+44" required />
        </label>

        <div className="eyebrow">The day</div>
        <label className="field">
          <span>Wedding date</span>
          <input type="date" value={form.weddingDate} onChange={(e) => update('weddingDate', e.target.value)} required />
        </label>
        <label className="field">
          <span>Venue / location</span>
          <input value={form.venue} onChange={(e) => update('venue', e.target.value)} placeholder="e.g. The Savoy, London" />
        </label>

        <div className="eyebrow">Service</div>
        <label className="field">
          <span>Trial required?</span>
          <select value={form.trialRequired ? 'yes' : 'no'} onChange={(e) => update('trialRequired', e.target.value === 'yes')}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label className="field">
          <span>Bridal only or bridal party</span>
          <select value={form.partyType} onChange={(e) => update('partyType', e.target.value as typeof form.partyType)}>
            <option value="bridal-only">Bridal only</option>
            <option value="bridal-party">Bridal party</option>
          </select>
        </label>
        <label className="field">
          <span>Number of people (including bride)</span>
          <input type="number" min={1} max={20} value={form.numberOfPeople} onChange={(e) => update('numberOfPeople', Number(e.target.value))} />
        </label>
        <label className="field">
          <span>Preferred style</span>
          <select value={form.preferredStyle} onChange={(e) => update('preferredStyle', e.target.value)}>
            {styles.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <div className="eyebrow">Inspiration</div>
        <p className="form-helper">A single inspiration image helps us understand the mood you envision. After submitting, you will be asked to attach it in WhatsApp.</p>
        <FileDrop label="Inspiration photo" value={form.inspirationPhoto ? [form.inspirationPhoto] : []} onChange={(files) => update('inspirationPhoto', files[0] || null)} />

        <label className="field">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} placeholder="Veil, accessories, anything we should know..." />
        </label>

        <button type="submit" className="btn-primary">Create My Bridal Hair Plan</button>
        <p className="form-helper" style={{textAlign: 'center', marginTop: '12px'}}>Submitting will open WhatsApp so you can send your request directly to Nalan.</p>
      </form>
    </div>
  );
}
