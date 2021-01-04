import React, { useState, Component } from "react";
import { Row, Col, Upload, message, Button, Select, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import NewCommunity from "./NewCommunity";
const { Option } = Select;

const axios = require("axios").default;
const axiosInstance = axios.create({
	baseURL: "http://localhost:8000/api/",
	timeout: 1000,
	headers: { "X-Custom-Header": "foobar" }
});

const uploadProps = {
	name: "file",
	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	headers: {
		authorization: "authorization-text"
	},
	onChange(info: any) {
		if (info.file.status !== "uploading") {
			console.log(info.file, info.fileList);
		}

		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	}
};

const NewPost = () => {
	const [isNewCommunityModalVisible, setIsNewCommunityModalVisible] = useState(false);
	const toggleNewCommunityModal = () => setIsNewCommunityModalVisible(!isNewCommunityModalVisible);
	<Modal
	title="Create New Community"
	visible={isNewCommunityModalVisible}
	onCancel={() => toggleNewCommunityModal()}
	onOk={() => toggleNewCommunityModal()}
	closable
>
	<NewCommunity></NewCommunity>
</Modal>

		return (
			<div>
				<Row gutter = {[0, 24]}>
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
					<Col>
						<Button icon={<PlusCircleOutlined />}
						onClick = {() => toggleNewCommunityModal()}></Button>
					</Col>
				</Row>
				<Row gutter = {[0, 16]}>
					<Input placeholder = "Title"></Input>
				</Row>
				<Row gutter = {[0, 8]}>
				<TextArea placeholder = "Type something..."></TextArea>
				</Row>
				<Upload
					{...uploadProps}
					listType="picture"
					className="upload-list-inline"
					accept=".jpg, .png"
					beforeUpload={(file) => {
						const reader = new FileReader();
						reader.onload = (e) => {
							axiosInstance.post("/upload", {
								fileName: file.name,
								content: e.target?.result
							});
						};

						reader.readAsBinaryString(file);
						return false; //preventing upload
					}}
				>
					<Button icon={<UploadOutlined />}>Upload</Button>
				</Upload>
			</div>
		);
};

export default NewPost;
