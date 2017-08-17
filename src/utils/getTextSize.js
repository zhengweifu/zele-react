export default (text, options) => {
  let FUN_CANVAS_CONTEXT = window.window.FUN_MEASURE_DIV;

	options = options || {};
    options.font = options.font || 'Times';
    options.fontSize = options.fontSize || '16pt';
    options.fontWeight = options.fontWeight || 'normal';

	var result = {w: 0, h: 0};


  if(!FUN_CANVAS_CONTEXT) {
    var _canvas = document.createElement('canvas');
    FUN_CANVAS_CONTEXT = _canvas.getContext('2d');
  }

  if(FUN_CANVAS_CONTEXT) {
    FUN_CANVAS_CONTEXT.font = options.fontSize + ' ' + options.font + ' ' + options.fontWeight;
    result.w = FUN_CANVAS_CONTEXT.measureText(text).width;
  }

  return result;
};
