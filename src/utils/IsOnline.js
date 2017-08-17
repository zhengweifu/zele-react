/**
 * 检测当前网络是否连接
 * @return {bool} 当返回true时表示网络已连接，反之没有连接。
 */
export default () => { 
	if(window.navigator.onLine === undefined) {
		const xhr = new (window.ActiveXObject || XMLHttpRequest)('Microsoft.XMLHTTP');
		xhr.open('HEAD', '//' + window.location.hostname + '/?rand=' + Math.floor((1 + Math.random()) * 0x10000), false);
		try {
			xhr.send();
			return (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304));
		} catch (error) {
			return false;
		}
	} else {
		return window.navigator.onLine;
	}
};