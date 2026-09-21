import { hasLocale, type Locale } from "@/i18n/config";
import { findToolBySlug, homePath, toolPath } from "./tools";

/** Path of the current page translated into `target` (falls back to its home). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, current, slug] = pathname.split("/");
  if (!hasLocale(current)) return homePath(target);
  if (!slug) return homePath(target);
  const tool = findToolBySlug(current, slug);
  return tool ? toolPath(target, tool) : homePath(target);
}
