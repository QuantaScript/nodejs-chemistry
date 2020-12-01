const elementSelection = document.querySelector('#elements');
const infoElement = document.querySelector('#info');

function setElement(elements) {
    elements.forEach((element) => {
        const optionSelection = document.createElement('option');
        optionSelection.setAttribute('value', element.name);
        optionSelection.textContent = element.name;
        elementSelection.append(optionSelection);

        optionSelection.addEventListener('click', () => {
            infoElement.innerHTML = `<pre>${JSON.stringify(element, null, 4)}</pre>`;
        });
    });
}

async function getElements() {
    const response = await fetch('/api/elements');
    const elements = await response.json();
    setElement(elements);
}

getElements();