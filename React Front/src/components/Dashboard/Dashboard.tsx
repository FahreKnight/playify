import { Row, Col, Form, Modal, Select } from "antd";
import React, { Component, useEffect, useState } from "react";
import ReactDom from "react-dom";
import Navi from "./Navi";
import { Upload, message, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import NewPost from "../Posting/NewPost";
import { PostView } from "../View/PostView";
import PostListView from "../View/PostListView";
import CommentView from "../View/CommentView";

const { Option } = Select;

const Dashboard = () => {
	const [isNewPostModalVisible, setNewPostModalVisible] = useState(false);
	const toggleNewPostModal = () => {
		setNewPostModalVisible(!isNewPostModalVisible);
	};
	useEffect(() => {}, [isNewPostModalVisible]);

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
						src="https://i.pinimg.com/originals"
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
								defaultValue="Başlık"
								style={{ width: 180 }}
								onChange={() => {}}
							>
								<Option value="Birinci">Eeyli</Option>
								<Option value="İkinci">Alaula</Option>
								<Option value="Üçüncü">Camburleyli</Option>
								<Option value="Dördüncü">Capcup</Option>
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
						src="https://i.pinimg.com/originals"
						width={350}
					></Image>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
