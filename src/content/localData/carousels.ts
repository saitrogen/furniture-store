export interface CarouselConfig {
  id: string
  title: string
  subtitle?: string
  viewAllHref: string
  productIds: string[]
}

export const carouselConfigs: CarouselConfig[] = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh from our workshop",
    viewAllHref: "/collection",
    /* first 8 products, newest first */
    productIds: ["P001", "P002", "P003", "P004", "P005", "P006", "P007", "P008"],
  },
  {
    id: "trending",
    title: "Trending Now",
    subtitle: "Our most loved pieces",
    viewAllHref: "/collection",
    /* hand-picked top-rated across categories */
    productIds: ["P004", "P009", "P015", "P006", "P014", "P002", "P011", "P016"],
  },
]
