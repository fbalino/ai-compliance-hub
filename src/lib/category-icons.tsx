import { Microscope, Building2, Scale, Monitor, BookOpen, type LucideIcon } from "lucide-react";

/**
 * Maps category icon name strings (stored in DB) to Lucide icon components.
 * Icon names are lowercase slugs matching the Lucide icon name.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  microscope: Microscope,
  building2: Building2,
  scale: Scale,
  monitor: Monitor,
  bookopen: BookOpen,
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

/**
 * Renders a Lucide icon for a category based on its icon name string stored in the database.
 */
export function CategoryIcon({ name, className = "h-5 w-5" }: CategoryIconProps) {
  const Icon = ICON_MAP[name.toLowerCase()] ?? Monitor;
  return <Icon className={className} aria-hidden="true" />;
}

export function getCategoryIcon(name: string): LucideIcon {
  return ICON_MAP[name.toLowerCase()] ?? Monitor;
}
