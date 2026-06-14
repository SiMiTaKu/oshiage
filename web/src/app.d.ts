declare global {
  namespace App {
    interface Locals {
      isMobile: boolean
    }
    interface PageData {
      isMobile: boolean
    }
  }

  interface SrcMeta {
    src: string
    width: number
    height: number
    format: string
  }
}

declare module '*&as=meta' {
  const images: SrcMeta[]
  export default images
}

declare module '*?as=meta' {
  const images: SrcMeta[]
  export default images
}

declare module '../images/hero-1.jpg?w=1200&format=webp&url' {
  const urlAsset: string
  export default urlAsset
}

declare module '../images/hero-2.jpg?w=1200&format=webp&url' {
  const urlAsset: string
  export default urlAsset
}

declare module '../images/hero-3.jpg?w=1200&format=webp&url' {
  const urlAsset: string
  export default urlAsset
}

export {}
