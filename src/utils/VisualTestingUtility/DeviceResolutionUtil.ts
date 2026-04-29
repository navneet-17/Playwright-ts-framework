// Devices are Updated: April 2026 — Devices cover around 80%+ market share!
export const DEVICES = {  
  // ─── MOBILE — Apple iPhone 17 Series ─────────────────────
  iPhone_17_SE: { width: 393, height: 852 },        // budget/compact
  iPhone_17: { width: 430, height: 932 },           // standard flagship
  iPhone_17_Pro: { width: 430, height: 932 },       // pro model
  iPhone_17_Pro_Max: { width: 480, height: 1044 },  // largest iPhone
  // ─── MOBILE — Samsung Galaxy 2026 ────────────────────────
  Galaxy_S26: { width: 432, height: 960 },          // standard flagship
  Galaxy_S26_Ultra: { width: 440, height: 990 },    // ultra flagship
  Galaxy_Z_Fold6: { width: 412, height: 915 },      // unfolded (compact mode)
  // ─── MOBILE — OnePlus 15 Series ──────────────────────────
  OnePlus_15: { width: 440, height: 990 },          // flagship
  OnePlus_15T: { width: 432, height: 960 },         // performance variant
  OnePlus_Nord_6: { width: 412, height: 915 },      // mid-range
  // ─── MOBILE — Google Pixel 10 ────────────────────────────
  Pixel_10: { width: 412, height: 915 },            // flagship
  // ─── TABLET ──────────────────────────────────────────────
  iPad_Air: { width: 820, height: 1180 },           // standard tablet
  iPad_Pro_13: { width: 1024, height: 1366 },       // large tablet
  // ─── LAPTOP & DESKTOP ────────────────────────────────────
  Laptop_13: { width: 1366, height: 768 },          // budget/standard
  Laptop_15: { width: 1440, height: 900 },          // common laptop
  Desktop_FHD: { width: 1920, height: 1080 },       // full HD — most common
  Desktop_4K: { width: 3840, height: 2160 },        // 4K monitor
} as const;
export type DeviceName = keyof typeof DEVICES;