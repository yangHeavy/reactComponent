import React from 'react';
import ReactDOM from "react-dom";
import './index.less'

function Dialog(props) {
    return ReactDOM.createPortal(//dialog的重点！！一定要把它挂载在根节点的这里挂在body节点之下，防止被用户定义的容器覆盖隐藏
                    <div style={{ visibility:props.visible ? 'visible' : 'hidden'}} className="dialog" onClick={props.onCancel}>
                        <div className="container" onClick={(e) => { e.stopPropagation() }}>
                            <div className="head">
                                <p id="title">{props.title}</p>
                                <span className="close">
                                    <svg onClick={props.onCancel}
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        width="1em"
                                        height="1em">
                                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                                        </path>
                                    </svg>
                                </span>

                            </div>
                            <hr />
                            <div style={{ marginLeft: '20px' }}>
                                {props.children}
                            </div>
                            <hr />
                            <div className="foot">
                                <button onClick={props.onCancel}>取消</button>
                                <button onClick={props.onOk}>确认</button>
                            </div>
                        </div>
                    </div>,document.body);
}

export default Dialog;
