const codeOutput = document.querySelector(".code");
const numbers = "0123456789";

document.querySelectorAll(".code-holder").forEach((codeHolder) => {
    const displayCode = () => {
        let code = "";
    
        codeHolder.querySelectorAll("input").forEach((codeInput) => {code += codeInput.value});
        codeOutput.innerText = code;
    }

    const hideCode = () => {
        codeOutput.innerText = "";
    }

    codeHolder.querySelectorAll("input").forEach((codeInput) => {
        const nextInput = codeInput.nextElementSibling;
        const lastInput = codeInput.previousElementSibling;
        const isLastInput = nextInput === null;

        codeInput.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                codeInput.blur();
                return;
            }

            e.preventDefault();
            const isNumber = numbers.includes(e.key);
            
            if (!isNumber && e.key !== "Backspace") {
                return;
            }
            
            if (isNumber) {
                if (e.target.value.length === 0) {
                    e.target.value = e.key;
                }

                if (nextInput !== null) {
                    nextInput.focus();
                    e.target.value = e.key;
                } else {
                    if (isLastInput) {
                        displayCode(codeHolder);
                    }
                }
            } else { // Backspace
                e.target.value = e.target.value.substring(0, e.target.value.length - 1);

                if (lastInput !== null) {
                    hideCode();
                    lastInput.focus();
                }
            }
        })
    })
})