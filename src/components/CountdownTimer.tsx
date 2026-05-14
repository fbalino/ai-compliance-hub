"use client";

import { useState, useEffect } from "react";

const DEADLINE = new Date("2027-01-01T00:00:00-07:00"); // Mountain Time

function getTimeLeft() {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, expired: false };
}

export function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.expired) {
    return (
      <div className="card card-tint" style={{ padding: "24px 32px", textAlign: "center", borderLeft: "4px solid var(--accent)", marginBottom: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>Colorado AI Act</div>
        <div className="h3" style={{ color: "var(--accent)" }}>Enforcement has begun</div>
        <p className="small" style={{ marginTop: 8, color: "var(--ink-2)" }}>January 1, 2027 — Colorado AI Act (as amended by SB 26-189) is now in effect.</p>
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{
        padding: "28px 32px",
        marginBottom: 32,
        borderLeft: "4px solid var(--accent)",
        background: "var(--paper-2)",
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 12, color: "var(--accent)" }}>
        ⚠ Enforcement deadline — January 1, 2027
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          maxWidth: 480,
        }}
      >
        {[
          { value: time.days, label: "Days" },
          { value: time.hours, label: "Hours" },
          { value: time.minutes, label: "Minutes" },
          { value: time.seconds, label: "Seconds" },
        ].map(({ value, label }) => (
          <div
            key={label}
            style={{
              textAlign: "center",
              padding: "12px 8px",
              borderRadius: "var(--radius)",
              background: "var(--paper-3, var(--paper))",
              border: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: 700,
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div className="xs" style={{ marginTop: 4, color: "var(--ink-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="small" style={{ marginTop: 16, color: "var(--ink-2)" }}>
        Colorado AI Act (as amended by SB 26-189) enforcement begins January 1, 2027 — is your business ready?
      </p>
    </div>
  );
}
