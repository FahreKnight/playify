import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Comment, Tooltip, List, Button, Form, Avatar } from 'antd';
import moment from 'moment';
import { CommentData } from "../View/Types"
import TextArea from 'antd/lib/input/TextArea';

const Editor = ({ onChange, onSubmit, submitting, value } :any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentView = (props:any) => {
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState<string>('');
    const [comments, setComments] = useState<any[]>(props.data);

    const handleSubmit = () => {
      if (!value) {
        return;
      }
  
      setSubmitting(true);
  
      setTimeout(() => {
        setSubmitting(false);
        setValue('');
        setComments(
          [

            ...comments,
            {
              author: "Han Solo",
              content: value,
            }
          ],
        )
      }, 1000);
    };
  
    const handleChange = (e:any) => {
      setValue(e.target.value);
    };

    const replyEditorRender = 
      (
        <div>
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </div>
      );
    

    return (
        <div>
            <List
              className="comment-list"
              header={`${props.data.length} replies`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item:CommentData) => {return(
                <li>
                  <Comment
                    actions={[]}
                    author= {item.author}
                    avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    content={(<p>{item.content}</p>)}
                    datetime={<Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(2, 'days').fromNow()}</span>
                  </Tooltip>}
                  >
                  </Comment>
                </li>
              )}}
              />
              {props.replyEditorVisible ? replyEditorRender : <div></div>}
        </div>
    );

};




export default CommentView;