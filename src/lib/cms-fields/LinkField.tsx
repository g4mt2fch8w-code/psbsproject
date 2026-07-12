import React from 'react'

const AVAILABLE_PAGES = [
  { label: 'Home Page', value: '/' },
  { label: 'About Us', value: '/about' },
  { label: 'Wildlife / Species', value: '/wildlife' },
  { label: 'Our Projects', value: '/projects' },
  { label: 'News / Journal', value: '/news' },
  { label: 'Contact Us', value: '/contact' },
  { label: 'Donate', value: '/donate' },
  { label: 'Volunteer', value: '/volunteer' },
]

interface LinkFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function LinkField({ value, onChange }: LinkFieldProps) {
  // Determine if the current value matches a known page
  const isKnownPage = AVAILABLE_PAGES.some(p => p.value === value)
  const mode = value && !isKnownPage && !value.startsWith('/') ? 'custom' : 'page'

  return (
    <div className="flex flex-col gap-2">
      <select 
        value={mode === 'page' ? (value || '/') : 'custom'}
        onChange={(e) => {
          if (e.target.value !== 'custom') {
            onChange(e.target.value)
          } else {
            onChange('https://')
          }
        }}
        className="w-full text-sm px-3 py-2 bg-black/5 border border-border rounded-lg outline-none focus:border-primary"
      >
        <optgroup label="Website Pages">
          {AVAILABLE_PAGES.map(page => (
            <option key={page.value} value={page.value}>
              {page.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Other">
          <option value="custom">Custom Web Link...</option>
        </optgroup>
      </select>

      {mode === 'custom' && (
        <input 
          type="url" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          className="w-full text-sm px-3 py-2 bg-black/5 border border-border rounded-lg outline-none focus:border-primary"
        />
      )}
    </div>
  )
}
