import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.less"
import Tip from "./Component/tips/tips";
import Tabs from "./Component/tabs/tabs";
import Dialog from "./Component/dialog/dialog";

const App = () => {
  const [visible, setvisible] = useState(false);

  const openDialog = () => {
    setvisible(true);
  }
  const handleCancel = () => {
    setvisible(false);
  }
  const handleOk = () => {
    setvisible(false);
  }
  const handleTab = (activeKey) => {
    console.log(activeKey)
  }
  
  return (<>
    <div style={{ margin: '30px' }}><h3>三组件</h3></div>
    {/*
    接口：
        title:气泡内容
        placement:四个方向，top,right,bottom,left
        默认边缘对齐
    */}
    <span>--------</span>
    <Tip title="我是气泡,快乐的气泡"><div>这里是自动气泡提示</div></Tip>
    <span>--------</span>
    <span>--------</span>
    <Tip title="我是气泡,快乐的气泡" placement="left"><div>这里是左气泡提示</div></Tip>
    <span>--------</span>
    <span>--------</span>
    <Tip title="我是气泡,快乐的气泡" placement="right"><div>这里是右气泡提示</div></Tip>
    <span>--------</span>
    <span>--------</span>
    <Tip title="我是气泡,快乐的气泡" placement="top"><div>这里是上气泡提示</div></Tip>
    <span>--------</span>
    <span>--------</span>
    <Tip title="我是气泡,快乐的气泡" placement="bottom"><div>这里是下气泡提示</div></Tip>
    <span>--------</span>
    <br />
    <br />
    {/*
    接口：
        defaultActiveKey:默认选择的标签key
        子组件：tab标签值，key
    */}
    <Tabs defaultActiveKey="1" tabPosition="top" onChange={handleTab}>
      <div tab="Tab 1" key="1">
        Content of Tab Pane 1
    </div>
      <div tab="Tab 2" key="2">
        Content of Tab Pane 2
    </div>
      <div tab="Tab 3" key="3">
        Content of Tab Pane 3
    </div>
    </Tabs>
    <br/>
    <Tabs defaultActiveKey="1" tabPosition="left">
      <div tab="Tab 1" key="1">
        Content of Tab Pane 1
    </div>
      <div tab="Tab 2" key="2">
        Content of Tab Pane 2
    </div>
      <div tab="Tab 3" key="3">
        Content of Tab Pane 3
    </div>
    </Tabs>

    <br />
    <button className="open" onClick={openDialog}>点这里来对话啦！</button>
    {/*
    接口：
      title 标题
      visible 是否可见
      onOk 确认按钮的点击监听事件
      onCancel 取消按钮的点击监听事件
      支持子组件
    */}

    <Dialog
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Dialog>
  </>)
};

ReactDOM.render(<App />, document.getElementById("root"));