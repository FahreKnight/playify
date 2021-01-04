import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { UserOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const SignUp = () => {
	const [userName, setUserName] = useState<string>("");
	const [email, setEmailAddress] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [validationPassword, setValidationPassword] = useState<string>("");
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	return (
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
	);
};

export default SignUp;
