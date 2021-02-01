export interface Comment {
    id: number,
    content: string,
    userId: number,
    likeCount: number,
    unlikeCount: number,
    relatedPostId: number
}