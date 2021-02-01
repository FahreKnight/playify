import React, { useState } from 'react'
import {Card, Collapse, Image} from 'antd'
import {EditOutlined} from '@ant-design/icons'
import CommentView from './CommentView'

const { Panel } = Collapse;


export const PostView = (props :any) => {
    const [replyEditorVisible, setReplyEditorVisible] = useState(false);
    const toggleReplyEditorVisible = () => setReplyEditorVisible(!replyEditorVisible);

    const generateReplyExtra = () => 
    (
        <div>
        <EditOutlined onClick ={e => {
            e.stopPropagation();
            toggleReplyEditorVisible();
        }}
        ></EditOutlined>
        </div>
    )


    return (
        <div>
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
                            <CommentView data = {props.commentData} replyEditorVisible = {replyEditorVisible} ></CommentView>
                        </Panel>
                    </Collapse>
                </Card>
            </Card>
            
        </div>
    )   
}
