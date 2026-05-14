type Props = { options: string[]; value: string; onChange: (v: string) => void };
export default function FilterChips({ options, value, onChange }: Props) {
  return (
    <div className="filter-chips">
      {options.map(o => (
        <button key={o} className={o === value ? 'active' : ''} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}
