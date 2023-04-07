// Define variables
let cx;
let cy;
let C = document.getElementById("cw");

// Create grid of rectangles and text
for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 15; j++) {
    let rid = 15 * i + j;
    let r = createSVGElement('rect', {
      x: 30 * j,
      y: 30 * i,
      height: '30',
      width: '30',
      id: rid.toString(),
      stroke: 'black',
      fill: 'red'
    });
    let t = createSVGElement('text', {
      x: 30 * j + 10,
      y: 30 * i + 20,
      'font-size': 'lem',
      id: 't' + rid.toString()
    });
    C.appendChild(r);
    C.appendChild(t);
  }
}

// Attach event listeners
C.addEventListener('mousedown', position);
window.addEventListener('keydown', text);

// Load XML file and process it
let x = new XMLHttpRequest();
x.onreadystatechange = function() {
  if (x.readyState === 4 && x.status === 200) {
    let s = '';
    let a = x.responseXML.querySelector('across');
    let cl = a.querySelectorAll('clue');
    for (let i = 0; i < cl.length; i++) {
      let txt = cl[i].querySelector('text').textContent;
      s += txt + '<br>';
    }
    document.getElementById('disp').innerHTML = s;
  }
};
x.open('GET', 'crossword.xml', true);
x.send();

// Function to create SVG elements
function createSVGElement(tagName, attrs) {
  let elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  for (let key in attrs) {
    elem.setAttribute(key, attrs[key]);
  }
  return elem;
}

// Event handlers
function position(e) {
  cx = Math.floor(e.offsetX / 30);
  cy = Math.floor(e.offsetY / 30);
  let rid = 15 * cy + cx;
  let rr = rid.toString();
  let rec = document.getElementById(rr);
  rec.setAttribute('fill', 'white');
}

function text(e) {
  let ch = String.fromCharCode(e.keyCode);
  let b = 15 * cy + cx;
  let tid = 't' + b.toString();
  let tx = document.getElementById(tid);
  tx.textContent = ch;
}