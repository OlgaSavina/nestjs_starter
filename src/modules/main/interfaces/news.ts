export interface NewsCategory {
  title: string
  createdAt: string
}

export interface NewsToListItem {
  id
  name: string
  description: string
  createdAt: string
  publishedAt: Date
  published: boolean
  newsCategory: NewsCategory | null
}

export interface NewsToItemById {
  id
  name: string
  description: string
  createdAt: string
  publishedAt: Date
  published: boolean
  newsCategory: NewsCategory | null
}
