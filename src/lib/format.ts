const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(ts: number): string {
  return dateFmt.format(new Date(ts));
}

/** "bugün", "3 gün önce" gibi göreli ifade. */
export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const min = 60 * 1000;
  if (diff < hour) {
    const m = Math.max(1, Math.floor(diff / min));
    return `${m} dakika önce`;
  }
  if (diff < day) {
    const h = Math.floor(diff / hour);
    return `${h} saat önce`;
  }
  const d = Math.floor(diff / day);
  if (d === 0) return "bugün";
  if (d === 1) return "dün";
  return `${d} gün önce`;
}

export function daysLeft(expiresAt: number): number {
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / (24 * 60 * 60 * 1000)));
}
