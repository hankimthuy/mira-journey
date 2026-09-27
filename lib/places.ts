import { supabase } from "./supabase";

export type Place = {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  isHome: boolean;
  /** "YYYY-MM-01", or null when the date wasn't recorded. */
  visitedOn: string | null;
  note: string;
  coverUrl: string;
  photos: string[];
};

/** One row of public.places, as authored through the admin CMS. */
type PlaceRow = {
  id: string;
  slug: string;
  name: string;
  region: string;
  country: string;
  is_home: boolean;
  visited_on: string | null;
  note: string;
  cover_url: string;
  photos: string[] | null;
};

const PLACE_COLUMNS =
  "id, slug, name, region, country, is_home, visited_on, note, cover_url, photos";

export const HOME_COUNTRY = "Việt Nam";

function toPlace(row: PlaceRow): Place {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region ?? "",
    country: row.country || HOME_COUNTRY,
    isHome: row.is_home ?? false,
    visitedOn: row.visited_on,
    note: row.note ?? "",
    coverUrl: row.cover_url ?? "",
    photos: row.photos ?? [],
  };
}

export function isAbroad(place: Place): boolean {
  return place.country !== HOME_COUNTRY;
}

/** "08·2026", or "đã ghé" for a place whose date wasn't recorded. */
export function formatVisited(place: Place): string {
  if (!place.visitedOn) return "đã ghé";
  const [year, month] = place.visitedOn.split("-");
  return `${month}·${year}`;
}

/** Cover first, then the album — without showing the cover twice. */
export function placeGallery(place: Place): string[] {
  const rest = place.photos.filter((url) => url !== place.coverUrl);
  return place.coverUrl ? [place.coverUrl, ...rest] : rest;
}

/**
 * Small stable hash of a slug. Stamps take their tilt and ink from it, so
 * each one looks hand-pressed yet renders identically on server and client.
 */
export function slugHash(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Published places in passport order: dated stamps by time, undated after. */
export async function getAllPlaces(): Promise<Place[]> {
  const { data, error } = await supabase
    .from("places")
    .select(PLACE_COLUMNS)
    .eq("draft", false)
    .eq("visibility", "public")
    .order("visited_on", { ascending: true, nullsFirst: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[places] getAllPlaces failed:", error.message);
    return [];
  }

  return (data ?? []).map((row) => toPlace(row as unknown as PlaceRow));
}

export async function getPlaceBySlug(slug: string): Promise<Place | null> {
  const { data, error } = await supabase
    .from("places")
    .select(PLACE_COLUMNS)
    .eq("slug", slug)
    .eq("draft", false)
    .eq("visibility", "public")
    .maybeSingle();

  if (error) {
    console.error("[places] getPlaceBySlug failed:", error.message);
    return null;
  }

  return data ? toPlace(data as unknown as PlaceRow) : null;
}
