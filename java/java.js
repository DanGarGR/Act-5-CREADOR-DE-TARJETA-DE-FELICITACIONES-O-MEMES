// Variables de los elementos del formulario
const cardNameInput = document.getElementById('cardName');
const attributeInput = document.getElementById('attribute');
const monsterTypeInput = document.getElementById('monsterType');
const effectTextarea = document.getElementById('effect');
const colorPicker = document.getElementById('colorPicker');

// Variables de los elementos de la vista previa
const previewCardName = document.getElementById('previewCardName');
const previewAttribute = document.getElementById('previewAttribute');
const previewMonsterType = document.getElementById('previewMonsterType');
const previewEffect = document.getElementById('previewEffect');
const previewRectangle = document.getElementById('previewRectangle');

// Función para actualizar la vista previa de la carta
function updatePreview() {
    previewCardName.textContent = cardNameInput.value || 'Nombre de la Carta';
    previewAttribute.textContent = `Atributo: ${attributeInput.value || 'Viento'}`;
    previewMonsterType.textContent = `Tipo de Monstruo: ${monsterTypeInput.value || 'Lanzador de Conjuros'}`;
    previewEffect.textContent = effectTextarea.value || 'Efecto: Descripción del efecto aquí...';
}

// Función para actualizar el color del borde del rectángulo
function updateBorderColor() {
    previewRectangle.style.borderColor = colorPicker.value;
}

// Función para cambiar el fondo de la carta basado en el tipo de carta seleccionado
function changeCardType(type) {
    previewRectangle.classList.remove('fusion', 'sincronia', 'xyz', 'basic', 'evolution', 'mega', 'creature', 'spell', 'instant');
    previewRectangle.classList.add(type);
}

// Escuchar los eventos de entrada para actualizar la vista previa
cardNameInput.addEventListener('input', updatePreview);
attributeInput.addEventListener('input', updatePreview);
monsterTypeInput.addEventListener('input', updatePreview);
effectTextarea.addEventListener('input', updatePreview);

// Escuchar cambios en el selector de color
colorPicker.addEventListener('input', updateBorderColor);

// Función para actualizar los botones de tipo de carta y la plantilla de imagen según el TCG seleccionado
function updateTCG(tcg) {
    const cardButtonsContainer = document.getElementById('cardButtonsContainer');
    let buttonsHTML = '';
    
    // Cambiar la imagen de fondo
    previewRectangle.className = `rectangle ${tcg}`;

    switch (tcg) {
        case 'yugioh':
            buttonsHTML = `
                <button type="button" class="btn btn-primary card-type-btn" data-type="fusion">Fusión</button>
                <button type="button" class="btn btn-success card-type-btn" data-type="sincronia">Sincronía</button>
                <button type="button" class="btn btn-warning card-type-btn" data-type="xyz">XYZ</button>`;
            break;
        case 'pokemon':
            buttonsHTML = `
                <button type="button" class="btn btn-info card-type-btn" data-type="basic">Básico</button>
                <button type="button" class="btn btn-danger card-type-btn" data-type="evolution">Evolución</button>
                <button type="button" class="btn btn-success card-type-btn" data-type="mega">Mega Evolución</button>`;
            break;
        case 'magic':
            buttonsHTML = `
                <button type="button" class="btn btn-secondary card-type-btn" data-type="creature">Criatura</button>
                <button type="button" class="btn btn-primary card-type-btn" data-type="spell">Hechizo</button>
                <button type="button" class="btn btn-warning card-type-btn" data-type="instant">Instantáneo</button>`;
            break;
    }
    
    // Actualizar los botones del tipo de carta
    cardButtonsContainer.innerHTML = buttonsHTML;

    // Agregar eventos de clic a los nuevos botones de tipo de carta
    document.querySelectorAll('.card-type-btn').forEach(btn => {
        btn.addEventListener('click', (e) => changeCardType(e.target.dataset.type));
    });
}

// Escuchar los clics en los botones de TCG
document.getElementById('yugiohBtn').addEventListener('click', () => updateTCG('yugioh'));
document.getElementById('pokemonBtn').addEventListener('click', () => updateTCG('pokemon'));
document.getElementById('magicBtn').addEventListener('click', () => updateTCG('magic'));

// Inicializar con Yu-Gi-Oh!
updateTCG('yugioh');
