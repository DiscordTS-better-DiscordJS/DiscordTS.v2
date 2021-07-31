export type field = {
    name: string
    value?: string
    inline?: boolean
}

export interface EmbedOptions {
    title?: string
    type?: string
    description?: string
    url?: string
    timestamp?: Date | string | boolean
    color?: number
    footer?: {
        text?: string
        icon_url?: string
        proxy_icon_url?: string
    }
    image?: {
        url?: string
        proxy_url?: string
        height?: number
        width?: number
    }
    thumbnail?: {
        url?: string
        proxy_url?: string
        height?: number
        width?: number
    }
    video?: {
        url?: string
        height?: number
        width?: number
    }
    provider?: {
        name?: string
        url?: string
    }
    author?: {
        name?: string
        url?: string
        icon_url?: string
        proxy_icon_url?: string
    }
    field?: field
    fields?: Array<field>

}

export interface ClearEmbedOptions {
    footer: () => void
    title: () => void
    description: () => void
    url: () => void
    timestamp: () => void
    color: () => void
    image: () => void
    thumbnail: () => void
    video: () => void
    providier: () => void
    author: () => void
    field: (name: string) => void
}