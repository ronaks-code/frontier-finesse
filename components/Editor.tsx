"use client";

import type { PassColors, PassData } from "@/lib/types";
import { PRESETS, type Preset } from "@/lib/presets";

type Props = {
  data: PassData;
  onChange: (next: PassData) => void;
  onReset: () => void;
};

export function Editor({ data, onChange, onReset }: Props) {
  const set = <K extends keyof PassData>(k: K, v: PassData[K]) =>
    onChange({ ...data, [k]: v });
  const setColor = <K extends keyof PassColors>(k: K, v: string) =>
    onChange({ ...data, colors: { ...data.colors, [k]: v } });
  const applyPreset = (p: Preset) =>
    onChange({ ...data, colors: p.colors });

  return (
    <div className="space-y-3">
      <Presets active={data.colors} onPick={applyPreset} />

      <Section title="Header" defaultOpen>
        <TextField
          label="Logo letter / mark"
          value={data.logoText}
          onChange={(v) => set("logoText", v)}
          maxLength={3}
        />
        <TextField
          label="Header title"
          value={data.headerTitle}
          onChange={(v) => set("headerTitle", v)}
        />
      </Section>

      <Section title="Passenger & route">
        <TextField
          label="Passenger name"
          value={data.passengerName}
          onChange={(v) => set("passengerName", v)}
        />
        <TextField
          label="Route label (top right)"
          value={data.routeLabel}
          onChange={(v) => set("routeLabel", v)}
        />
      </Section>

      <Section title="Date & confirmation">
        <TextField
          label="Date"
          value={data.dateLabel}
          onChange={(v) => set("dateLabel", v)}
        />
        <TextField
          label="Confirmation label"
          value={data.confirmationLabel}
          onChange={(v) => set("confirmationLabel", v)}
        />
        <TextField
          label="Confirmation code"
          value={data.confirmation}
          onChange={(v) => set("confirmation", v)}
        />
      </Section>

      <Section title="Flight">
        <Row>
          <TextField
            label="Origin code"
            value={data.originCode}
            onChange={(v) => set("originCode", v.toUpperCase())}
            maxLength={4}
          />
          <TextField
            label="Destination code"
            value={data.destinationCode}
            onChange={(v) => set("destinationCode", v.toUpperCase())}
            maxLength={4}
          />
        </Row>
        <Row>
          <TextField
            label="Origin city"
            value={data.originCity}
            onChange={(v) => set("originCity", v)}
          />
          <TextField
            label="Destination city"
            value={data.destinationCity}
            onChange={(v) => set("destinationCity", v)}
          />
        </Row>
        <TextField
          label="Flight number"
          value={data.flightNumber}
          onChange={(v) => set("flightNumber", v)}
        />
      </Section>

      <Section title="Gate / seat / group">
        <Row>
          <TextField
            label="Gate label"
            value={data.gateLabel}
            onChange={(v) => set("gateLabel", v)}
          />
          <TextField
            label="Gate value"
            value={data.gate}
            onChange={(v) => set("gate", v)}
          />
        </Row>
        <Row>
          <TextField
            label="Seat label"
            value={data.seatLabel}
            onChange={(v) => set("seatLabel", v)}
          />
          <TextField
            label="Seat value"
            value={data.seat}
            onChange={(v) => set("seat", v)}
          />
        </Row>
        <Row>
          <TextField
            label="Group label"
            value={data.groupLabel}
            onChange={(v) => set("groupLabel", v)}
          />
          <TextField
            label="Group value"
            value={data.group}
            onChange={(v) => set("group", v)}
          />
        </Row>
      </Section>

      <Section title="Boarding times">
        <Row>
          <TextField
            label="Boarding prefix"
            value={data.boardingPrefix}
            onChange={(v) => set("boardingPrefix", v)}
          />
          <TextField
            label="Boarding time"
            value={data.boardingTime}
            onChange={(v) => set("boardingTime", v)}
          />
        </Row>
        <Row>
          <TextField
            label="Door prefix"
            value={data.doorPrefix}
            onChange={(v) => set("doorPrefix", v)}
          />
          <TextField
            label="Door close time"
            value={data.doorCloseTime}
            onChange={(v) => set("doorCloseTime", v)}
          />
        </Row>
      </Section>

      <Section title="Inner card (TSA, member, QR, bag)">
        <ToggleField
          label="Show TSA Pre ✓ mark"
          value={data.showTsaPre}
          onChange={(v) => set("showTsaPre", v)}
        />
        <TextField
          label="Member name"
          value={data.memberName}
          onChange={(v) => set("memberName", v)}
        />
        <TextField
          label="Member label"
          value={data.memberLabel}
          onChange={(v) => set("memberLabel", v)}
        />
        <TextField
          label="QR data (what the QR encodes)"
          value={data.qrData}
          onChange={(v) => set("qrData", v)}
        />
        <TextField
          label="Bag label"
          value={data.bagLabel}
          onChange={(v) => set("bagLabel", v)}
        />
      </Section>

      <Section title="Sequence & pagination">
        <Row>
          <TextField
            label="Sequence prefix"
            value={data.sequencePrefix}
            onChange={(v) => set("sequencePrefix", v)}
          />
          <TextField
            label="Sequence number"
            value={data.sequence}
            onChange={(v) => set("sequence", v)}
          />
        </Row>
        <Row>
          <NumberField
            label="Current page"
            value={data.currentPage}
            min={1}
            max={data.totalPages}
            onChange={(v) => set("currentPage", v)}
          />
          <NumberField
            label="Total pages"
            value={data.totalPages}
            min={1}
            max={6}
            onChange={(v) =>
              onChange({
                ...data,
                totalPages: v,
                currentPage: Math.min(data.currentPage, v),
              })
            }
          />
        </Row>
      </Section>

      <Section title="Status pill">
        <TextField
          label="Status text"
          value={data.statusText}
          onChange={(v) => set("statusText", v)}
        />
        <TextField
          label="Flight code"
          value={data.flightCode}
          onChange={(v) => set("flightCode", v)}
        />
      </Section>

      <Section title="Colors">
        <ColorField
          label="App background"
          value={data.colors.appBg}
          onChange={(v) => setColor("appBg", v)}
        />
        <ColorField
          label="Header background"
          value={data.colors.headerBg}
          onChange={(v) => setColor("headerBg", v)}
        />
        <ColorField
          label="Header text / icons"
          value={data.colors.headerText}
          onChange={(v) => setColor("headerText", v)}
        />
        <ColorField
          label="Pass card background"
          value={data.colors.passBg}
          onChange={(v) => setColor("passBg", v)}
        />
        <ColorField
          label="Pass primary text"
          value={data.colors.passText}
          onChange={(v) => setColor("passText", v)}
        />
        <ColorField
          label="Pass secondary text"
          value={data.colors.passSubText}
          onChange={(v) => setColor("passSubText", v)}
        />
        <ColorField
          label="Inner card background"
          value={data.colors.cardBg}
          onChange={(v) => setColor("cardBg", v)}
        />
        <ColorField
          label="Inner card text"
          value={data.colors.cardText}
          onChange={(v) => setColor("cardText", v)}
        />
        <ColorField
          label="Inner card subtle text"
          value={data.colors.cardSubText}
          onChange={(v) => setColor("cardSubText", v)}
        />
        <ColorField
          label="Flight number / accent"
          value={data.colors.accent}
          onChange={(v) => setColor("accent", v)}
        />
        <ColorField
          label="Status pill background"
          value={data.colors.statusBg}
          onChange={(v) => setColor("statusBg", v)}
        />
        <ColorField
          label="Status pill text"
          value={data.colors.statusText}
          onChange={(v) => setColor("statusText", v)}
        />
        <ColorField
          label="Page dot — active"
          value={data.colors.dotActive}
          onChange={(v) => setColor("dotActive", v)}
        />
        <ColorField
          label="Page dot — inactive"
          value={data.colors.dotInactive}
          onChange={(v) => setColor("dotInactive", v)}
        />
      </Section>

      <button
        type="button"
        onClick={onReset}
        className="w-full h-12 rounded-2xl border border-neutral-300 bg-white text-neutral-700 font-semibold active:bg-neutral-100 transition-colors"
      >
        Reset to defaults
      </button>
    </div>
  );
}

/* ---------- subcomponents ---------- */

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl bg-white shadow-sm overflow-hidden border border-neutral-200"
    >
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none select-none">
        <span className="text-[15px] font-semibold text-neutral-800">
          {title}
        </span>
        <Chevron />
      </summary>
      <div className="px-4 pb-4 pt-1 space-y-3">{children}</div>
    </details>
  );
}

function Chevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className="text-neutral-400 transition-transform duration-200 group-open:rotate-180"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function TextField({
  label,
  value,
  onChange,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-medium text-neutral-500 mb-1">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="w-full h-11 px-3 rounded-xl bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white outline-none text-[15px] text-neutral-900"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  return (
    <label className="block">
      <span className="block text-[12px] font-medium text-neutral-500 mb-1">
        {label}
      </span>
      <div className="flex items-center h-11 rounded-xl bg-neutral-100">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          className="w-11 h-full text-xl font-bold text-neutral-700 active:bg-neutral-200 rounded-l-xl"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <div className="flex-1 text-center text-[15px] font-semibold text-neutral-900 tabular-nums">
          {value}
        </div>
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          className="w-11 h-full text-xl font-bold text-neutral-700 active:bg-neutral-200 rounded-r-xl"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </label>
  );
}

function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="w-full flex items-center justify-between h-11 px-3 rounded-xl bg-neutral-100 active:bg-neutral-200"
      aria-pressed={value}
    >
      <span className="text-[15px] font-medium text-neutral-800">{label}</span>
      <span
        className={`relative inline-flex w-11 h-6 rounded-full transition-colors ${
          value ? "bg-emerald-500" : "bg-neutral-300"
        }`}
      >
        <span
          className={`absolute top-0.5 ${value ? "left-[22px]" : "left-0.5"} h-5 w-5 rounded-full bg-white shadow transition-all`}
        />
      </span>
    </button>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const safe = isHex(value) ? value : "#000000";
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        className="swatch shrink-0"
        value={safe}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium text-neutral-500 leading-tight">
          {label}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 mt-0.5 px-2 rounded-md bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white outline-none text-[13px] font-mono uppercase text-neutral-800"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
        />
      </div>
    </div>
  );
}

function Presets({
  active,
  onPick,
}: {
  active: PassColors;
  onPick: (p: Preset) => void;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-3">
      <div className="text-[12px] font-semibold uppercase tracking-wide text-neutral-500 mb-2 px-1">
        Color presets
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {PRESETS.map((p) => {
          const isActive = sameColors(active, p.colors);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPick(p)}
              className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border transition-colors ${
                isActive
                  ? "border-neutral-800 bg-neutral-50"
                  : "border-neutral-200"
              }`}
            >
              <div className="flex -space-x-1">
                <Swatch color={p.colors.headerBg} />
                <Swatch color={p.colors.passBg} />
                <Swatch color={p.colors.accent} />
              </div>
              <div className="mt-1 text-[12px] font-semibold text-neutral-800">
                {p.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="w-5 h-5 rounded-full border border-white"
      style={{ background: color }}
    />
  );
}

function sameColors(a: PassColors, b: PassColors) {
  return (Object.keys(a) as (keyof PassColors)[]).every(
    (k) => a[k].toLowerCase() === b[k].toLowerCase(),
  );
}

function isHex(s: string) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);
}
