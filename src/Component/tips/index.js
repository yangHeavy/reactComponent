import React from "react";
import ReactDOM from "react-dom";
import './index.less';
import debounce from "lodash/debounce";


let arrowLeft = '0px';
class Tip extends React.Component {
    constructor() {
        super();
        this.state = {
            flag: false,
            sendTop: '0px',
            sendLeft: '0px',
            direction: '',
        }
    }
    componentDidMount() {
        // TODO ：变量储存与气泡挂载根节点绝对定位
        //自动计算位置。此时为绝对定位
        if(this.props.placement)this.setState({ direction:this.props.placement });
        let sendWidth, sendHeight, tipHeight;
        sendWidth = this.send.clientWidth;
        sendHeight = this.send.clientHeight;
        arrowLeft = sendWidth - 1 +'px';
        const setSend = () => {
            tipHeight = this.tip.clientHeight;
            const { left, top, right } = this.tip.getBoundingClientRect();//获取元素绝对位置
            switch (this.props.placement) {
                case 'top':
                    this.setState({
                        sendLeft: left + 'px',
                        sendTop: top-48 + 'px',
                    })
                    break;
                case 'right':
                    this.setState({
                        sendLeft: right + 8 + 'px',
                        sendTop: top + 'px',
                    })
                    break;
                case 'bottom':
                    this.setState({
                        sendLeft: left + 'px',
                        sendTop: top + tipHeight + 8 + 'px',
                    })
                    break;
                case 'left':
                    this.setState({
                        sendLeft: left - sendWidth - 8 + 'px',
                        sendTop: top + 'px',
                    })
                    break;
                default:
                    // 不指定时自动计算
                    // 由于气泡是单行文本，上下方向的百分比占比会小很多，基本上气泡就只会是上下
                    if(( sendHeight + 8 ) < top) //上方够空间放置
                    {
                        
                        this.setState({
                            sendLeft: left+'px',
                            sendTop: top-48+'px',
                            direction: 'top',
                        })
                    }
                    else{
                        this.setState({
                            sendLeft: left + 'px',
                            sendTop: top + tipHeight + 8 + 'px',
                            direction: 'bottom',
                        })
                    }
                    break;
            }
        }
        setSend();
        window.addEventListener('resize', debounce(setSend));
    }
    render() {
        return (
            <>
                {
                    ReactDOM.createPortal(
                        <div style={{ position: 'relative', visibility: this.state.flag ? 'visible' : 'hidden' }}>
                            <div ref={(e) => { this.send = e }}
                                className='send'
                                style={{
                                    top: this.state.sendTop,
                                    left: this.state.sendLeft,
                                    filter: this.state.direction == 'left' ?
                                        'drop-shadow(-10px 0px 10px  rgba(238, 125, 55,0.5))'
                                        : 'drop-shadow(10px 0px 10px  rgba(238, 125, 55,0.5))'
                                }}>
                                {this.props.title}
                                <div className={`arrow ${this.state.direction}-arrow`} 
                                    style={{left:this.state.direction=='left'?arrowLeft:(this.state.direction=='right'?'-16px':'20px')}}
                                />
                            </div>
                        </div>
                        ,document.body)
                }
                <div
                    ref={(e) => { this.tip = e }}
                    onMouseOver={() => { this.setState({ flag: true }) }}
                    onMouseLeave={() => { this.setState({ flag: false }) }}
                    style={{ display: 'inline-block' }}
                >
                    {this.props.children}
                </div>
            </>)
    }
};

export default Tip;