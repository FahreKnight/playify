import { Col, Input, Row } from "antd";
import React, { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import Checkbox from "antd/lib/checkbox/Checkbox";



const Login = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPasssword] = useState<string>('');

    return (
        <div>
            <Col>
                <Row>
                    <Input prefix = {<UserOutlined/>} placeholder = "Username" value={userName} onChange={(e: any) => setUserName(e.target.value)}/>
                </Row>
                <br />
                <Row>
                    <Input.Password placeholder = "Password" value={password} onChange={(e: any) => setPasssword(e.target.value)}/> 
                </Row>
                <br />
                <Checkbox> Keep me logged in</Checkbox>
            </Col>        
        </div>
    );
}

export default Login;