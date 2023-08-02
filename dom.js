/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('removeAllBtn');
    element.addEventListener('click', function () {
        removeAll();
    });

    element = document.getElementById('removeSelBtn');
    element.addEventListener('click', function () {
        removeSel();
    });

    element = document.getElementById('addEleBtn');
    element.addEventListener('click', function () {
        addEle();
    });

    element = document.getElementById('addEleSel');
    element.addEventListener('change', function () {
        updateAddInputs();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function showNode(el) {
    let el2;
    el2 = document.getElementById('walkPrintArea');
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    el2.insertAdjacentHTML('beforeEnd',`\nNode type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n`);
}

function advWalk() {
    let el;
    let el2 = document.getElementById('advWalkPrintArea');
    let level = 0;
    el = document.getRootNode();
    advWalkRecurse(el, el2, level);
}

function advWalkRecurse(node, printNode, level) {
    let whitespaces = "";
    for(let i =0; i < level * 4; i++) {
        whitespaces += "&nbsp";
    }
    printNode.insertAdjacentHTML('beforeEnd',`${whitespaces}${node.nodeName}\n`);
    if(node.hasChildNodes()){
        node.childNodes.forEach(element => advWalkRecurse(element, printNode, level+1));
    }

}


function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() { 
    let h1 = document.querySelector("h1");
    h1.innerHTML = "DOM Manipulation is Fun!";

    let root = document.querySelector(":root");
    let rootStyle = getComputedStyle(root);
    h1.style.color = rootStyle.getPropertyValue("--darkcolor".concat(Math.ceil(Math.random()*6)));

    let pOne = document.getElementById("p1");
    if(pOne.classList.contains("schmancy")) {
        pOne.classList.remove("schmancy");
    }
    else
        pOne.classList.add("schmancy");
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function addEle() {
    let input1 = document.getElementById("addEle1");
    let addType = doucment.getElementById("addEleSel");
    let toMake;

    if(addType.value =="text") {

    }
    else if(addType.value =="comment"){

    }
    else {
        
    }
}
function updateAddInputs() {
    let el = document.getElementById("addEleSel");
    let el2 = document.getElementById("addEle2");
    if(el.value == "element")
        el2.hidden = false;
    else
        el2.hidden = true;

}


function remove() {
  document.body.removeChild(document.body.lastChild);
}
function removeAll() {
    let controlNode = document.getElementById("controls");
    let allElements = document.getElementsByTagName("*");
    for(let i = 0; i < allElements.length; i++) {
        if( !(controlNode.contains(allElements[i])) && !(allElements[i].contains(controlNode)) ) {
            allElements[i].remove();
        }

    }
}

function removeSel() {
    let removeField = document.getElementById("removeSelField");
    let toRemove = document.querySelectorAll(removeField.value);
    for(let i =0; i<toRemove.length; i++){
        toRemove[i].remove();
    }
}

window.addEventListener('DOMContentLoaded', init);