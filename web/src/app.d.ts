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

  declare module '*&as=meta' {
    const images: SrcMeta[]
    export default images
  }

  declare module '*?as=meta' {
    const images: SrcMeta[]
    export default images
  }
}

export {}
