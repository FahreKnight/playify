import { Button, Col, Input, Row } from "antd";
import Search from "antd/lib/input/Search";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import SignUp from "./registration/signup";


const Dashboard = () => {

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

    const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);
    const toggleSignUpModal = () => setIsSignUpModalVisible(!isSignUpModalVisible);

    return (
        <div>
            <Modal
                title = 'Ben loginim'
                visible = {isLoginModalVisible}
                onCancel = {() => toggleLoginModal()}
                onOk = {() => toggleLoginModal()}
                closable
            >HERE</Modal>
            <Modal
                title = 'ben signupum'
                visible = {isSignUpModalVisible}
                onCancel = {() => toggleSignUpModal()}
                onOk = {() => toggleSignUpModal()}
                closable
            >
                <SignUp />
            </Modal>
            <Row>
                <Col>
                    <Search placeholder = 'Enter text to search' onSearch={() => {}}/>
                </Col>
                <Col>
                    <Button onClick={() => toggleSignUpModal()}>SingUp</Button>
                </Col>
                <Col>
                    <Button onClick={() => toggleLoginModal()}>Login</Button>
                </Col>
            </Row>
        </div>
    );
}


export default Dashboard;