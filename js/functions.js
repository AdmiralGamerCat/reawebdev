function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.class) {
        element.className = options.class;
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.children) {
        options.children.forEach(child => {
            let childElement;

            if (child instanceof HTMLElement) {
                childElement = child;
            } else {
                childElement = createElement(child.tag, child);
            }

            if (childElement.classList.contains("hidden")) {
                childElement.addEventListener("transitionend", () => {
                    childElement.classList.remove("hidden");
                })
            }

            element.appendChild(childElement);
        });
    }

    if (element.classList.contains("hidden")) {
        element.addEventListener("transitionend", () => {
            element.classList.remove("hidden");
        })
    }

    if (options.events) {
        options.events.forEach(({ type, handler }) => {
            element.addEventListener(type, handler);
        })
    }

    return element;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeWriter(element, text, letterDelay = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await delay(letterDelay);
    }
}

async function addMsgs(msgParent, msgs, typeWriterEffect = false, typeWriterDelay = 25, msgDelay = 200) {
    for (const msg of msgs) {
        if (msg === "br") {
            const brElement = document.createElement("br");
            msgParent.appendChild(brElement);
            continue;
        }

        const msgElement = document.createElement("p");
        msgParent.appendChild(msgElement);

        if (typeWriterEffect) {
            typeWriter(msgElement, msg, typeWriterDelay);
        } else {
            msgElement.textContent = msg;
        }

        await delay(msgDelay);
    }
}

export {
    createElement,
    delay,
    typeWriter,
    addMsgs
}