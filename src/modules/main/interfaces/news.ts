export interface NewsCategory {
  createdAt: string
}

export interface NewsCategoryToListItem {
  createdAt: string
}

export interface NewsCategoryToItemById {
  createdAt: string
}

export interface NewsToListItem {
  createdAt: string
  publishedAt: Date
  published: boolean
  newsCategory: NewsCategory | null
}

export interface NewsToItemById {
  createdAt: string
  publishedAt: Date
  isPublished: boolean
  newsCategory: NewsCategory | null
}
