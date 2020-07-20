import React, { useState } from 'react';
import './tabs.less'

function Tabs(props) {
    const [key, setKey] = useState(props.defaultActiveKey);// 默认"1"
    const buttoChang = (e) => {
        if(key!=e.target.name)
        {
            setKey(e.target.name) // 用name属性，绑定了传入得唯一key！！每次点击时更新key从而更改下方的内容
            if(props.onChange)props.onChange(e.target.name); //回调，传入当前选中key
        }
    }
    return (
        <div style={{ display: props.tabPosition=='top'?'block':'flex'}}>
            <div style={{ display: props.tabPosition=='top'?'flex':'inline-block' ,
            borderBottom:props.tabPosition=='top'?'solid 1px':'',
            borderRight:props.tabPosition=='left'?'solid 1px':''}}>
                {
                    props.children.map(element => {
                        return <button
                            style={{display:'block'}}
                            className={key != element.key ? "myButton" : "myButton myButton-active"}
                            key={element.key} name={element.key}
                            onClick={buttoChang}>{element.props.tab}
                        </button>
                    })
                }
            </div>
            {
                props.children.map((item) => {
                    return (
                        <div key={ item.key } style={{ position: key == item.key ? 'relative' : 'absolute', 
                        visibility: key == item.key ? 'visible' : 'hidden',
                        margin:'10px' }}>
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Tabs;