/**
 * @param {"en" | "zh"} targetLocale
 * @param {string} hash
 */
export function buildLanguageHref(targetLocale, hash) {
  const base = targetLocale === "zh" ? "/zh" : "/";
  const safeHash = hash.startsWith("#") ? hash : "";
  return `${base}${safeHash}`;
}
