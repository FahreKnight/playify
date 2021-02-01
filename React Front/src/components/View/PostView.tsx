import React, { useEffect, useState } from 'react'
import {Button, Card, Collapse, Image, Modal, Row} from 'antd'
import {EditOutlined, PlusCircleOutlined} from '@ant-design/icons'
import CommentView from './CommentView'
import { connect, useStore } from 'react-redux';
import { User } from '../../types/types/user';
import { Comment } from '../../types/types/comment';
import TextArea from 'antd/lib/input/TextArea';

const { Panel } = Collapse;


const PostView = (props :any) => {
    const [replyEditorVisible, setReplyEditorVisible] = useState(false);
    const [newCommentModalVisible, setIsNewCommentModalVisible] = useState(false);
    const [commentData, setCommentData] = useState<any[]>([]);
    const [content, setContent] = useState<string>('');
    const toggleNewCommentModal = () => setIsNewCommentModalVisible(!newCommentModalVisible);
    const toggleReplyEditorVisible = () => setReplyEditorVisible(!replyEditorVisible);

    const generateReplyExtra = () => 
    (
        <div>
        <EditOutlined onClick ={e => {
            e.stopPropagation();
            toggleReplyEditorVisible();
        }}
        ></EditOutlined>
        <PlusCircleOutlined onClick={() => toggleNewCommentModal()}/>
        </div>
    )

    useEffect(() => {
        setCommentData(props?.comments.filter((comment: Comment) => comment.relatedPostId === props.id).map((comment: Comment) => ({
            author: props.users.find((user: User) => user.id === comment.userId).username,
            comment: comment.content
        })));
    }, [newCommentModalVisible]);

    const createComment = () => {
        props.dispatch({type: 'ADD_COMMENT', data: {
            relatedPostId: props.id,
            content: content,
            userId: props.loggedUser.id
        }});
        setCommentData(props?.comments.filter((comment: Comment) => comment.relatedPostId === props.id).map((comment: Comment) => ({
            author: props.users.find((user: User) => user.id === comment.userId).username,
            comment: comment.content
        })));
    }

    return ( 
        <div>
            <Modal
                title="Create New Comment"
                visible={newCommentModalVisible}
                onCancel={() => toggleNewCommentModal()}
                onOk={() => toggleNewCommentModal()}
                closable
                footer={[
                    <Button key="back" onClick={() => toggleNewCommentModal()}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {createComment(); toggleNewCommentModal()}}
                    >
                        Submit
                    </Button>
                ]}
                >
            	<div>
					<Row gutter = {[0, 8]}>
						<TextArea placeholder = "Type something..." value={content} onChange={(e: any) => setContent(e.target.value)}></TextArea>
					</Row>
				</div>
            </Modal>
            <Card title = {props.title} style= {{width: 750, textAlign:"center"}}>
                <p style = {{textAlign:"left"}}>{props.content}</p>
                {(() => {
                    if (props.image !== null && props.image !== undefined) {
                        return (<div><Image width = {80} src = {props.image}></Image></div>);
                    }

                    else {
                        return(<div></div>);
                    }
                })()}
                <Card type = "inner">
                    <Collapse defaultActiveKey = {[1]} ghost>
                        <Panel header = "Comments" key = "comments-section" style = {{textAlign:"left"}} 
                        extra = {generateReplyExtra()}>
                            {!newCommentModalVisible && <CommentView data={commentData} replyEditorVisible = {replyEditorVisible} ></CommentView>}
                        </Panel>             
                    </Collapse>
                </Card>
            </Card>
            
        </div>
    )   
}

const mapStateToProps = (state: any) => ({
    comments: state.comments,
    users: state.users,
    loggedUser: state.loggedUser
});
  

export default connect(mapStateToProps)(PostView);