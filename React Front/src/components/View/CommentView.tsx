import React from 'react';
import 'antd/dist/antd.css';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';

const CommentView = (props:any) => {

    return (
        <div>
            <List
              className="comment-list"
              header={`${props.data.length} replies`}
              itemLayout="horizontal"
              dataSource={props.data}
              renderItem={(item:any) => {
                return(
                <li>
                  <Comment
                    actions={[]}
                    author= {item.author}
                    avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    content={(<p>{item.comment}</p>)}
                    datetime={<Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(2, 'days').fromNow()}</span>
                  </Tooltip>}
                  >
                  </Comment>
                </li>
              )}}
              />
        </div>
    );

};

export default CommentView;