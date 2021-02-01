import { Col, Modal, Select, Row, Input, List, Skeleton, Collapse, Card} from "antd";
import React, { useEffect, useState } from "react";
import { Button, Image } from "antd";
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { Community } from "../../types/types/community";
import { toast } from "react-toastify";
import { PlusCircleOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons'
import { Post } from "../../types/types/post";
import PostListView from "../View/PostListView";

const { Panel } = Collapse;

const { Option } = Select;

const Dashboard = (props: any) => {
	const [isNewPostModalVisible, setNewPostModalVisible] = useState(false);
	const toggleNewPostModal = () => setNewPostModalVisible(!isNewPostModalVisible);
	const [isNewCommunityVisible, setIsNewCommunity] = useState(false);
	const [newCommunityName, setNewCommunityName] = useState<string>('');
	const [communitySelectOptions, setCommunitySelectOptions] = useState<string[]>([]);
	const [postList, setPostList] = useState<any[]>([]);
	const [postViewList, setPostViewList] = useState<any[]>([]);
	const [communityId, setCommunityId] = useState<string>();
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>('');

	const toggleNewCommunity = () => setIsNewCommunity(!isNewCommunityVisible);

	
	const addCommunity = () => {
		if(props.communities.filter((community: Community) => community.name === newCommunityName).length === 0){
			props.dispatch({type: 'ADD_COMMUNITY', data: {name: newCommunityName}});
			setNewCommunityName('');
			toggleNewCommunity();
		}
		else {
			toast.error('Community Exists')
		}
	}

	useEffect(() => {
		prepareCommunityData();
		setTitle('');
		setContent('');
		setImageUrl('');
		setCommunityId('');
		setPostList(props.posts)
	}, [isNewPostModalVisible])

	const prepareCommunityData = () => {
		setCommunitySelectOptions(props.communities.map((community: Community) => <Option value={community.name}>{community.name}</Option>))
	}

	const createPost = () => {
		if(communityId !== undefined && props.loggedUser?.username !== undefined ){
			props.dispatch({type: 'ADD_POST', data: {title: title, imgUrl: imageUrl, communityId: communityId, content: content}})
			toggleNewPostModal();
		}
		else{
			if(props.loggedUser?.username === undefined)
				toast.error('Please Login')
			else if(!communityId){
				toast.error('Please Select Community')
			}
		}
	}

	useEffect(() => {
		createPosts();
	}, [postList])


	useEffect(() => {		
		prepareCommunityData();
		if(!isNewCommunityVisible)
			setNewCommunityName('');
	}, [isNewCommunityVisible])


	const createPosts = () => {
		setPostViewList(postList?.map((post: Post) => ({
			title: post.title,
			content: post.content,
			image: post.imgUrl,
			comments: []
		})))
		
	}

	return (
		<div>
			<Modal
				title="Create New Post"
				visible={isNewPostModalVisible}
				onCancel={() => toggleNewPostModal()}
				onOk={() => toggleNewPostModal()}
				closable
				footer={[
					<Button key="back" onClick={() => toggleNewPostModal()}>
						Cancel
					</Button>,
					<Button
						key="submit"
						type="primary"
						onClick={() => {createPost();}}
					>
						Submit
					</Button>
				]}
			>
				<div>
					<Row gutter = {[0, 24]}>
						<Col>
							<Select
								value={communityId}
								defaultValue={undefined}
								style={{ width: 180 }}
								onChange={(e: any) => {setCommunityId(e);}}
							>
								{communitySelectOptions}
							</Select>
						</Col>
						<Col>
							<Button icon={<PlusCircleOutlined />}
							onClick = {() => toggleNewCommunity()}></Button>
						</Col>
						<Col>
							{isNewCommunityVisible && <Input placeholder='Community Name' value={newCommunityName} onChange={(e: any) => setNewCommunityName(e.target.value)} addonAfter={<Row><CheckOutlined onClick={() => addCommunity()}/><StopOutlined onClick={() => {setNewCommunityName(''); toggleNewCommunity()}}/></Row>}/>}
						</Col>
					</Row>
					<Row gutter = {[0, 16]}>
						<Input placeholder = 'Image Url' value={imageUrl} onChange={(e: any) => setImageUrl(e.target.value)}/>
					</Row>
					<Row gutter = {[0, 16]}>
						<Input placeholder = "Title" value={title} onChange={(e: any) => setTitle(e.target.value)}></Input>
					</Row>
					<Row gutter = {[0, 8]}>
						<TextArea placeholder = "Type something..." value={content} onChange={(e: any) => setContent(e.target.value)}></TextArea>
					</Row>
				</div>
			</Modal>

			<Row>
				<Col span={6}>
					<Image
						src="https://mfiles.alphacoders.com/632/632875.jpg"
						width={350}
					></Image>
				</Col>

				<Col span={12}>
					<Row gutter={125}>
						<Col span={4}>
							<Button
								type="primary"
								onClick={() => toggleNewPostModal()}
							>
								Create New Post
							</Button>
						</Col>
						<Col>
							<Select
								value={communityId}
								defaultValue={undefined}
								style={{ width: 180 }}
								onChange={(e: any) => {setCommunityId(e);}}
							>
								{communitySelectOptions}
							</Select>
						</Col>
					</Row>
					<br></br>
					<br></br>
					<Row justify = "center">
						<Col>
							{!isNewPostModalVisible && <PostListView/>}
						</Col>
					</Row>
				</Col>

				<Col span={6}>
					<Image
						src="https://mfiles.alphacoders.com/177/177642.jpg"
						width={350}
					></Image>
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	communities: state.communities,
	loggedUser: state.loggedUser,
	posts: state.posts
});

export default connect(mapStateToProps)(Dashboard);
