function insertAfter(newEl, targetEl) {
    var parentEl = targetEl.parentNode;

    if (parentEl.lastChild == targetEl) {
        parentEl.appendChild(newEl);
    } else {
        parentEl.insertBefore(newEl, targetEl.nextSibling);
    }
}

var addEventListener = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    } else {
        return function(element, event, handler) {
            element.attachEvent('on' + event, handler);
        }
    }
}());

function indexOf(element) {
    var child = element;
    var i = 0;
    while ((child = child.previousSibling) != null) {
        i++;
    }
    return i;
}

function opListFilter(val,opList){
  var val = val.toLowerCase();
  var s = opList.childNodes;
  for (var i = 0; i < s.length; i++) {
      var str = s[i].innerHTML;
      if (val==''||str.toLowerCase().indexOf(val) >= 0) {
          s[i].style.display = 'block';
      } else {
          s[i].style.display = 'none';
      }
  }
}

function Qselect(select, options) {
    this.dom = select;
    var opList = document.createElement('ul');
    opList.className = 'qselect-optionlist';
    opList.style.height = '200px';
    opList.style.overflowY = 'scroll';
    var list = select.getElementsByTagName('option');
    for (var i = 0; i < list.length; i++) {
        var li = document.createElement('li');
        li.className = 'qselect-option';
        li.innerHTML = list[i].innerHTML;
        opList.appendChild(li);
    }

    var container = document.createElement('div');
    container.className = 'qselect-container';
    var showbox = document.createElement('a');
    showbox.className = 'qselect-showbox';
    showbox.href = 'javascript:void(0)';
    showbox.style.placeholder='请选择';
    var search = document.createElement('input');
    search.className = 'qselect-search';
    var listContainer = document.createElement('div');
    listContainer.className = 'qselect-listcontainer';

    listContainer.appendChild(search);
    insertAfter(opList, search);
    // listContainer.appendChild(opList);
    container.appendChild(showbox);
    container.appendChild(listContainer);
    insertAfter(container, this.dom);
    this.dom.style['display'] = 'none';
    listContainer.style['display'] = 'none';

    var that = this;
    this.showbox = showbox;
    this.isOpen = false;
    this.isUse = true;

    showbox.onclick = function(e) {
      if(that.isUse){
        opListFilter('',opList);
        search.value='';
          if (!that.isOpen) {
              listContainer.style['display'] = 'block';
              that.isOpen = true;
          } else {
              listContainer.style['display'] = 'none';
              that.isOpen = false;
          }
          e.stopPropagation();
      }else{
        return;
      }
    }

    addEventListener(document, "click", function(e) {
        if (e.target != search) {
            listContainer.style['display'] = 'none';
            that.isOpen = false;
        } else {
            listContainer.style['display'] = 'block';
            that.isOpen = true;
        }

    });

    addEventListener(opList, "click", function(e) {
        var selected = e.target.innerHTML;
        showbox.innerHTML = selected;
        listContainer.style['display'] = 'none';
        that.isOpen = false;
        var order = indexOf(e.target);
        that.dom.selectedIndex = order;
        e.stopPropagation();
    });

    addEventListener(search, "keyup", function() {
        var val = search.value.toLowerCase();
        opListFilter(val,opList);
    })

}

Qselect.prototype.enable = function(){
  this.isUse = true;
  this.showbox.style['background-color']='#fff';
  this.showbox.style['cursor']='pointer';
}

Qselect.prototype.disable = function() {
  this.isUse = false;
  this.showbox.style['background-color'] = '#ccc';
  this.showbox.style['cursor']='default';
}
