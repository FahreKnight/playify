export interface Post {
    id: number,
    title: string,
    content: string,
    imgUrl: string,
    userId: number,
    likeCount: number,
    unlikeCount: number,
    communityId: number
}