const dom = {

  isDescendant(parent, child) {
    let node = child.parentNode;

    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }

    return false;
  },

  offset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  },

  createButton(label, bgcolor = 'rgb(66, 188, 233)') {
    let _button = document.createElement('input');
    _button.type = 'button';
    _button.value = label;
    _button.style.border = 'none';
    _button.style.borderRadius = '3px';
    _button.style.padding = '5px 15px';
    _button.style.fontFamily = '"Microsoft YaHei",arial,Georgia,Serif';
    _button.style.fontSize = '14px';
    _button.style.backgroundColor = bgcolor;
    return _button;
  },

  dialogBase(message, mode = 0) { // mode = 0: alert, 1: confirm
    let parentDiv = document.createElement('DIV');
    parentDiv.style.position = 'fixed';
    parentDiv.style.top = '0px';
    parentDiv.style.left = '0px';
    parentDiv.style.width = '100%';
    parentDiv.style.height = '100%';
    parentDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    let childDiv = document.createElement('DIV');
    childDiv.style.position = 'absolute';
    childDiv.style.top = '30px';
    childDiv.style.left = '0px';
    childDiv.style.right = '0px';
    childDiv.style.width = '50%';
    childDiv.style.margin = 'auto';
    childDiv.style.backgroundColor = 'rgba(255, 255, 255, 1)';

    let headerDiv = document.createElement('DIV');
    headerDiv.innerHTML = message;
    headerDiv.style.padding = '10px';
    headerDiv.style.fontFamily = '"Microsoft YaHei",arial,Georgia,Serif';
    childDiv.appendChild(headerDiv);

    let bodyDiv = document.createElement('div');
    bodyDiv.style.borderTop = '1px solid #cccccc';
    bodyDiv.style.paddingTop = '5px';
    childDiv.appendChild(bodyDiv);

    let buttonParent = document.createElement('div');
    buttonParent.style.padding = '5px';
    buttonParent.style.dispaly = 'in-line';
    buttonParent.style.float = 'right';
    let okButton = this.createButton('确定');
    if(mode === 1) okButton.style.marginRight = '5px';
    okButton.addEventListener('click', function(event) {
      document.body.removeChild(parentDiv);
    }, false);
    buttonParent.appendChild(okButton);

    let cancelButton;
    if(mode === 1) {
      cancelButton = this.createButton('取消', 'rgb(233, 66, 109)');
      cancelButton.addEventListener('click', function(event) {
        document.body.removeChild(parentDiv);
      }, false);
      buttonParent.appendChild(cancelButton);
    }
    bodyDiv.appendChild(buttonParent);

    parentDiv.appendChild(childDiv);

    document.body.appendChild(parentDiv);

    if(mode === 0) {
      return okButton;
    } else if(mode === 1) {
      return [okButton, cancelButton];
    } else {
      return null;
    }
  },

  alert(message, callback) {
    let okButton = this.dialogBase(message, 0);
    okButton.addEventListener('click', function(event) {
      if(callback) {
        callback();
      }
    }, false);
  },

  confirm(message, callback) {
    let buttons = this.dialogBase(message, 1);
    buttons[0].addEventListener('click', function(event) {
      if(callback) {
        callback(true);
      }
    }, false);
    buttons[1].addEventListener('click', function(event) {
      if(callback) {
        callback(false);
      }
    }, false);
  }

};

export default dom;