import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Skeleton, AutoComplete, Tooltip, Row } from 'antd';
import { PostView } from './PostView';
import CommentView from './CommentView';
import moment from 'moment';

const count = 3;

class PostListView extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [
    { title: "Example First Title", content: "Example First Content Blah blah blah blah blah blah blah blah \
    lorem ipsum dolor sit amet blah blah blah blah blah " , 
    image: "https://ms.yugipedia.com//thumb/f/fd/Back-Anime-ZX-2.png/627px-Back-Anime-ZX-2.png",
    comments: 
    [{author: "Shitty Mitty", content: "What a nice comment"}, 
    {author: "Hello Kitty", content: "Eenie meenie minie moo"}
  ]},
    { title: "Example Second Title", content: "Example Second Content", 
    image: "https://ms.yugipedia.com//8/80/Akiza-TFSP.png",
    comments: 
    [{author: "Shitty Mitty", content: "What a nice comment"}, 
    {author: "Hello Kitty", content: "Eenie meenie minie moo"}
  ]},	
    { title: "Example Third Title", content: "Example Third Content", 
    comments: 
    [{author: "Shitty Mitty", content: "What a nice comment"}, 
    {author: "Hello Kitty", content: "Eenie meenie minie moo"}
  ]}
	],
    list: [
      { title: "Example First Title", content: "Example First Content Blah blah blah blah blah blah blah blah \
      lorem ipsum dolor sit amet blah blah blah blah blah ",
      image: "https://ms.yugipedia.com//thumb/f/fd/Back-Anime-ZX-2.png/627px-Back-Anime-ZX-2.png",
      comments: 
      [{author: "Shitty Mitty", content: "What a nice comment"}, 
      {author: "Hello Kitty", content: "Eenie meenie minie moo"}
    ]},
      { title: "Example Second Title", content: "Example Second Content", 
      image: "https://ms.yugipedia.com//8/80/Akiza-TFSP.png",
      comments: 
      [{author: "Shitty Mitty", content: "What a nice comment"}, 
      {author: "Hello Kitty", content: "Eenie meenie minie moo"}
    ]},	
      { title: "Example Third Title", content: "Example Third Content", 
      comments: 
      [{author: "Shitty Mitty", content: "What a nice comment"}, 
      {author: "Hello Kitty", content: "Eenie meenie minie moo"}
    ]}
    ]
  };

  componentDidMount() {
    this.setState({initLoading:false});
    this.getData();
  }

  getData = () => {
  };

  onLoadMore = () => {
      
    this.setState({
        loading: true,
        list: this.state.list.concat(this.state.data)
    });
    this.getData(); //set the list to the new concatenated list
    this.setState({
        loading: false,
        list: this.state.list.concat(this.state.data)
    });
    };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>Load more</Button>
        </div>
      ) : null;

    return (
    <div>
        <List
        style = {{overflow: "auto", overflowX: "hidden", height:610}}
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
              <Skeleton loading = {loading} active>
                <PostView title = {item.title} content = {item.content} 
                commentData = {item.comments} image = {item.image}></PostView>
              </Skeleton>
          </List.Item>
        )}
      />
    </div>
      );
  }
}

export default PostListView;