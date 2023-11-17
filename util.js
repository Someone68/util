function randomInt(x, y) {
	if (!y) {
		y = x;
		x = 0;
	}
	return Math.floor(Math.random() * (y - x + 1)) + x;
}

function randomFloat(x, y, z) {
	if (!y) {
		y = x;
		x = 0;
	}
	if (z) return (Math.random() * (y - x + 1) + x).toFixed(z);
	else return Math.random() * (y - x + 1) + x;
}

function random() {
	return Math.random();
}

function gebid(id) {
	return document.getElementById(id);
}

function qsall(sel, func) {
	if (func) return document.querySelectorAll(sel).forEach(func);
	else return document.querySelectorAll(sel);
}

function s(sel, num) {
	if (num) {
		return document.querySelectorAll(sel)[num - 1];
	} else {
		return document.querySelector(sel);
	}
}

function makeElement(type, innerHTML, parent, attributes, classList, id) {
	let element = document.createElement(type);
	element.innerHTML = innerHTML;
	if (attributes) {
		attributes.forEach((attribute) => {
			element.setAttribute(
				Object.keys(attribute)[0],
				attribute[Object.keys(attribute)[0]]
			);
		});
	}
	if (classList) {
		classList.forEach((classs) => {
			element.classList.add(classs);
		});
	}
	if (id) {
		element.id = id;
	}
	if (parent) parent.append(element);
	return element;
}

/*

Example:
<> means required
[] means optional
() means example
{} means defualt
makeElement(
  <type> (div),
  <innerHTML> (test),
  [parent] {body} (s("#game")),
  [attributes]: [ { <attname>: <attvalue> } ] ([ { style: "color: red;" } ]),
  [classList]: [class1, class2, ...] ([cool, cooler]),
  [id] (bestdivintheworld)
)

*/

function hide(elm) {
	elm.style.display = "none";
}

function show(elm, display) {
	elm.style.display = display;
}

function randomCall(func, min, max) {
	let intervalID;

	function randomFunction() {
		func();
	}

	function startRandomCalls() {
		const randomInterval = Math.random() * (max - min) + min;
		intervalID = setInterval(randomFunction, randomInterval);
	}

	function stopRandomCalls() {
		clearInterval(intervalID);
	}

	// Start the random calls
	startRandomCalls();

	// Return a function to stop the random calls
	return stopRandomCalls;
}

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}

function randomcolor(hex) {
	let r = randomInt(255);
	let g = randomInt(255);
	let b = randomInt(255);
	let color = `rgb(${r}, ${g}, ${b})`;
	if (hex) color = rgbToHex(r, g, b);
	return color;
}

function detectCollision(elementA, elementB) {
	const rectA = elementA.getBoundingClientRect();
	const rectB = elementB.getBoundingClientRect();

	return (
		rectA.left < rectB.right &&
		rectA.right > rectB.left &&
		rectA.top < rectB.bottom &&
		rectA.bottom > rectB.top
	);
}

function utilModify(element) {
	element.css = (config) => {
		if (typeof config === "object") {
			Object.keys(config).forEach((key) => {
				element.style[key] = config[key];
			});
		} else {
			throw new TypeError(
				`.css() only supports type 'object', not '${typeof config}'`
			);
		}
	};
	element.listen = (listener, callback) => {
		element.addEventListener(listener, callback);
	};
}

// Function to handle mutations
function utilHandleMutations(mutationsList, observer) {
	for (const mutation of mutationsList) {
		if (mutation.type === "childList") {
			// New nodes were added
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === 1) {
					utilModify(node);
				}
			});
		}
	}
}

// Options for the observer (configure to your needs)
const utilObserverConfig = { childList: true, subtree: true };

// Create a new observer with the callback
const utilObserver = new MutationObserver(utilHandleMutations);

// Start observing the target node for configured mutations
utilObserver.observe(document.documentElement, utilObserverConfig);

// Add the attribute to all existing elements
document.querySelectorAll("*").forEach((element) => {
	utilModify(element);
});
