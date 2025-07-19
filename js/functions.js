async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typewriter(element, text, letterDelay = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await delay(letterDelay);
    }
}

async function addMsgs(msgsParent, msgs, typeWriterEffect = false, msgDelay = 0, loadingTime = 2200) {
    for (const msg of msgs) {
        let msgElement;

        if (msg === "br") {
            msgElement = document.createElement("br");
        } else {
            msgElement = document.createElement("p");
        }

        msgsParent.appendChild(msgElement);

        if (typeWriterEffect) {
            await typewriter(msgElement, msg);
        } else {
            msgElement.textContent = msg;
        }

        if (msgElement.textContent.includes("...")) {
            msgElement.textContent = msgElement.textContent.slice(0, -3);

            const dotSpan = document.createElement("span");
            msgElement.appendChild(dotSpan);

            let dotCount = 0;
            const maxDots = 3;

            const interval = setInterval(() => {
                dotCount = (dotCount + 1) % (maxDots + 1);
                dotSpan.textContent = ".".repeat(dotCount);
            }, 200);

            await delay(loadingTime); // ... loading animation duration

            clearInterval(interval);
            dotSpan.remove();
        }

        await delay(msgDelay);
    }
}

function createElement(tag,  options = {}) {
    const element = document.createElement(tag);

    if (options.class) {
        element.className = options.class;
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.children) {
        options.children.forEach((child) => {
            let childElement;

            if (child instanceof HTMLElement) {
                childElement = child;
            } else {
                childElement = createElement(child.tag, child);
            }

            element.appendChild(childElement);
        })
    }

    if (options.events) {
        options.events.forEach((event) => {
            element.addEventListener(event.type, (e) => {
                event.action(e);
            })
        })
    }

    return element
}

// window functions
function closeWindow(e) {
    const window = e.target.closest(".window");

    window.classList.add("hidden");

    window.addEventListener("transitionend", () => {
        window.remove();
    })
}

export const functions = {
    delay,
    typewriter,
    addMsgs,
    createElement,
    closeWindow
}