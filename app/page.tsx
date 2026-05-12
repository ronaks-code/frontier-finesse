"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { BoardingPass } from "@/components/BoardingPass";
import { Editor } from "@/components/Editor";
import { DEFAULT_PASS } from "@/lib/defaults";
import { clearPass, loadPass, savePass } from "@/lib/storage";
import type { PassData } from "@/lib/types";

export default function Page() {
  const [data, setData] = useState<PassData>(DEFAULT_PASS);
  const [hydrated, setHydrated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const passRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadPass();
    if (saved) {
      setData({
        ...DEFAULT_PASS,
        ...saved,
        colors: { ...DEFAULT_PASS.colors, ...(saved.colors || {}) },
      });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) savePass(data);
  }, [data, hydrated]);

  const onReset = () => {
    clearPass();
    setData(DEFAULT_PASS);
  };

  const onExport = async () => {
    const node = passRef.current;
    if (!node) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: data.colors.appBg,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `boarding-pass-${(data.confirmation || "export").replace(/[^a-z0-9-]/gi, "")}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Export failed", err);
      alert("Couldn't export PNG. Try again or check the browser console.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: data.colors.appBg }}
    >
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-200 safe-top">
        <div className="max-w-[480px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="airline-mark text-[22px] leading-none"
              style={{ color: "#0e6e3a" }}
            >
              F
            </span>
            <span className="font-extrabold text-neutral-900 tracking-tight">
              Pass Studio
            </span>
          </div>
          <button
            type="button"
            onClick={onExport}
            disabled={exporting}
            className="h-9 px-4 rounded-full bg-neutral-900 text-white text-[13px] font-semibold disabled:opacity-60 active:scale-[0.98] transition-transform"
          >
            {exporting ? "Exporting…" : "Export PNG"}
          </button>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-10 safe-bottom space-y-5">
        <div className="py-2">
          <BoardingPass ref={passRef} data={data} />
        </div>
        <Editor data={data} onChange={setData} onReset={onReset} />
        <p className="text-center text-[12px] text-neutral-500 pt-2">
          Tap any field to customize. Changes save automatically on this device.
        </p>
      </main>
    </div>
  );
}
