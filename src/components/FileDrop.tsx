import { ChangeEvent, useRef } from 'react';
import { Upload, X } from 'lucide-react';

type Props = {
  label: string;
  multiple?: boolean;
  values: string[]; // data URLs
  onChange: (urls: string[]) => void;
};

export default function FileDrop({ label, multiple = false, values, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    Promise.all(files.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    }))).then(urls => {
      onChange(multiple ? [...values, ...urls] : [urls[0]]);
    });
    e.target.value = '';
  }

  function remove(i: number) {
    const next = values.slice();
    next.splice(i, 1);
    onChange(next);
  }

  return (
    <div className="form-field">
      <label>{label}</label>
      <div className="file-drop" onClick={() => inputRef.current?.click()}>
        <Upload size={20} color="var(--champagne)" />
        <p>Tap to upload {multiple ? 'photos' : 'a photo'}</p>
        <input ref={inputRef} type="file" accept="image/*" multiple={multiple} hidden onChange={handleFiles} />
      </div>
      {values.length > 0 && (
        <div className="file-previews">
          {values.map((url, i) => (
            <div key={i} className="file-thumb" style={{ backgroundImage: `url(${url})` }}>
              <button type="button" onClick={() => remove(i)} aria-label="Remove">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
