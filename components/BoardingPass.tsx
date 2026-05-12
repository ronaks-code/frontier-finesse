"use client";

import { forwardRef, useEffect, useRef } from "react";
import QRCode from "qrcode";
import type { PassData } from "@/lib/types";

type Props = { data: PassData };

export const BoardingPass = forwardRef<HTMLDivElement, Props>(
  function BoardingPass({ data }, ref) {
    const c = data.colors;
    const qrRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const el = qrRef.current;
      if (!el) return;
      QRCode.toCanvas(el, data.qrData || " ", {
        width: 240,
        margin: 0,
        color: { dark: c.cardText, light: c.cardBg },
        errorCorrectionLevel: "M",
      }).catch(() => {
        // ignore render errors (e.g. unsupported chars)
      });
    }, [data.qrData, c.cardText, c.cardBg]);

    const total = clamp(data.totalPages, 1, 6);
    const current = clamp(data.currentPage, 1, total);

    return (
      <div
        ref={ref}
        className="w-full max-w-[420px] mx-auto rounded-[28px] overflow-hidden shadow-2xl select-none"
        style={{ background: c.appBg }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 h-14"
          style={{ background: c.headerBg, color: c.headerText }}
        >
          <AirlineMark text={data.logoText} />
          <h1 className="text-[20px] font-extrabold tracking-tight">
            {data.headerTitle}
          </h1>
          <CloseIcon color={c.headerText} />
        </div>

        {/* Passenger / route line */}
        <div
          className="flex items-baseline justify-between px-5 pt-4 pb-3"
          style={{ color: c.cardText }}
        >
          <span className="text-[20px] font-extrabold leading-tight truncate pr-3">
            {data.passengerName}
          </span>
          <span className="text-[14px] font-medium whitespace-nowrap opacity-80">
            {data.routeLabel}
          </span>
        </div>

        {/* Blue card */}
        <div
          className="mx-4 rounded-[22px] px-5 pt-5 pb-4"
          style={{ background: c.passBg, color: c.passText }}
        >
          {/* Date + confirmation */}
          <div
            className="flex justify-between text-[13px] mb-5"
            style={{ color: c.passSubText }}
          >
            <span>{data.dateLabel}</span>
            <span>
              {data.confirmationLabel}{" "}
              <span className="font-semibold" style={{ color: c.passText }}>
                {data.confirmation}
              </span>
            </span>
          </div>

          {/* Flight row */}
          <div className="grid grid-cols-3 items-center mb-1">
            <div className="text-[32px] font-extrabold leading-none">
              {data.originCode}
            </div>
            <div className="text-center px-2">
              <div
                className="text-[14px] font-semibold mb-1"
                style={{ color: c.accent }}
              >
                {data.flightNumber}
              </div>
              <div
                className="flight-dashes h-[2px] w-full"
                style={{ color: c.accent }}
                aria-hidden
              />
            </div>
            <div className="text-[32px] font-extrabold leading-none text-right">
              {data.destinationCode}
            </div>
          </div>

          {/* City names */}
          <div className="grid grid-cols-3 mb-6">
            <div className="text-[15px]" style={{ color: c.passSubText }}>
              {data.originCity}
            </div>
            <div />
            <div
              className="text-[15px] text-right"
              style={{ color: c.passSubText }}
            >
              {data.destinationCity}
            </div>
          </div>

          {/* Gate / Seat / Group */}
          <div className="grid grid-cols-3 mb-5">
            <Stat label={data.gateLabel} value={data.gate} align="left" sub={c.passSubText} />
            <Stat label={data.seatLabel} value={data.seat} align="center" sub={c.passSubText} />
            <Stat label={data.groupLabel} value={data.group} align="right" sub={c.passSubText} />
          </div>

          {/* Boarding + door times */}
          <div className="flex justify-between text-[14px] mb-5">
            <span style={{ color: c.passSubText }}>
              {data.boardingPrefix}{" "}
              <span className="font-bold" style={{ color: c.passText }}>
                {data.boardingTime}
              </span>
            </span>
            <span style={{ color: c.passSubText }}>
              {data.doorPrefix}{" "}
              <span className="font-bold" style={{ color: c.passText }}>
                {data.doorCloseTime}
              </span>
            </span>
          </div>

          {/* Inner card */}
          <div
            className="rounded-2xl px-5 pt-5 pb-4 flex flex-col items-center"
            style={{ background: c.cardBg, color: c.cardText }}
          >
            {data.showTsaPre && <TsaPreMark />}
            <div className="text-[20px] font-extrabold mt-3 text-center">
              {data.memberName}
            </div>
            <div
              className="text-[14px] mt-1"
              style={{ color: c.cardSubText }}
            >
              {data.memberLabel}
            </div>
            <div className="mt-4 p-2 rounded-md" style={{ background: c.cardBg }}>
              <canvas ref={qrRef} className="block w-[200px] h-[200px]" />
            </div>
            <div className="text-[20px] font-extrabold mt-4">
              {data.bagLabel}
            </div>
          </div>

          {/* Sequence */}
          <div className="mt-3">
            <span className="text-[13px]" style={{ color: c.passSubText }}>
              {data.sequencePrefix} {data.sequence}
            </span>
          </div>

          {/* Page dots */}
          <div className="mt-3 flex justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => {
              const active = i + 1 === current;
              return (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{
                    background: active ? c.dotActive : "transparent",
                    boxShadow: active
                      ? "none"
                      : `inset 0 0 0 1px ${c.dotInactive}`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Status pill */}
        <div className="mx-4 mt-4 mb-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-sm">
          <span
            className="px-2.5 py-1 rounded-md text-[12px] font-bold tracking-tight"
            style={{ background: c.statusBg, color: c.statusText }}
          >
            {data.statusText}
          </span>
          <span
            className="text-[14px] font-semibold"
            style={{ color: c.cardText }}
          >
            {data.flightCode}
          </span>
        </div>
      </div>
    );
  },
);

function Stat({
  label,
  value,
  align,
  sub,
}: {
  label: string;
  value: string;
  align: "left" | "center" | "right";
  sub: string;
}) {
  const ta =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";
  return (
    <div className={ta}>
      <div className="text-[15px]" style={{ color: sub }}>
        {label}
      </div>
      <div className="text-[28px] font-extrabold leading-tight">{value}</div>
    </div>
  );
}

function AirlineMark({ text }: { text: string }) {
  return (
    <span
      className="airline-mark text-[26px]"
      style={{ minWidth: 28, display: "inline-block" }}
    >
      {text || " "}
    </span>
  );
}

function CloseIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TsaPreMark() {
  return (
    <div className="flex items-center gap-1">
      <span
        className="text-[16px] font-extrabold tracking-tight"
        style={{ color: "#003e7e" }}
      >
        TSA Pre
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M4 12.5l4.5 4.5L20 6.5"
          stroke="#2e9a4f"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[14px] align-super relative -top-1"
        style={{ color: "#003e7e" }}
      >
        ®
      </span>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}
