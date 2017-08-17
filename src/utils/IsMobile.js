export default {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    Iphone: function() {
        return navigator.userAgent.match(/iPhone/i);
    },
    Ipad: function() {
        return navigator.userAgent.match(/iPad/i);
    },
    Ipod: function() {
        return navigator.userAgent.match(/iPod/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Mobile: function() {
        return (this.Android() || this.BlackBerry() || this.Iphone() || this.Opera() || this.Windows() || false);
    },
    Any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows() || false);
    }
};