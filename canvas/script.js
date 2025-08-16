const svg = document.getElementById('drawingCanvas');
const buttons = document.querySelectorAll('.tool-button');

let isDrawing = false;
let currentShape = null;
let startX = 0;
let startY = 0;
let selectedShape = 'rectangle';
let isErasing = false;

// Handle shape/erase button selection
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedShape = button.getAttribute('data-shape');
    isErasing = selectedShape === 'erase';
  });
});

// Draw shapes
svg.addEventListener('mousedown', (e) => {
  if (isErasing) return;

  const pt = getSVGPoint(e);
  startX = pt.x;
  startY = pt.y;

  switch (selectedShape) {
    case 'rectangle':
      currentShape = createSVGElement('rect', {
        x: startX,
        y: startY,
        width: 0,
        height: 0
      });
      break;
    case 'line':
      currentShape = createSVGElement('line', {
        x1: startX,
        y1: startY,
        x2: startX,
        y2: startY
      });
      break;
    case 'circle':
      currentShape = createSVGElement('circle', {
        cx: startX,
        cy: startY,
        r: 0
      });
      break;
  }

  if (currentShape) {
    currentShape.setAttribute('stroke', 'blue');
    currentShape.setAttribute('fill', selectedShape === 'rectangle' || selectedShape === 'circle' ? 'rgba(0, 0, 255, 0.2)' : 'none');
    currentShape.setAttribute('stroke-width', 2);

    // Add delete handler when in erase mode
    currentShape.addEventListener('click', function (e) {
      if (isErasing) {
        svg.removeChild(e.target);
        e.stopPropagation(); // Prevent accidental drawing after erase
      }
    });

    svg.appendChild(currentShape);
    isDrawing = true;
  }
});

svg.addEventListener('mousemove', (e) => {
  if (!isDrawing || !currentShape || isErasing) return;

  const pt = getSVGPoint(e);

  switch (selectedShape) {
    case 'rectangle':
      currentShape.setAttribute('x', Math.min(pt.x, startX));
      currentShape.setAttribute('y', Math.min(pt.y, startY));
      currentShape.setAttribute('width', Math.abs(pt.x - startX));
      currentShape.setAttribute('height', Math.abs(pt.y - startY));
      break;

    case 'line':
      currentShape.setAttribute('x2', pt.x);
      currentShape.setAttribute('y2', pt.y);
      break;

    case 'circle':
      const dx = pt.x - startX;
      const dy = pt.y - startY;
      const radius = Math.sqrt(dx * dx + dy * dy);
      currentShape.setAttribute('r', radius);
      break;
  }
});

svg.addEventListener('mouseup', () => {
  isDrawing = false;
  currentShape = null;
});

svg.addEventListener('mouseleave', () => {
  isDrawing = false;
  currentShape = null;
});

// Utility functions
function getSVGPoint(event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function createSVGElement(type, attrs) {
  const elem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (let attr in attrs) {
    elem.setAttribute(attr, attrs[attr]);
  }
  return elem;
}
