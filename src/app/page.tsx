'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase';

const NAV_ITEMS = ['Feed', 'Community', 'Map', 'Cities', 'Events', 'Jobs', 'Tools'];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const signInWithGitHub = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; background: #080808; }

        :root {
          --bg: #080808;
          --accent: #e8ff47;
          --text: #fff;
          --dim: #444;
          --border: #111;
        }

        .grain {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.35;
        }

        .shell {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .sidebar-left {
          width: 48px;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0;
          flex-shrink: 0;
          z-index: 10;
        }

        .wordmark {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.35em;
          color: var(--accent);
          text-transform: uppercase;
        }

        .nav-list { list-style: none; display: flex; flex-direction: column; }

        .nav-link {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          color: var(--dim);
          text-transform: uppercase;
          padding: 12px 8px;
          cursor: pointer;
          transition: color 0.2s;
          display: block;
        }
        .nav-link:hover { color: #888; }

        .beta {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: var(--accent);
          background: rgba(232,255,71,0.08);
          border: 1px solid rgba(232,255,71,0.2);
          padding: 8px 5px;
          border-radius: 4px;
        }

        .scroll-area {
          flex: 1;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scrollbar-width: none;
        }
        .scroll-area::-webkit-scrollbar { display: none; }

        .section {
          height: 100vh;
          scroll-snap-align: start;
          display: flex;
          align-items: center;
          padding: 0 72px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }

        .ghost {
          position: absolute;
          font-family: 'Bebas Neue', sans-serif;
          color: rgba(255,255,255,0.025);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          line-height: 1;
        }

        /* S1 */
        .eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.5em;
          color: var(--dim);
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 11vw, 152px);
          line-height: 0.88;
          color: var(--text);
          margin-bottom: 36px;
        }
        .hero-title em { color: var(--accent); font-style: normal; }

        .hero-sub {
          font-size: 14px;
          color: var(--dim);
          line-height: 1.8;
          max-width: 340px;
          margin-bottom: 48px;
          font-weight: 300;
        }

        .cta-group { display: flex; align-items: center; gap: 16px; }

        .btn-enter {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--accent);
          color: #080808;
          border: none;
          padding: 13px 26px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          font-weight: 500;
        }
        .btn-enter:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-enter:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .btn-request {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--dim);
          text-transform: uppercase;
          background: none;
          border: 1px solid var(--border);
          padding: 13px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-request:hover { color: var(--text); border-color: #333; }

        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 72px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #222;
          text-transform: uppercase;
        }
        .scroll-line { width: 32px; height: 1px; background: #1a1a1a; }

        /* S2 */
        .s2-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 8vw, 112px);
          line-height: 0.9;
          color: var(--text);
          margin-bottom: 56px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 36px 80px;
          max-width: 600px;
        }

        .feature-item { display: flex; flex-direction: column; gap: 6px; }

        .feature-icon {
          width: 30px;
          height: 30px;
          border: 1px solid #161616;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          margin-bottom: 6px;
          color: var(--dim);
        }

        .feature-name { font-size: 13px; font-weight: 500; color: var(--text); }
        .feature-desc { font-size: 12px; color: var(--dim); line-height: 1.6; font-weight: 300; }

        .section-label {
          position: absolute;
          left: 72px;
          top: 50%;
          writing-mode: vertical-rl;
          transform: rotate(180deg) translateY(50%);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.45em;
          color: #222;
          text-transform: uppercase;
        }

        /* S3 */
        .s3-pre {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.5em;
          color: #2a2a2a;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .s3-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 9vw, 118px);
          line-height: 0.9;
          color: var(--text);
          margin-bottom: 32px;
        }
        .s3-title em { color: var(--accent); font-style: normal; }

        .s3-body {
          font-size: 14px;
          color: var(--dim);
          line-height: 1.9;
          font-weight: 300;
          max-width: 380px;
        }

        /* S4 */
        .s4-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.4em;
          color: var(--dim);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .s4-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 11vw, 150px);
          line-height: 0.88;
          color: var(--text);
          margin-bottom: 12px;
        }

        .s4-sub {
          font-size: 13px;
          color: #2a2a2a;
          font-style: italic;
          font-weight: 300;
          margin-bottom: 40px;
        }

        .side-tagline {
          position: absolute;
          right: 72px;
          bottom: 48px;
          text-align: right;
        }
        .side-tagline span {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: #1e1e1e;
          text-transform: uppercase;
        }
        .side-tagline span + span { font-family: 'DM Sans', sans-serif; letter-spacing: 0; font-size: 11px; color: #1a1a1a; margin-top: 4px; }

        /* RIGHT SIDEBAR */
        .sidebar-right {
          width: 48px;
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0;
          flex-shrink: 0;
          z-index: 10;
        }

        .btn-access {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: #8b1a1a;
          color: #fff;
          border: none;
          padding: 18px 7px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-access:hover { background: #a52020; }

        .btn-upgrade {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          background: transparent;
          color: var(--dim);
          border: 1px solid #161616;
          padding: 14px 7px;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-upgrade:hover { color: #888; border-color: #222; }
      `}</style>

      <div className="grain" />

      <div className="shell">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar-left">
          <span className="wordmark">outbound</span>
          <ul className="nav-list">
            {NAV_ITEMS.map(item => (
              <li key={item}><span className="nav-link">{item}</span></li>
            ))}
          </ul>
          <span className="beta">Beta</span>
        </aside>

        {/* SCROLL AREA */}
        <div className="scroll-area" ref={scrollRef}>

          {/* S1 — Hero */}
          <section className="section">
            <span className="ghost" style={{ fontSize: '30vw', bottom: '-6vw', right: '-2vw' }}>OUT</span>
            <div style={{ maxWidth: 680 }}>
              <p className="eyebrow">Beyond routine — For builders</p>
              <h1 className="hero-title">
                This is not<br />
                a platform.<br />
                <em>It's a shift.</em>
              </h1>
              <p className="hero-sub">
                Outbound is designed for developers who build beyond conventional structures. Find your people. Work anywhere. Connect locally.
              </p>
              <div className="cta-group">
                <button className="btn-enter" onClick={signInWithGitHub} disabled={loading}>
                  <GHIcon />
                  {loading ? 'Loading...' : 'Enter Outbound'}
                </button>
                <button className="btn-request">Request Access →</button>
              </div>
            </div>
            <div className="scroll-hint">
              <span className="scroll-line" />
              Scroll
            </div>
          </section>

          {/* S2 — Experience */}
          <section className="section">
            <span className="ghost" style={{ fontSize: '22vw', top: '50%', right: '-2vw', transform: 'translateY(-50%)' }}>MOVE</span>
            <span className="section-label">The Experience</span>
            <div style={{ marginLeft: 40, width: '100%' }}>
              <h2 className="s2-title">Move with<br />intention.</h2>
              <div className="features-grid">
                {[
                  { icon: '📍', name: 'Discover elevated spaces', desc: 'Curated locations for those who work differently.' },
                  { icon: '🌐', name: 'Travel with purpose', desc: 'Every destination becomes a chapter.' },
                  { icon: '⚡', name: 'Connect in new cities', desc: 'Find your people wherever you land.' },
                  { icon: '〰', name: 'Stay aligned globally', desc: 'Real-time connections across time zones.' },
                ].map(f => (
                  <div className="feature-item" key={f.name}>
                    <div className="feature-icon">{f.icon}</div>
                    <span className="feature-name">{f.name}</span>
                    <span className="feature-desc">{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* S3 — Private Network */}
          <section className="section">
            <span className="ghost" style={{ fontSize: '28vw', bottom: '-6vw', left: '-2vw' }}>BOUND</span>
            <div style={{ maxWidth: 580 }}>
              <p className="s3-pre">Elevated · Unrestricted</p>
              <h2 className="s3-title">
                A private<br />
                network built<br />
                for the <em>globally<br />inclined.</em>
              </h2>
              <p className="s3-body">
                Not another social platform. Outbound is infrastructure for the way developers actually live — building across cities, crossing time zones, finding signal in the noise.
              </p>
            </div>
            <div className="side-tagline">
              <span>outbound</span>
              <span>The next frontier of global living.</span>
            </div>
          </section>

          {/* S4 — Request Access */}
          <section className="section">
            <span className="ghost" style={{ fontSize: '26vw', top: '-4vw', right: '-2vw' }}>IN</span>
            <div>
              <p className="s4-label">For the well-traveled and the soon-to-be.</p>
              <h2 className="s4-title">
                Request<br />
                Access.
              </h2>
              <p className="s4-sub">Currently in beta. Some features may be limited or under development.</p>
              <div className="cta-group">
                <button className="btn-enter" onClick={signInWithGitHub} disabled={loading}>
                  <GHIcon />
                  {loading ? 'Loading...' : 'Enter Outbound'}
                </button>
              </div>
            </div>
            <div className="side-tagline">
              <span>outbound</span>
              <span>The next frontier of global living.</span>
            </div>
          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="sidebar-right">
          <button className="btn-access" onClick={signInWithGitHub}>Request Access</button>
          <button className="btn-upgrade">⬆ Upgrade</button>
        </aside>
      </div>
    </>
  );
}

function GHIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
// force redeploy
