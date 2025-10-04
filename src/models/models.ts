// 黑名单
export interface Blocklist {
    block_id: number
    block_name: string
    avatar: string
}

// 帖子
export interface Post {
    post_id: number
    name: string
    likes: number
    views: number
    avatar: string
    release_time: string
    picture: string[]
    update_time: string
    content: string
    comments: number
}

// 个人发布的帖子
export interface Mypost {
    postid: number
    content: string
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
