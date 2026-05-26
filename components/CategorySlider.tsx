import React, { useState } from 'react';

const luxuryCategories = [
  { id: 'skincare', name: 'Skincare', count: 6, img: 'https://images.unsplash.com/photo-1111080626919-7cf5a9dbab5b?auto=format&fit=crop&w=300&q=80' }, // Standardized placeholder fallback link updated mentally
  { id: 'makeup', name: 'Makeup', count: 9, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80' },
  { id: 'haircare', name: 'Haircare', count: 12, img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80' },
  { id: 'moisturizers', name: 'Moisturizers', count: 12, img: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=300&q=80' },
  { id: 'essential-oils', name: 'Essential Oils', count: 8, img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=300&q=80' },
  { id: 'bodycare', name: 'Bodycare', count: 5, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80' }
];

export default function CategorySlider() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ width: '100%', padding: '50px 0 30px 0', backgroundColor: '#FFFFFF' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: '32px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {luxuryCategories.map((cat) => (
          <div
            key={cat.id}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onMouseEnter={() => setHoveredId(cat.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#FCEAE6',
              border: '1px solid rgba(17, 17, 17, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: hoveredId === cat.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out'
            }}>
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{
              marginTop: '12px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#111111',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              {cat.name} <sup style={{ fontSize: '8px', fontWeight: 500, color: 'rgba(17, 17, 17, 0.4)' }}>{cat.count}</sup>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}