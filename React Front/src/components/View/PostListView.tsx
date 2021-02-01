import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { List, Skeleton } from 'antd';
import PostView from './PostView';
import { connect } from 'react-redux';
import { Post } from '../../types/types/post';


const PostListView = (props: any) => {

  const [isNewCommentModalVisible, setIsNewCommentModalVisible] = useState(false);
  const [postList, setPostList] = useState<any[]>([]);

  
  useEffect(() => {
    setPostList(props.posts?.map((post: Post) => ({
      title: post.title,
      content: post.content,
      image: post.imgUrl,
      comments: [],
      id: post.id
    })))
  }, [isNewCommentModalVisible])

  return (
    <div>
        <List
        style = {{overflow: "auto", overflowX: "hidden", height:610}}
        loading={false}
        itemLayout="horizontal"
        dataSource={postList}
        renderItem={(item: any) => (
          <List.Item>
              <Skeleton loading = {false} active>
                <PostView title = {item.title} content = {item.content} image = {item.image} id= {item.id}/>
              </Skeleton>
          </List.Item>
        )}
      />
    </div>);
  
}

const mapStateToProps = (state: any) => ({
  posts: state.posts,
  comments: state.comments
});


export default connect(mapStateToProps)(PostListView);