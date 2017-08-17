/**
 * 打开文件
 * file     ［ file  控件 ］
 * onLoad   ［ 加载完成调用 ］
 */
export default (file, onLoad) => {
    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function() {
        if(onLoad) {
            onLoad(this.result);
        }
    };
};
