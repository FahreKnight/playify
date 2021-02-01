import React, { useEffect, useState } from "react";
import { Row, Col,  Button, Select, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PlusCircleOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons'
import { connect } from "react-redux";
import { Community } from "../../types/types/community";
import { toast } from "react-toastify";

const { Option } = Select;

const NewPost = (props: any) => {
	const [isNewCommunityVisible, setIsNewCommunity] = useState(false);
	const [newCommunityName, setNewCommunityName] = useState<string>('');
	const [communitySelectOptions, setCommunitySelectOptions] = useState<string[]>([]);

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

	const prepareCommunityData = () => {
		setCommunitySelectOptions(props.communities.map((community: Community) => <Option value={community.id}>{community.name}</Option>))
	}

	useEffect(() => {		
		prepareCommunityData();
		if(!isNewCommunityVisible)
			setNewCommunityName('');
	}, [isNewCommunityVisible])

	return (
		<div>
			<Row gutter = {[0, 24]}>
				<Col>
					<Button icon={<PlusCircleOutlined />}
					onClick = {() => toggleNewCommunity()}></Button>
				</Col>
				<Col>
					{isNewCommunityVisible && <Input value={newCommunityName} onChange={(e: any) => setNewCommunityName(e.target.value)} addonAfter={<Row><CheckOutlined onClick={() => addCommunity()}/><StopOutlined onClick={() => {setNewCommunityName(''); toggleNewCommunity()}}/></Row>}/>}
				</Col>
			</Row>
			<Row gutter = {[0, 16]}>
				<Input placeholder = "Title"></Input>
			</Row>
			<Row gutter = {[0, 8]}>
			<TextArea placeholder = "Type something..."></TextArea>
			</Row>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	communities: state.communities
});

export default connect(mapStateToProps)(NewPost);
