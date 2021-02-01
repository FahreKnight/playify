import { Community } from "../types/types/community";
import { Post } from "../types/types/post";
import { User } from "../types/types/user";
import { Comment } from '../types/types/comment'

const initialState = {
    users: new Array<User>(),
    userId: 0,
    posts: new Array<Post>(),
    postId: 0,
    comments: new Array<Comment>(),
    commentId: 0,
    communities: new Array<Community>(),
    communityId: 0,
    loggedUser: {}
}

const reducer = (state = initialState, action: any) => {
    var newState = {...state}
    if (action.type === 'REGISTER') {
        let model = action.data;
        let user =  {id: state.userId, username: model.username, password: model.password, email: model.email }
        let users = [...state.users, user];
        newState = {...state, users: users, userId: state.userId++, loggedUser: user}
    }
    else if(action.type === 'LOGOUT') {
        newState = {...state, loggedUser: {}}
    }
    else if(action.type === 'LOGIN') {
        let model = action.data;
        let user = state.users.find((u: User) => u.username === model.username)!
        newState = {...state, loggedUser: user}
    }
    else if(action.type === 'ADD_COMMUNITY') {
        let community = {name: action.data.name, id: state.communityId}
        let communities = [...state.communities, community]
        newState = {...state, communityId: state.communityId++, communities: communities }
    }
    else if(action.type === 'ADD_POST') {
        let post = {
            id: state.postId,
            title: action.data.title,
            content: action.data.content,
            imgUrl: action.data.imgUrl,
            communityId: action.data.communityId
        }
        let posts = [...state.posts, post];
        newState = {...state, postId: state.postId++, posts: posts}
    }
    else if(action.type === 'ADD_COMMENT') {
        let comment = {
            id: state.commentId,
            content: action.data.content,
            userId: action.data.userId,
            relatedPostId: action.data.relatedPostId
        }
        let comments = [...state.comments, comment];
        newState = {...state, commentId: state.commentId++, comments: comments}
    }
    return newState;
}


export default reducer;