type Platform = {
  id: number
  slug: string
  name: string;
}

type ParentPlatform = {
  platform: Platform
}

export type Game = {
  id: number
  slug: string
  name: string
  background_image: string;
  description_raw: string;
  platforms: Platform[]
  parent_platforms?: ParentPlatform[]
  released: string
  metacritic: number
  developers: Array<{
    name:string
  }>
  publishers: Array<{
    name:string
  }>
  esrb_rating?: {
    name: string;
  }
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

export type Screenshot = {
  id: number
  image: string;
  width: number
  height:number
}

export type QueryResults<T> = {
  count: number;
  results: T[]
}
