import React from "react"
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getLogin} from "../../Redux/selectors/auth-selector";
import {logout} from "../../Redux/Reducers/auth-reducer";


const Header: React.FC = () => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }

    const {Header} = Layout
    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Users</Link></Menu.Item>
                    </Menu>
                </Col>
                    {isAuth
                        ? <>
                            <Col span={2}>
                                {login}
                                <Avatar size={30} style={{backgroundColor: "blue", color: "white"}}
                                        icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={4}>
                                <Button onClick={logoutCallBack}>logout</Button>
                            </Col>
                        </>
                        :
                        <Col span={6}>
                            <Button>
                                <Link to={'/login'}>Login</Link>
                            </Button>
                        </Col>
                    }
            </Row>
        </Header>
        // <>
        // <div className={s.Header}>
        //     <a href="#s">Home</a>
        //     <a href="#s">News Feed</a>
        //     <a href="#s">Messages</a>
        // </div>
        //     <div className={s.loginBlock}>
        //         {this.props.isAuth
        //             ? <div>{this.props.login} <button onClick={this.props.logout}>logout</button></div>
        //             : <NavLink to={'/login'}>
        //             Login
        //         </NavLink>
        //         }
        //
        //     </div>
        // </>
    )
};

export default Header;