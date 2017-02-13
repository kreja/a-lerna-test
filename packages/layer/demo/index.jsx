
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import Layer from '@alife/blue-layer';

// 组件本身不引入样式，所以样式需要另外引入
// 如 @import '~@alife/blue-layer/lib/index';

/**
 * 支持从下方和从右方滑出，通过 direction 属性控制，fb || fr;
 * 从右方滑出没有下面的确认和取消按钮，取消可以通过右上方叉号控制
 * 从右方滑出时滑块宽高固定
 * */

class Demo extends Component {
    render() {

        return (
            <div>
              <Layer />
            </div>
        );
    }
};

ReactDOM.render(<Demo />
    , document.getElementById('container'));