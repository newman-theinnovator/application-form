import React from 'react';

export default function App() {
  return (
    <div className="container">
      <div className="card">
        <div className="success">
          <div className="success-icon">✓</div>
          <h2>Applications Are Now Closed</h2>
          <p>
            Thank you for your interest in joining our team. Applications for this role are now closed, and all shortlisted applicants have been invited for an interview.
          </p>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#6b7280' }}>
            Please check your email inbox (and spam folder) if you already submitted an application.
          </p>
        </div>

        <footer
          style={{
            marginTop: '28px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#6b7280'
          }}
        >
          Design by{' '}
          <a
            href="https://newmanukpakacom.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
          >
            NewMan
          </a>
          <div style={{ marginTop: '6px' }}>
            Want us to work together?{' '}
            <a
              href="mailto:newman.ukpakatheboss@gmail.com"
              style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
            >
              Contact me
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
