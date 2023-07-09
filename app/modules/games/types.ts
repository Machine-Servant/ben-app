export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
    released_at: string;
    requirements: {
      minimum: string;
      recommended: string;
    };
  }[];
};
