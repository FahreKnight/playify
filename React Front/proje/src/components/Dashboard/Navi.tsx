import { Button, Col, Input, Row } from "antd";
import Search from "antd/lib/input/Search";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { UserOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from "../../types/types/user";

const Navi = (props: any) => {
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
	const [userName, setUserName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [email, setEmailAddress] = useState<string>("");
	const [validationPassword, setValidationPassword] = useState<string>("");
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [loggedUser, setLoggedUser] = useState<any>({});

	const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);
	const toggleSignUpModal = () => setIsSignUpModalVisible(!isSignUpModalVisible);

	const signUp = () => {
		const model = {username: userName, password: password, email: email};
		props.dispatch({type: 'REGISTER', data: model})
		setLoggedUser(model)
		clear()
	}

	const logout = () => {
		props.dispatch({type: 'LOGOUT'});
		setLoggedUser({})
		clear()
		toast.success('Logged Out')
	}

	const login = () => {
		const model = {username: userName, password: password}
		props.dispatch({type: 'LOGIN', data: model})
		setLoggedUser(model)
	}

	const clear = () => {
		setUserName('');
		setPassword('');
		setValidationPassword('');
		setPasswordVisible(false);
		setEmailAddress('')
	}

	return (
		<div>
			<ToastContainer />
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
								onClick={() => {
									if(props.users.filter((user: User) => user.username === userName && user.password === password).length !== 0){
										login()
										toggleLoginModal()
										toast.success('Logged In')
									}
									else{
										toast.error('Username or Password is invalid')
									}
								}}
							>Login</Button>,
						
					]
				}
			>
			<div>
				<Col>
					<Row>
						<Input prefix = {<UserOutlined/>} placeholder = "Username" value={userName} onChange={(e: any) => setUserName(e.target.value)}/>
					</Row>
					<br />
					<Row>
						<Input.Password placeholder = "Password" value={password} onChange={(e: any) => setPassword(e.target.value)}/> 
					</Row>
					<br />
				</Col>        
			</div>
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
								onClick={() => {
									if(password === validationPassword){
										if(props.users.length === 0 || props.users?.filter((user: any) => user.username === userName) === []){
											signUp();
											toggleSignUpModal()
											toast.success('Signed Up')
											toast.success('Logged In')
										}
										else{
											toast.error('User Exists')
										}
									}
									else{
										toast.error('Please Check Your Passwords')
									}
								
								}}
							>Sign Up</Button>,
						
					]
				}
			>
				<div>
					<Col>
						<Row>
							<Input
								prefix={<UserOutlined />}
								placeholder="Username"
								value={userName}
								onChange={(e: any) => setUserName(e.target.value ?? "")}
							/>
						</Row>
						<br />
						<Row>
							<Input
								prefix={<MailOutlined />}
								placeholder="E-mail"
								value={email}
								onChange={(e: any) =>
									setEmailAddress(e.target.value ?? "")
								}
							/>
						</Row>
						<br />
						<Row>
							<Input.Password
								placeholder="Password"
								value={password}
								onChange={(e: any) => setPassword(e.target.value ?? "")}
								iconRender={() =>
									passwordVisible ? <EyeTwoTone onClick = {() => {setPasswordVisible(!passwordVisible)}}/> : <EyeInvisibleOutlined />
								}
							/>
						</Row>
						<br />
						<Row>
							<Input.Password
								placeholder="Retype Password"
								visibilityToggle={false}
								value={validationPassword}
								onChange={(e: any) =>
									setValidationPassword(e.target.value ?? "")
								}
								iconRender={() =>
									passwordVisible ? <EyeTwoTone onClick = {() => {setPasswordVisible(!passwordVisible)}}/> : <EyeInvisibleOutlined />
								}
							/>
						</Row>
					</Col>
				</div>
			</Modal>
			<Row gutter = {5}>
				<Col style = {{display:"flex"}}>
					<Search style = {{margin:"auto"}}
						placeholder="Enter text to search"
						onSearch={() => {}}
					/>
				</Col>
				<Col  style = {{display:"flex", alignSelf:"end"}}>
					{!loggedUser?.username && <Button style = {{margin:"auto"}} onClick={() => toggleSignUpModal()}>SingUp</Button>}
					{!loggedUser?.username ? <Button style = {{margin:"auto"}} onClick={() => toggleLoginModal()}>Login</Button> : <Button style = {{margin:"auto"}} onClick={() => logout()}>Logout</Button>}
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	loggedUser: state.loggedUser,
	users: state.users
})

export default connect(mapStateToProps)(Navi);
