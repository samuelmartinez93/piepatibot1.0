function playGame(playerChoice) {
    let iaChoice = "";

    // Resalta el botón seleccionado
    highlightSelectedButton(playerChoice);

    // Lógica para que la IA siempre gane
    if (playerChoice === "piedra") {
        iaChoice = "papel";
    } else if (playerChoice === "papel") {
        iaChoice = "tijera";
    } else if (playerChoice === "tijera") {
        iaChoice = "piedra";
    }

    // Mostrar barra de carga y texto
    const loadingDiv = document.getElementById("loading");
    const loadingText = document.getElementById("loading-text");
    const loadingFill = document.getElementById("loading-fill");

    // Reiniciar barra y texto
    loadingDiv.style.display = "flex";
    loadingFill.style.width = "0";
    loadingText.innerText = "Piedra...";

    // Animar texto y barra
    setTimeout(() => loadingText.innerText = "Papel...", 1000);
    setTimeout(() => loadingText.innerText = "Tijera...", 2000);
    setTimeout(() => loadingText.innerText = "¡Ya!", 3000);

    loadingFill.style.width = "100%";

    // Después de 3.5 segundos, mostrar elecciones
    setTimeout(() => {
        loadingDiv.style.display = "none";

        // Mostrar elecciones
        const playerChoiceImg = document.getElementById("player-choice-img");
        const iaChoiceImg = document.getElementById("ia-choice-img");

        playerChoiceImg.innerHTML = getChoiceEmoji(playerChoice);
        iaChoiceImg.innerHTML = getChoiceEmoji(iaChoice);

        // Mostrar resultado
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `<span style="color: red;">¡Has perdido!
        <br>¿Probar otra vez?
        <br>▼</span>`;

        disableChoices();
    }, 3500);

    disableChoices();
}

function resetGame() {
    // Limpia el resultado y elecciones
    document.getElementById("player-choice-img").innerHTML = "";
    document.getElementById("ia-choice-img").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    // Ocultar barra de carga
    document.getElementById("loading").style.display = "none";

    // Reactivar botones
    enableChoices();

    // Eliminar efecto active
    clearSelectedButtons();
}

function disableChoices() {
    const buttons = document.querySelectorAll(".choices button");
    buttons.forEach(button => button.disabled = true);
}

function enableChoices() {
    const buttons = document.querySelectorAll(".choices button");
    buttons.forEach(button => button.disabled = false);
}

function highlightSelectedButton(playerChoice) {
    const buttons = document.querySelectorAll(".choices button");
    buttons.forEach(button => {
        button.classList.remove("selected");
        if (button.innerText.includes(playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1))) {
            button.classList.add("selected");
        }
    });
}

function clearSelectedButtons() {
    const buttons = document.querySelectorAll(".choices button");
    buttons.forEach(button => button.classList.remove("selected"));
}

function getChoiceEmoji(choice) {
    switch (choice) {
        case "piedra":
            return "🪨<br />Piedra"
        case "papel":
            return "📄<br />Papel";
        case "tijera":
            return "✂️<br />Tijera";
        default:
            return "";
    }
}
