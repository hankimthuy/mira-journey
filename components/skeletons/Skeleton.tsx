export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-[3px] bg-forest/10 ${className}`} />;
}
