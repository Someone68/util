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

function qsall(sel, func) {
	if (func) return document.querySelectorAll(sel).forEach(func);
	else return document.querySelectorAll(sel);
}

function _(sel, num) {
	if (num) {
		return document.querySelectorAll(sel)[num - 1];
	} else {
		return document.querySelector(sel);
	}
}

function makeElement(type, innerHTML, parent, attributes, classList, id) {
	let element = document.createElement(type);
	if (innerHTML) element.innerHTML = innerHTML;
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

function utilComponentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return (
		"#" + utilComponentToHex(r) + utilComponentToHex(g) + utilComponentToHex(b)
	);
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

let mouse = {
	x: 0,
	y: 0,
	down: false,
	up: true,
};

function utilUpdateMouseCoordinates(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}

document.addEventListener("DOMContentLoaded", (e) => {
	utilModify(document);
	utilUpdateMouseCoordinates(e);
});

document.addEventListener("mousemove", utilUpdateMouseCoordinates);

document.addEventListener("mousedown", () => {
	mouse.down = true;
	mouse.up = false;
});

document.addEventListener("mouseup", () => {
	mouse.up = true;
	mouse.down = false;
});

// List of all keys you want to track
const allKeys = [
	"Backquote",
	"Digit1",
	"Digit2",
	"Digit3",
	"Digit4",
	"Digit5",
	"Digit6",
	"Digit7",
	"Digit8",
	"Digit9",
	"Digit0",
	"Minus",
	"Equal",
	"Backspace",
	"Tab",
	"KeyQ",
	"KeyW",
	"KeyE",
	"KeyR",
	"KeyT",
	"KeyY",
	"KeyU",
	"KeyI",
	"KeyO",
	"KeyP",
	"BracketLeft",
	"BracketRight",
	"Enter",
	"ControlLeft",
	"KeyA",
	"KeyS",
	"KeyD",
	"KeyF",
	"KeyG",
	"KeyH",
	"KeyJ",
	"KeyK",
	"KeyL",
	"Semicolon",
	"Quote",
	"Backslash",
	"ShiftLeft",
	"IntlBackslash",
	"KeyZ",
	"KeyX",
	"KeyC",
	"KeyV",
	"KeyB",
	"KeyN",
	"KeyM",
	"Comma",
	"Period",
	"Slash",
	"ShiftRight",
	"NumpadMultiply",
	"AltLeft",
	"Space",
	"CapsLock",
	"F1",
	"F2",
	"F3",
	"F4",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"Pause",
	"ScrollLock",
	"Numpad7",
	"Numpad8",
	"Numpad9",
	"NumpadSubtract",
	"Numpad4",
	"Numpad5",
	"Numpad6",
	"NumpadAdd",
	"Numpad1",
	"Numpad2",
	"Numpad3",
	"Numpad0",
	"NumpadDecimal",
	"IntlRo",
	"F11",
	"F12",
	"NumpadEnter",
	"ControlRight",
	"NumpadDivide",
	"PrintScreen",
	"AltRight",
	"Home",
	"ArrowUp",
	"PageUp",
	"ArrowLeft",
	"ArrowRight",
	"End",
	"ArrowDown",
	"PageDown",
	"Insert",
	"Delete",
	"OSLeft",
	"OSRight",
	"ContextMenu",
	"AudioVolumeMute",
	"AudioVolumeDown",
	"AudioVolumeUp",
	"MediaTrackNext",
	"MediaTrackPrevious",
	"MediaStop",
	"MediaPlayPause",
	"BrowserHome",
	"AudioStop",
	"BrowserBack",
	"BrowserForward",
	"BrowserRefresh",
	"BrowserSearch",
	"BrowserFavorites",
	"BrowserStop",
	"MediaSelect",
	"LaunchMail",
	"LaunchApp2",
	"MediaSelect",
	"LaunchCalculator",
	"BrowserFavorites",
	"MediaTrackNext",
	"LaunchMediaPlayer",
];

const keys = {
	Enter: false,
	Shift: false,
	Control: false,
	Alt: false,
};

allKeys.forEach((key) => {
	keys[key] = false;
});

document.addEventListener("keydown", (event) => {
	keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
	keys[event.code] = false;
});
