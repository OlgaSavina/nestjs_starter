export interface NewsCategory {
  // title: string
  createdAt: string
}

export interface NewsCategoryToListItem {
  // /title: string
  createdAt: string
}

export interface NewsCategoryToItemById {
  //  title: string
  createdAt: string
}

export interface NewsToListItem {
  id
  // name: string
  // description: string
  createdAt: string
  publishedAt: Date
  published: boolean
  newsCategory: NewsCategory | null
}

export interface NewsToItemById {
  id
  // name: string
  // description: string
  createdAt: string
  publishedAt: Date
  isPublished: boolean
  newsCategory: NewsCategory | null
}
