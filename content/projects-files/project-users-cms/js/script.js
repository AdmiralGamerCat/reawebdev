"use strict";

const container = document.querySelector("#container");
const newUserButton = document.querySelector("#new-user-button");
const adminTable = document.querySelector("#admin-table tbody");
const customerTable = document.querySelector("#customer-table tbody");
let users = [];
const authenticationLevels = [1, 2, 3, 4];

// User
class User {
    #username;

    constructor(username) {
        this.#username = username;
    }

    // username
    get username() {
        return this.#username;
    }

    set username(username) {
        this.#username = username;
    }

    // functions
    login() {
        console.log(`${this.#username} has logged in!`);
    }

    logout() {
        console.log(`${this.#username} has logged out!`);
    }

    get info() {
        return `${this.username}, ${this.firstName}, ${this.lastName}, ${this.location}`;
    }
}

class Admin extends User {
    #authenticationLevel;

    static fromCustomer(customer, authenticationLevel) {
        return new Admin(customer.username, authenticationLevel);
    }

    constructor(username, authenticationLevel) {
        super(username);
        this.authenticationLevel = authenticationLevel;
    }

    get authenticationLevel() {
        return this.#authenticationLevel;
    }

    set authenticationLevel(authenticationLevel) {
        const level = Number(authenticationLevel);

        if (authenticationLevels.includes(level)) {
            this.#authenticationLevel = level;
        } else {
            console.error(`${authenticationLevel} is not a valid authentication level! Valid authentication levels: ${authenticationLevels}`);
        }
    }
}

class Customer extends User {
    #firstName;
    #lastName;
    #location;

    static fromAdmin(admin, firstName, lastName, location) {
        return new Customer(admin.username, firstName, lastName, location);
    }

    constructor(username, firstName, lastName, location) {
        super(username);
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#location = location;
    }

    // first name
    get firstName() {
        return this.#firstName;
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    // last name
    get lastName() {
        return this.#lastName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }

    // location
    get location() {
        return this.#location;
    }

    set location(location) {
        this.#location = location;
    }
}

// user cms

// helper function
const createElement = (tag, properties = {}, children = []) => {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(properties)) {
        switch (key) {
            case "class":
                element.classList.add(...value.split(" "));
                break;

            case "text":
                element.textContent = value;
                break;

            case "html":
                element.innerHTML = value
                break;

            case "on":
                for (const [event, handler] of Object.entries(value)) {
                    element.addEventListener(event, handler);
                }
                break;
        
            default:
                element.setAttribute(key, value);
                break;
        }
    }

    for (const child of children) {        
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else if (Array.isArray(child)) {
            child.forEach((subChild) => {
                element.appendChild(subChild);
            })
        } else if (child) {
            element.appendChild(child);
        }
    }

    return element;
}

const addPopup = (title, content) => {
    let closePopup;
    const popupPromise = new Promise((resolve) => {
        // popup functions
        closePopup = () => {
            popup.querySelectorAll("button").forEach((button) => {
                button.disabled = true;
            })

            popupContainer.classList.add("hidden");
            popup.classList.add("hidden");

            setTimeout(() => {
                popupContainer.remove();
                resolve();
            }, 300);
        }

        const headerWrapper = createElement("div",
            { class: "header-wrapper wrapper row" },
            [
                createElement("h2", { text: title }),
                createElement("button",
                    { class: "close-button red rotate", text: "Close" },
                    [ createElement("i", { class: "fa-solid fa-xmark" }) ]
                )
            ]
        )

        const popup = createElement("div",
            { class: "popup hidden" },
            [ headerWrapper, content ]
        )

        const popupContainer = createElement("div",
            { class: "popup-container hidden" },
            [ popup ]
        )

        container.appendChild(popupContainer);

        popupContainer.addEventListener("click", (event) => {
            if (event.target === popupContainer) {
                closePopup();
            }
        })

        headerWrapper.querySelector(".close-button").addEventListener("click", () => {
            closePopup();
        })

        // show popup
        setTimeout(() => {
            popupContainer.classList.remove("hidden");
            popup.classList.remove("hidden");
        }, 300);
    })

    return { popupPromise, closePopup };
}

// user related

// error handling functions
const showError = (input, error) => {
    input.classList.remove("valid");
    input.classList.add("invalid");

    let errorElement = input.parentElement.querySelector(".error-message");

    if (!errorElement) {
        errorElement = createElement("p", { class: "error-message", text: error });

        input.parentElement.appendChild(errorElement);
    }
}

const clearError = (input) => {
    if (input.classList.contains("invalid")) input.classList.remove("invalid");
    input.classList.add("valid");

    const errorElement = input.parentElement.querySelector(".error-message");

    if (errorElement) {
        errorElement.remove();
    }
}

const editUser = (userRow) => {
    const user = users.find((user) => user.username === userRow.querySelector(".username").innerHTML);

    const confirmButton = createElement("button",
        {
            text: "Confirm",
            id: "confirm-button",
            class: "blue",
            disabled: true
        },
        [ createElement("i", { class: "fa-solid fa-check" }) ]
    )

    const form = createElement("form");
    let inputs = [
        { label: "Username:", type: "text", id: "username-input", name: "username-input", value: user.username }
    ];

    if (user instanceof Admin) {
        inputs.push(
            { label: "Authentication level:", type: "text", id: "authentication-level-input", name: "authentication-level-input", value: user.authenticationLevel }
        )
    } else if (user instanceof Customer) {
        inputs.push(
            { label: "First Name:", type: "text", id: "first-name-input", name: "first-name-input", value: user.firstName },
            { label: "Last Name:", type: "text", id: "last-name-input", name: "last-name-input", value: user.lastName },
            { label: "Location:", type: "text", id: "location-input", name: "location-input", value: user.location }
        )
    }

    renderInputs(form, inputs);

    const inputElements = form.querySelectorAll("input");

    const validateForm = () => {
        let allValid = true;
        let anyChange = false;

        inputElements.forEach((inputElement) => {
            const value = inputElement.value.trim();
            const orinalValue = user[inputElement.name.replace("-input", "")];

            if (!value) {
                showError(inputElement, "This field is required!");
                allValid = false;
            } else {
                clearError(inputElement);
            }

            if (inputElement.id === "username-input" && users.some((user) => user.username === value) && value !== user.username) {
                showError(inputElement, "Username taken!");
                allValid = false;
            }

            if (value !== String(orinalValue ?? "")) {
                anyChange = true
            }
        });

        confirmButton.disabled = !(allValid && anyChange);
    }

    confirmButton.addEventListener("click", (event) => {
        confirmButton.disabled = true;
        console.log("Current user information:");
        console.log(user);

        if (validateForm) {
            inputElements.forEach((inputElement) => {
                const value = inputElement.value.trim();

                switch (inputElement.name) {
                    case "username-input":
                        user.username = value;
                        break;

                    case "first-name-input":
                        user.firstName = value;
                        break;

                    case "last-name-input":
                        user.lastName = value;
                        break;

                    case "location-input":
                        user.location = value;
                        break;

                    case "authentication-level-input":
                        user.authenticationLevel = value;
                        break;
                
                    default:
                        break;
                }
            })

            console.log("Edited user information:");
            console.log(user);

            populateTables();
            closePopup();
        } else {
            confirmButton.disabled = false;
            console.log("Failed to edit user due to input errors");
        }
    })

    form.addEventListener("input", validateForm);


    const { popupPromise, closePopup } = addPopup("Edit User",
        [
            form,
            createElement("div", { class: "wrapper row" },
                [ createElement("span"), confirmButton ]
            )
        ]
    )
}

const deleteUser = (userRow) => {
    const username = userRow.querySelector(".username").textContent;
    const user = users.find((user) => user.username === username);
    const userType = user instanceof Admin ? "admin" : "customer";

    const acceptButton = createElement("button",
        { text: "Accept", id: "accept-button", class: "green" },
        [ createElement("i", { class: "fa-solid fa-check" }) ]
    );

    const cancelButton = createElement("button",
        { text: "Cancel", id: "cancel-button", class: "red" },
        [ createElement("i", { class: "fa-solid fa-xmark" }) ]
    );

    const { popupPromise, closePopup } = addPopup("Delete User", [
        createElement("div", { class: "wrapper column" }, [
            createElement("p", { text: `Are you sure you want to delete ${userType} user '${username}'?` }),
            createElement("div", { class: "wrapper row" }, [acceptButton, cancelButton]),
        ]),
        createElement("span")
    ]);

    acceptButton.addEventListener("click", () => {
        acceptButton.disabled = true;

        const userIndex = users.findIndex((u) => u.username === username);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
        }

        populateTables();
        closePopup();
    });

    cancelButton.addEventListener("click", closePopup);
};


const populateTables = () => {
    adminTable.innerHTML = "";
    customerTable.innerHTML = "";

    users.forEach((user) => {
        const usernameElement = createElement("td",
            { class: "username", text: user.username }
        )

        if (user instanceof Admin) {
            const authenticationLevelElement = createElement("td",
                { class: "authentication-level", text: user.authenticationLevel }
            )

            const userRow = createElement("tr",
                { class: "user-row" },
                [
                    usernameElement,
                    authenticationLevelElement
                ]
            )

            adminTable.appendChild(userRow);
        } else if (user instanceof Customer) {
            const firstNameElement = createElement("td", { class: "first-name", text: user.firstName });
            const lastNameElement = createElement("td", { class: "last-name", text: user.lastName });
            const locationElement = createElement("td", { class: "location", text: user.location });

            const userRow = createElement("tr",
                { class: "user-row" },
                [
                    usernameElement,
                    firstNameElement,
                    lastNameElement,
                    locationElement
                ]
            )

            customerTable.appendChild(userRow);
        }
    })

    // add edit / delete wrappers on mouse enter
    const userRows = document.querySelectorAll(".user-row");

    userRows.forEach((userRow) => {
        let editDeleteWrapper;

        const showEditDeleteWrapper = () => {
            if (!editDeleteWrapper) {
                const editButton = createElement("button",
                    { text: "Edit", class: "edit-button blue" },
                    [ createElement("i", { class: "fa-solid fa-pen" }) ]
                )

                const deleteButton = createElement("button",
                    { text: "Delete", class: "delete-button red" },
                    [ createElement("i", { class: "fa-solid fa-trash-can" }) ]
                )

                editDeleteWrapper = createElement("div",
                    { class: "edit-delete-wrapper wrapper row hidden" },
                    [ editButton, deleteButton ]
                )

                userRow.appendChild(editDeleteWrapper);
                setTimeout(() => editDeleteWrapper.classList.remove("hidden"), 10);

                // edit user
                editButton.addEventListener("click", () => {
                    editUser(userRow);
                })

                // delete user
                deleteButton.addEventListener("click", () => {
                    deleteUser(userRow);
                })
            }
        }

        const hideEditDeleteWrapper = () => {
            if (editDeleteWrapper) {
                editDeleteWrapper.classList.add("hidden");
                setTimeout(() => {
                    if (editDeleteWrapper) {
                        editDeleteWrapper.remove();
                    }
                    editDeleteWrapper = null;
                }, 300);
            }
        }

        userRow.addEventListener("mouseenter", showEditDeleteWrapper);
        userRow.addEventListener("mouseleave", (event) => {
            if (!userRow.contains(event.relatedTarget)) {
                hideEditDeleteWrapper();
            }
        })
    })
}

const renderInputs = (form, inputs) => {
    form.innerHTML = "";

    inputs.forEach((input) => {
        const wrapperElement = createElement("div", { class: "input-wrapper" });
        const labelElement = createElement("label", { for: input.id, text: input.label });
        let inputElement;

        if (input.type === "select") {
            inputElement = createElement("select", { id: input.id, name: input.name });
            
            input.options.forEach((option) => {
                const optionElement = createElement("option", { value: option.value, text: option.textContent });

                (option.attributes || []).forEach((attribute) => {
                    optionElement.setAttribute(attribute, true);
                })

                inputElement.appendChild(optionElement);
            });
        } else {
            inputElement = createElement("input",
                {
                    id: input.id,
                    name: input.name,
                    type: input.type,
                    value: input.value || "",
                    placeholder: input.placeholder || "",
                    min: input.min,
                    max: input.max
                }
            )
        }

        wrapperElement.appendChild(labelElement),
        wrapperElement.appendChild(inputElement);
        form.appendChild(wrapperElement);
    })
}

const createUser = async () => {
    const form = createElement("form");

    const initialInputs = [
        {
            label: "User Type:",
            type: "select",
            name: "user-type-input",
            id: "user-type-input",
            options: [
                {
                    value: "",
                    textContent: "Select",
                    attributes: ["disabled", "hidden", "selected"]
                },
                { value: "Admin", textContent: "Admin" },
                { value: "Customer", textContent: "Customer" }
            ]
        }
    ]

    renderInputs(form, initialInputs);

    // update input fields on user type change
    form.addEventListener("change", (event) => {
        if (event.target.id === "user-type-input") {
            form.classList.add("hidden");

            setTimeout(() => {
                const selectedValue = event.target.value;
                let newInputs = [];

                switch (selectedValue) {
                    case "Admin":
                        newInputs = [
                            { label: "Username", type: "text", id: "username-input", name: "username-input" },
                            { label: "Authentication level", type: "text", id: "authentication-level-input", name: "authentication-level-input", min: 0, max: 4 }
                        ]
                        break;

                    case "Customer":
                        newInputs = [
                            { label: "Username:", type: "text", id: "username-input", name: "username-input" },
                            { label: "First Name:", type: "text", id: "first-name-input", name: "first-name-input" },
                            { label: "Last Name:", type: "text", id: "last-name-input", name: "last-name-input" },
                            { label: "Location:", type: "text", id: "location-input", name: "location-input" }
                        ];
                        break;
                
                    default:
                        newInputs = initialInputs;
                        break;
                }

                renderInputs(form, initialInputs.concat(newInputs));
                const selectElement = document.querySelector("#user-type-input");

                if (selectElement) {
                    selectElement.value = selectedValue;
                }

                form.classList.remove("hidden");
            }, 300);
        }
    })

    // footer
    const footerWrapper = createElement("div",
        { class: "wrapper row" },
        [
            createElement("span"),
            createElement("button",
                {
                    id: "submit-button",
                    class: "green rotate",
                    html: "Create new User"
                },
                [ createElement("i", { class: "fa-solid fa-plus" }) ]
            )
        ]
    )

    // show window
    const { popupPromise, closePopup } = addPopup("Create New User", [ form, footerWrapper ]);

    form.addEventListener("change", (event) => {
        if (event.target.value.trim() === "") {
            showError(event.target, "This field is required!");
        } else {
            clearError(event.target);
        }
    })

    // input field validation and user creation logic
    const submitButton = footerWrapper.querySelector("#submit-button");
    submitButton.addEventListener("click", (event) => {
        submitButton.disabled = true;
        let usernameInput;
        let username;
        let valid = true;

        const formData = new FormData(form);

        for (const entry of formData.entries()) {
            const input = form.querySelector(`#${entry[0]}`);
            const value = entry[1].trim();

            clearError(input);

            if (input.id === "user-type-input" && !value) {
                showError(input, "Please select a user type!");
                valid = false;
            }

            if (!value) {
                showError(input, "This field is required!");
                valid = false
            }

            if (input.id === "username-input") {
                username = value;
                usernameInput = input;
            }

            if (input === usernameInput && users.some((user) => user.username === username)) {
                showError(input, "Username taken!");
                valid = false;
            }
        }

        if (!valid) {
            submitButton.disabled = false;
            return;
        }

        const userType = form.querySelector("#user-type-input").value;
        let newUser;

        if (userType === "Admin") {
            const authenticationLevel = Number(form.querySelector("#authentication-level-input").value.trim());
            newUser = new Admin(username, authenticationLevel);
        } else if (userType === "Customer") {
            const firstName = document.querySelector("#first-name-input").value.trim();
            const lastName = document.querySelector("#last-name-input").value.trim();
            const location = document.querySelector("#location-input").value.trim();
            newUser = new Customer(username, firstName, lastName, location);
        }
        
        users.push(newUser);
        populateTables();
        console.log(newUser);
        console.table(users);

        closePopup();
    })

    // on window closed
    await popupPromise;
    newUserButton.disabled = false;
}

newUserButton.addEventListener("click", () => {
    newUserButton.disabled = true
    createUser();
})