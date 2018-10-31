import React, { Component } from 'react'
import { Modal, Button } from 'antd';

class Code extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [{},{}],
      text: [],
      successKeys: []//成功的key
    }
    this.config = {
      fontSize: 18,//px
      num: 6,
      width: 600,
      height: 300
    }
    this.textIndex = [];//存放文字下标，不重复
    this.fontPosition = [];//字体和定位坐标的一个集合
    this.pointerX = []; //一个不会重复文字的x坐标
    this.pointerY = []; //一个不会重复文字的Y坐标
  }

  onClose() {

  }

  componentDidMount() {
    this.initCanvas();
  }
  //初始化
  initCanvas() {
    this.canvas = document.getElementById('code-canvas');
    this.ctx = this.canvas.getContext("2d");
    let num = this.config.num;
    //生成两个随机坐标
    let pointer = this.randomPointer(num);
    //生成两个随机字符
    let text = this.randomText(num);
    //渲染字符
    this.renderTextCanvas(text, pointer);
  }

  //随机num个文字
  randomText(num) {
    let text = ['我', '是', '线', '宝', '还','你','他','尼'];
    let arr = [];
    for(let i = 0; i< num; i++) {
      arr[i] = text[this.randomTextArray(text)];
    }

    return arr;
  }

  //生成不重复的文字下标
  randomTextArray(text) {
    let num = null;
    let indexFunc = () => {
      num = parseInt(Math.random() * text.length);
      //第一次直接放入数组
      if(!this.textIndex.length) {
        this.textIndex.push(num);
      } else {
        this.textIndex.forEach((item, index) => {
          if(item == num) {
            indexFunc();
          } else {
            this.textIndex.push(num);
          }

        });
      }
    }
    indexFunc();
    return num;

  }

  //生成随机坐标
  randomPointer(num) {
    let width = Number(this.canvas.getAttribute('width'));
    let height = Number(this.canvas.getAttribute('height'));
    let one = {};
    let second = {};
    let fontSize = this.config.fontSize;  
    let arr = [];
    let a = null;
    for(let i = 0; i< num; i++) {
      arr.push({
        x: this.computedRandomPointer(width, 'x'),
        y: this.computedRandomPointer(height, 'y'),
      })
    }
    
    return arr;
  }

  //计算出不超过边界的坐标和不会相互覆盖的文字
  computedRandomPointer(extent, type) {
    //extent 长度
    let pointerArr = this.pointerX;
    if(type === 'x') {
      pointerArr = this.pointerX;
    } else {
      pointerArr = this.pointerY;
    }
    let pointer = null;
    let pointerFunc = () => {
      pointer = parseInt(Math.random() * (extent - this.config.fontSize * 2) + this.config.fontSize);

      if(!pointerArr.length) {
        pointerArr.push(pointer);
      } else {
        pointerArr.forEach((item, index) => {
          if(type == 'x') {
            if(item < pointer && item + this.config.fontSize * 2 > pointer && item !== pointer) {
              pointerFunc();
            } else {
              pointerArr.push(pointer);
            }
          } else {
            if(item < pointer && item - this.config.fontSize * 2 > pointer && item !== pointer) {
              pointerFunc();
            } else {
              pointerArr.push(pointer);
            }
          }

        })
      }
    }
    pointerFunc();
    return pointer;
 
  }

  //渲染canvas
  renderTextCanvas(text, pointer) {
    text.forEach((item, index) => {
      let x = pointer[index].x;
      let y = pointer[index].y;
      this.fontPosition.push({
        text: item,
        pointer: {
          x,
          y
        }
      })
      this.ctx.font = `${this.config.fontSize}px Arial`;
      this.ctx.fillText(item, x, y, this.config.fontSize);
    });
    let textArr = [];//存放点选文字
    for(let i = 0; i < this.config.num / 2 ; i++) {
      textArr.push(this.fontPosition[i].text)
    }

    this.setState({ text: textArr });
  }

  // 清空canvas画布
  clearCanvas() {
    this.textIndex = [];
    this.fontPosition = [];
    this.pointerX = [];
    this.pointerY = [];
    this.setState({successKeys: []});
    this.ctx.clearRect(0, 0, this.config.width, this.config.height);
  }

  getMousePos(event) {
    let e = event || window.event;
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    let x = e.pageX || e.clientX + scrollX;
    let y = e.pageY || e.clientY + scrollY;
    x = x - e.target.offsetLeft;
    y = y - e.target.offsetTop;
    return { 'x': x, 'y': y };
  }

  onClick() {
    this.clearCanvas();
    this.initCanvas();
  }

  onClickCanvas(evt) {
    evt = evt || event;
    let obj = this.getMousePos(evt);
    let text = this.state.text;
    let successArr = [];
    let isSucessX = false;
    let isSucessY = false;
    let clickArr = this.fontPosition.filter((item, index) => {
      if(text[index]) {
        return item.text == text[index]
      }
    });
    clickArr.forEach((item, index) => {
      //x轴判断
      if(item.pointer.x <= obj.x && item.pointer.x + 18 > obj.x) {
        isSucessX = true;
      } else {
        isSucessX = false;
      }
      // console.log(item.y, obj.y)
      if(item.pointer.y - 18 <= obj.y && item.pointer.y > obj.y) {
        isSucessY = true;
      } else {
        isSucessY = false;
      }
      successArr.push({ isSucessX, isSucessY, key: item.text });
    });
    let successKeys = this.state.successKeys;
    successArr.forEach((item, index) => {
      if(item.isSucessX && item.isSucessY) {
        successKeys.push(item.key);
      }
    });
    this.setState({ successKeys },() => {
      this.submitSuccess();
    });

  }

  //确认是否成功
  submitSuccess() {
    let text = this.state.text;
    let successKeys = this.state.successKeys;
    let isSuccess = false;
    let arr = [...new Set(successKeys)];
    if(arr.length == this.config.num / 2) {
      isSuccess = true;
    }

    if(isSuccess) {
      alert('成功');
      this.clearCanvas();
      this.initCanvas();
    }
  }

  render() {
    return (
      <div style={{border: '1px solid #ddd', width: 300, height: 150}}>
        请点击{this.state.text[0]} {this.state.text[1]} {this.state.text[2]}
        <canvas style={{border: '1px solid red'}} onClick={this.onClickCanvas.bind(this)} width={this.config.width} height={this.config.height} id='code-canvas'>

        </canvas>
        <Button onClick={this.onClick.bind(this)} type='primary'>点击刷新图片</Button>
      </div>

    )
  }
}

export default Code;