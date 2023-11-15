export type SearchFilter = {
  id: string,
  name: string,
}

export const FILTERS: SearchFilter[] = [
  {
    id: "roastery",
    name: "Roastery",
  },
  {
    id: "cafe",
    name: "Cafe",
  },
  {
    id: "specialty",
    name: "Specialty",
  },
  {
    id: "fair_trade",
    name: "Fair Trade",
  },
  {
    id: "organic",
    name: "Organic",
  }
];

export type SearchSorter = {
  id: string,
  name: string,
}

export const SORTERS: SearchSorter[] = [
  {
    id: 'name',
    name: 'Name',
  },
  {
    id: 'rating',
    name: 'Rating',
  }
];