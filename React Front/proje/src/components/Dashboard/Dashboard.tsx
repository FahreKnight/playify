import { Row, Col, Modal, Select } from "antd";
import React, { useState } from "react";
import { Button, Image } from "antd";
import NewPost from "../Posting/NewPost";
import PostListView from "../View/PostListView";

const { Option } = Select;

const Dashboard = () => {
	const [isNewPostModalVisible, setNewPostModalVisible] = useState(false);
	const toggleNewPostModal = () => {
		setNewPostModalVisible(!isNewPostModalVisible);
	};

	const [posts, setPosts] = useState<any[]>([
		{ title: "Example First Title", content: "Example First Content" },
		{ title: "Example Second Title", content: "Example Second Content" },	
		{ title: "Example Third Title", content: "Example Third Content" },
		{ title: "Example Fifth Title", content: "Example Fifth Content" },
		{ title: "Example Sixth Title", content: "Example Sixth Content" }
	]);

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
						onClick={() => toggleNewPostModal()}
					>
						Submit
					</Button>
				]}
			>
				<NewPost></NewPost>
			</Modal>

			<Row>
				<Col span={6}>
					<Image
						src="https://i.pinimg.com/originals/63/e6/2f/63e62fd0f9f9fce533443f9640149728.png"
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
								defaultValue="Eeyli"
								style={{ width: 180 }}
								onChange={() => {}}
							>
								<Option value="EEyli">Eeyli</Option>
								<Option value="Alaula">Alaula</Option>
								<Option value="Camburleyli">Camburleyli</Option>
								<Option value="Capcup">Capcup</Option>
							</Select>
						</Col>
					</Row>
					<br></br>
					<br></br>
					<Row justify = "center">
						<Col>
							<PostListView></PostListView>
						</Col>
					</Row>
				</Col>

				<Col span={6}>
					<Image
						src="https://i.pinimg.com/originals/63/e6/2f/63e62fd0f9f9fce533443f9640149728.png"
						width={350}
					></Image>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
