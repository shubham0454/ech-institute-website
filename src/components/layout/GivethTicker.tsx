'use client';

import React from 'react';

// ──────────────────────────────────────────────────────────────────────────────
// GivethTicker — Proplay Announcement Marquee Bar
// Fixed single-line strip, sits directly below the fixed navbar.
// Clicking opens the Giveth QF Round 16 donation page.
// ──────────────────────────────────────────────────────────────────────────────

const GIVETH_QF_URL =
  'https://qf.giveth.io/project/ech-institute-ethcatherders?roundId=16';

/** Each segment shown in the continuous ticker */
const TICKER_ITEMS = [
  { icon: '🔴', text: 'LIVE NOW — Giveth QF Round 16' },
  { icon: '💛', text: "ECH Institute in Giveth's Ethereum Security QF Round" },
  { icon: '🛡️', text: 'Backed by TheDAO Security Fund' },
  { icon: '💰', text: 'Matching Pool: 500 ETH' },
  { icon: '📅', text: 'Donation Window: Apr 23 – May 14, 2026' },
  { icon: '⚡', text: 'QF makes EVERY dollar count — support is multiplied' },
  { icon: '🌐', text: 'Educating users · Growing community · Making Ethereum home for Web3' },
  { icon: '🎯', text: 'Click to Donate on Giveth →' },
];

/** One full row of items with separators — duplicated in the track for seamless loop */
function TickerRow() {
  return (
    <span className="giveth-ticker-row">
      {TICKER_ITEMS.map((item, i) => (
        <React.Fragment key={i}>
          <span className="giveth-ticker-item">
            <span className="giveth-ticker-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="giveth-ticker-text">{item.text}</span>
          </span>
          <span className="giveth-ticker-sep" aria-hidden="true">◆</span>
        </React.Fragment>
      ))}
    </span>
  );
}

export default function GivethTicker() {
  return (
    <a
      href={GIVETH_QF_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="giveth-ticker-bar"
      aria-label="Giveth QF Round 16 — Click to donate to ECH Institute on Giveth"
    >
      {/* Scrolling track: two copies for seamless infinite loop */}
      <div className="giveth-ticker-track" aria-hidden="true">
        <TickerRow />
        <TickerRow />
      </div>

      {/* Screen-reader copy */}
      <span className="sr-only">
        ECH Institute is in Giveth QF Round 16. Donation window April 23 – May 14, 2026.
        Matching pool 500 ETH. Click to donate.
      </span>

      {/* ● LIVE pill — right edge */}
      <span className="giveth-ticker-live-pill" aria-hidden="true">
        <span className="giveth-ticker-live-dot" />
        LIVE
      </span>
    </a>
  );
}
