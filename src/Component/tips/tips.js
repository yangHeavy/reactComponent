import React from "react";
import './tips.less';
import debounce from "lodash/debounce";

class Tip extends React.Component {
    constructor() {
        super();
        this.state = {
            flag: false,
            arrowTop: '0px',
            arrowLeft: '0px',
            arrow: '',
            sendTop: '0px',
            sendLeft: '0px'
        }
    }
    componentDidMount() {
        //自动计算位置。此时为绝对定位
        let x1, x2, y1, y2, mywidth, myheight;
        const setSend = () => {
            mywidth = this.send.clientWidth;
            myheight = this.send.clientHeight;
            const { left, top, right, bottom } = this.tip.getBoundingClientRect();//获取元素绝对位置
            const { clientWidth, clientHeight } = document.documentElement;
            switch (this.props.placement) {
                case 'top':
                    this.setState({
                        arrowTop: '40px',//padding+字体算出来的，适应性有待验证
                        arrowLeft: '20px',
                        sendTop: '-50px',
                        arrow: '#F8C301 rgba(255,255,255,0) rgba(255,255,255,0) rgba(255,255,255,0)'
                    })
                    break;
                case 'right':
                    this.setState({
                        arrowTop: '5px',
                        arrowLeft: '-16px',
                        sendLeft: this.tip.clientWidth + 8 + 'px',
                        sendTop:myheight>this.tip.clientHeight?'0px':(this.tip.clientHeight-myheight)/2+'px',
                        arrow: 'rgba(255,255,255,0) #F8C301 rgba(255,255,255,0) rgba(255,255,255,0)'
                    })
                    break;
                case 'bottom':
                    this.setState({
                        arrowTop: '-16px',
                        arrowLeft: '20px',
                        sendTop: 8 + this.tip.clientHeight + 'px',
                        arrow: 'rgba(255,255,255,0) rgba(255,255,255,0) #F8C301 rgba(255,255,255,0)'
                    })
                    break;
                case 'left':
                    this.setState({
                        arrowTop: '5px',
                        arrow: 'rgba(255,255,255,0) rgba(255,255,255,0) rgba(255,255,255,0) #F8C301',
                        sendLeft: -this.send.clientWidth - 8 + 'px',
                        sendTop:myheight>this.tip.clientHeight?'0px':(this.tip.clientHeight-myheight)/2+'px',
                        arrowLeft: this.send.clientWidth - 1 + 'px'
                    })
                    break;
                default:
                    // 不指定时自动计算
                    
                    //this.send.parentElement.style.position='absolute';
                    
                    // 计算四个方向的百分比
                    // 由于气泡是单行文本，上下方向的百分比占比会小很多，基本上气泡就只会是上下
                    // console.log(clientWidth + ' ' + right)
                    x1 = (mywidth + 8) / left;
                    y1 = (myheight + 8) / top;
                    x2 = clientWidth - right>0?(mywidth + 8) / (clientWidth - right):Infinity;
                    y2 = clientHeight - bottom>0?(myheight + 8) / (clientHeight - bottom):Infinity;
                    const array = [x1, y1, x2, y2]
                    console.log(array);
                    let m = 0, min = x1;
                    array.forEach((item, index) => {
                        if (item < min) {
                            min = item;
                            m = index;
                        }
                    })
                    switch (m) {
                        case 0: //左
                            this.setState({
                                arrowTop: '5px',
                                arrow: 'rgba(255,255,255,0) rgba(255,255,255,0) rgba(255,255,255,0) #F8C301',
                                sendTop:myheight>this.tip.clientHeight?'0px':(this.tip.clientHeight-myheight)/2+'px',
                                sendLeft: -mywidth - 8 + 'px',
                                arrowLeft: mywidth + 'px'
                            })
                            break;
                        case 1: //上
                            this.setState({
                                arrowTop: '40px',//padding+字体算出来的，适应性有待验证
                                arrowLeft: '20px',
                                sendTop: '-50px',
                                sendLeft:'0px',
                                arrow: '#F8C301 rgba(255,255,255,0) rgba(255,255,255,0) rgba(255,255,255,0)'
                            })
                            break;
                        case 2: //右
                            this.setState({
                                arrowTop: '5px',
                                arrowLeft: '-16px',
                                sendLeft: this.tip.clientWidth + 8 + 'px',
                                sendTop:myheight>this.tip.clientHeight?'0px':(this.tip.clientHeight-myheight)/2+'px',
                                arrow: 'rgba(255,255,255,0) #F8C301 rgba(255,255,255,0) rgba(255,255,255,0)'
                            })
                            break;
                        case 3: //下
                            this.setState({
                                arrowTop: '-16px',
                                arrowLeft: '20px',
                                sendTop: 8 + this.tip.clientHeight + 'px',
                                sendLeft:'0px',
                                arrow: 'rgba(255,255,255,0) rgba(255,255,255,0) #F8C301 rgba(255,255,255,0)'
                            })
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
        setSend();
        window.addEventListener('resize', debounce(setSend));
    }
    render() {
        return (
            <div
                ref={(e) => { this.tip = e }}
                onMouseOver={() => { this.setState({ flag: true }) }}
                onMouseLeave={() => { this.setState({ flag: false }) }}
                style={{ display: 'inline-block' }}
            >
                <div style={{ position: 'relative', visibility: this.state.flag ? 'visible' : 'hidden' }}>
                    <div ref={(e) => { this.send = e }}
                        className='send'
                        style={{
                            top: this.state.sendTop,
                            left: this.state.sendLeft,
                            filter: this.props.placement == 'left' ?
                                'drop-shadow(-10px 0px 10px  rgba(238, 125, 55,0.5))'
                                : 'drop-shadow(10px 0px 10px  rgba(238, 125, 55,0.5))'
                        }}>
                        {this.props.title}
                        <div className='arrow'
                            style={{ top: this.state.arrowTop, left: this.state.arrowLeft, borderColor: this.state.arrow }} />
                    </div>
                </div>
                {this.props.children}
            </div>)
    }
};

export default Tip;