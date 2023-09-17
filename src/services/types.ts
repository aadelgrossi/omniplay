type Platform = {
  id: number
  slug: string
  name: string;
}

export type Game = {
  id: number
  slug: string
  name: string
  background_image: string;
  platforms: Platform[]
  released: string
  metacritic: number
  short_screenshots: Array<{
    id: number
    image: string
  }>
  genres: Array<{
    id: number
    slug: string
    name: string;
  }>
}

export type GamesResponse = {
  count: number;
  results: Game[];
};