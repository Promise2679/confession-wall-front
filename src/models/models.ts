// 黑名单
export interface Blocklist {
    block_id: number
    block_name: string
    avatar: string
}

// 帖子
export interface Post {
    post_id: number
    user_id: number
    comments: number
    views: number
    content: string
    avatar: string
    likes: number
    name: string
    picture: string[]
    updated_time: string
    release_time: string
}

// 个人发布的帖子
export interface Mypost {
    post_id: number
    content: string
    urls: string[]
}

// 评论
export interface Rep {
    id: number
    author: string
    avatar: string
    reply_to?: string
    content: string
}

export interface Rank {
    post_id: number
    content: string
}
