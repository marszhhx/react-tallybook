import {Outlet} from "react-router-dom";
import {Button} from 'antd-mobile'

const Layout = () => {
    return (
        <div>
            我是Layout
            <Outlet/>
            <Button color='primary'>测试全局</Button>
            <div className='purple'>
                <Button color='primary'>测试局部</Button>
            </div>
        </div>
    )
}

export default Layout
