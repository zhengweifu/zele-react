export const SCREEN_SIZE = {
	xs: 480,
	sm: 768,
	md: 992,
	lg: 1200,
};

/**
 * 获取屏幕的尺寸
 * @return {json} 屏幕的尺寸
 */
export const GetScreenSize = () => {
	return {
		width: screen.width,
		height: screen.height
	};
};

/**
 * 获取文档的尺寸
 * @return {json} 文档的尺寸
 */
export const GetDocumentSize = () => {
	return {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	};
};

export const GetElementHeight = (el) => {
    let elStyle      = window.getComputedStyle(el),
        elDisplay    = elStyle.display,
        elPosition   = elStyle.position,
        elVisibility = elStyle.visibility,
        elMaxHeight = elStyle.maxHeight.replace('px', '').replace('%', ''),

        wantedHeight = 0;

    if(elDisplay !== 'none' && elMaxHeight !== '0') {
        return el.offsetHeight;
    }

    el.style.position   = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display    = 'block';

    wantedHeight     = el.offsetHeight;

    el.style.display    = elDisplay;
    el.style.position   = elPosition;
    el.style.visibility = elVisibility;

    return wantedHeight;
};

export const Animate = (element, props, time, callback) => {
    const start = new Date().getTime();
    let tempProps = {};
    for(let p in props) {
        props[p] = parseFloat(props[p].replace('px').replace('%'));
        let cValue = parseFloat(element.style[p].replace('px').replace('%'));
        tempProps[p] = {
            value: cValue,
            interval: props[p] - cValue,
            unit: ''
        };
        if(element.style[p].match('%')) {
           tempProps[p]['unit'] = '%';
        } else if(element.style[p].match('px')) {
            tempProps[p]['unit'] = 'px';
        }
    }
    const timer = setInterval(() => {
        const step = Math.min(1,(new Date().getTime() - start) / time);
        for(let prop in props) {
            if(tempProps[prop].unit !== '') {
                element.style[prop] = paseInt(tempProps[prop].value + step * tempProps[prop].interval) + tempProps[prop].unit;
            } else {
                element.style[prop] = tempProps[prop].value + step * tempProps[prop].interval;
            }
        }
        if(step == 1) {
            clearInterval(timer);
        }
    }, 25);

    if (typeof callback === 'function') {
        setTimeout(callback, time);
    }
};

//笛卡儿积组合
export const Descartes = (list) => {
  //parent上一级索引;count指针计数
  let point = {};
  let result = [];
  let pIndex = null;
  let tempCount = 0;
  let temp  = [];
  //根据参数列生成指针对象
  for(let index in list) {
    if(typeof list[index] == 'object') {
      point[index] = {'parent':pIndex,'count':0};
      pIndex = index;
    }
  }
  //单维度数据结构直接返回
  if(pIndex == null) {
    return list;
  }
  //动态生成笛卡尔积
  while(true) {
    for(let index in list) {
      tempCount = point[index]['count'];
      temp.push(list[index][tempCount]);
    }
    //压入结果数组
    result.push(temp);
    temp = [];
    //检查指针最大值问题
    while(true) {
      if(point[index]['count'] + 1 >= list[index].length) {
        point[index]['count'] = 0;
        pIndex = point[index]['parent'];
        if(pIndex == null) {
          return result;
        }
        //赋值parent进行再次检查
        index = pIndex;
      } else {
        point[index]['count']++;
        break;
      }
    }
  }
};