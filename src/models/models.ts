export interface Blocklist {
    block_id: number
    block_name: string
    avatar: string
}

export interface Post {
    id: number
    author: string
    author_id: number
    avatar: string
    content: string
    picture: string[]
    comments: number
}

export interface Rep {
    id: number
    author: string
    avatar: string
    reply_to?: string
    content: string
}
