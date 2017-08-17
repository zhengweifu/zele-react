/**
 * [getTextSize description]
 * @param  {[type]} text    [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export default (text, options) => {
  options = options || {};
  options.font = options.font || 'Times';
  options.fontSize = options.fontSize || '16pt';
  options.fontWeight = options.fontWeight || 'normal';
  options.space = options.space || 0;

  if(!window.FUN_CANVAS_CONTEXT) {
    var _canvas = document.createElement('canvas');
    window.FUN_CANVAS_CONTEXT = _canvas.getContext('2d');
  }

  window.FUN_CANVAS_CONTEXT.font = options.fontSize + ' ' + options.font + ' ' + options.fontWeight;

  let width = 0;
  for(let each of text) {
    width += window.FUN_CANVAS_CONTEXT.measureText(each).width;
  }
  width += (text.length - 1) * options.space;

  return width;
};
