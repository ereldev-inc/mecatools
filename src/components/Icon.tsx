import type { IconName } from "@/lib/tools";

const paths: Record<IconName, React.ReactNode> = {
  gauge: (
    <>
      <path d="M12 14l4-4" />
      <path d="M3.3 17a9 9 0 1 1 17.4 0" />
      <path d="M12 6v1M6.3 8.3l.7.7M17.7 8.3l-.7.7" />
    </>
  ),
  swap: (
    <>
      <path d="M4 8h14M14 4l4 4-4 4" />
      <path d="M20 16H6M10 12l-4 4 4 4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
  ),
  disc: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 17L17 3l4 4L7 21z" />
      <path d="M7 13l2 2M10 10l2 2M13 7l2 2" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-5 w-5"}
    >
      {paths[name]}
    </svg>
  );
}
