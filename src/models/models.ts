// 黑名单
export interface Blocklist {
    block_id: number
    block_name: string
    avatar: string
}

// 帖子
export interface Post {
    id: number
    author: string
    author_id: number
    avatar: string
    content: string
    picture: string[]
    comments: number
}

// 评论
export interface Rep {
    id: number
    author: string
    avatar: string
    reply_to?: string
    content: string
}
