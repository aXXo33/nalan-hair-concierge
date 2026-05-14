import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

export type QuoteRequest = {
  id: string;
  createdAt: string;
  contacted: boolean;
  fullName: string;
  phone: string;
  email: string;
  currentColour: string;
  desiredResult: string;
  hairLength: string;
  previousTreatments: string[];
  currentPhotos: string[]; // data URLs
  inspirationPhoto: string | null;
  preferredDate: string;
  notes: string;
};

export type BridalRequest = {
  id: string;
  createdAt: string;
  contacted: boolean;
  brideName: string;
  weddingDate: string;
  venue: string;
  trialRequired: boolean;
  partyType: 'bridal-only' | 'bridal-party';
  numberOfPeople: number;
  preferredStyle: string;
  inspirationPhoto: string | null;
  phone: string;
  notes: string;
};

type State = {
  quotes: QuoteRequest[];
  bridal: BridalRequest[];
};

type Action =
  | { type: 'addQuote'; payload: QuoteRequest }
  | { type: 'addBridal'; payload: BridalRequest }
  | { type: 'toggleContactedQuote'; id: string }
  | { type: 'toggleContactedBridal'; id: string }
  | { type: 'clearQuotes' }
  | { type: 'clearBridal' }
  | { type: 'hydrate'; payload: State };

const initial: State = { quotes: [], bridal: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate': return action.payload;
    case 'addQuote': return { ...state, quotes: [action.payload, ...state.quotes] };
    case 'addBridal': return { ...state, bridal: [action.payload, ...state.bridal] };
    case 'toggleContactedQuote':
      return { ...state, quotes: state.quotes.map(q => q.id === action.id ? { ...q, contacted: !q.contacted } : q) };
    case 'toggleContactedBridal':
      return { ...state, bridal: state.bridal.map(b => b.id === action.id ? { ...b, contacted: !b.contacted } : b) };
    case 'clearQuotes': return { ...state, quotes: [] };
    case 'clearBridal': return { ...state, bridal: [] };
    default: return state;
  }
}

type Ctx = { state: State; dispatch: React.Dispatch<Action> };
const StoreContext = createContext<Ctx | null>(null);

const QUOTES_KEY = 'nalan.quotes';
const BRIDAL_KEY = 'nalan.bridal';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    try {
      const q = JSON.parse(localStorage.getItem(QUOTES_KEY) || '[]');
      const b = JSON.parse(localStorage.getItem(BRIDAL_KEY) || '[]');
      dispatch({ type: 'hydrate', payload: { quotes: q, bridal: b } });
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(QUOTES_KEY, JSON.stringify(state.quotes)); }, [state.quotes]);
  useEffect(() => { localStorage.setItem(BRIDAL_KEY, JSON.stringify(state.bridal)); }, [state.bridal]);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export const newId = () => (crypto && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36));
