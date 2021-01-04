import { Button, Col, Input, Row } from "antd";
import Search from "antd/lib/input/Search";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import SignUp from "../registration/signup";
import Login from "../registration/login";

const Navi = () => {
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

	const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);
	const toggleSignUpModal = () =>
		setIsSignUpModalVisible(!isSignUpModalVisible);

	return (
		<div>
			<Modal
				title="Login"
				visible={isLoginModalVisible}
				onCancel={() => toggleLoginModal()}
				onOk={() => toggleLoginModal()}
				closable
				footer={
					[
						<Button
							key="back"
							onClick={() => toggleLoginModal()}
						>Cancel</Button>,
							<Button
								key="submit"
								type="primary"
								onClick={() => toggleLoginModal()}
							>Login</Button>,
						
					]
				}
			>
				<Login />
			</Modal>
			<Modal
				title="Login"
				visible={isLoginModalVisible}
				onCancel={() => toggleLoginModal()}
				onOk={() => toggleLoginModal()}
				closable
				footer={
					[
						<Button
							key="back"
							onClick={() => toggleLoginModal()}
						>Cancel</Button>,
							<Button
								key="submit"
								type="primary"
								onClick={() => toggleLoginModal()}
							>Login</Button>,
						
					]
				}
			>
				<Login />
			</Modal>
			<Modal
				title="Sign Up"
				visible={isSignUpModalVisible}
				onCancel={() => toggleSignUpModal()}
				onOk={() => toggleSignUpModal()}
                closable
                footer={
					[
						<Button
							key="back"
							onClick={() => toggleSignUpModal()}
						>Cancel</Button>,
							<Button
								key="submit"
								type="primary"
								onClick={() => toggleSignUpModal()}
							>Sign Up</Button>,
						
					]
				}
			>
				<SignUp />
			</Modal>
			<Row gutter = {5}>
				<Col style = {{display:"flex"}}>
					<Search style = {{margin:"auto"}}
						placeholder="Enter text to search"
						onSearch={() => {}}
					/>
				</Col>
				<Col  style = {{display:"flex", alignSelf:"end"}}>
					<Button style = {{margin:"auto"}} onClick={() => toggleSignUpModal()}>SingUp</Button>
					<Button style = {{margin:"auto"}} onClick={() => toggleLoginModal()}>Login</Button>
				</Col>
			</Row>
		</div>
	);
};

export default Navi;
