// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
  const catalogContainer = document.getElementById("catalog");

  // Charger le fichier JSON qui contient la liste des pièces
  fetch("stl/catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Impossible de charger catalog.json");
      }
      return response.json();
    })
    .then(data => {
      // Pour chaque pièce dans le JSON, on crée une "carte"
      data.forEach(piece => {
        const card = document.createElement("div");
        card.className = "piece";

        card.innerHTML = `
          <h3>${piece.nom}</h3>
          <p>${piece.description}</p>
          <a href="stl/${piece.fichier}" download>Télécharger</a>
        `;

        catalogContainer.appendChild(card);
      });
    })
    .catch(error => {
      catalogContainer.innerHTML = "<p style='color:red;'>Erreur : catalogue introuvable</p>";
      console.error(error);
    });
});

function rechercher() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const pieces = document.querySelectorAll(".piece");

  pieces.forEach(piece => {
    const titre = piece.querySelector("h3").textContent.toLowerCase();
    const description = piece.querySelector("p").textContent.toLowerCase();

    if (titre.includes(input) || description.includes(input)) {
      piece.style.display = "block";
    } else {
      piece.style.display = "none";
    }
  });
}
