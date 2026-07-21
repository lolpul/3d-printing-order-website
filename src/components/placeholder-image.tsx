export function PlaceholderImage({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`grid place-items-center bg-neutral-100 text-neutral-500 ${className}`} role="img" aria-label={title}>
      <div className="px-5 text-center">
        <div className="text-sm font-bold uppercase tracking-wide text-neutral-400">3D print</div>
        <div className="mt-2 text-base font-semibold text-neutral-600">{title}</div>
      </div>
    </div>
  );
}
