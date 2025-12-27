let foods = [];
      const RATIO = 30;

      function addFood() {
        const foodName = document.getElementById("foodName").value.trim();
        const carbs = parseFloat(document.getElementById("carbs").value);

        if (!foodName || !carbs || carbs <= 0) {
          alert("Felipe, escreva o nome e os carboidratos do alimento!");
          return;
        }

        foods.push({ id: Date.now(), name: foodName, carbs });
        document.getElementById("foodName").value = "";
        document.getElementById("carbs").value = "";
        document.getElementById("foodName").focus();
        updateFoodList();
        calculateInsulin();
      }

      function removeFood(id) {
        foods = foods.filter((f) => f.id !== id);
        updateFoodList();
        calculateInsulin();
      }

      function updateFoodList() {
        const foodList = document.getElementById("foodList");
        if (foods.length === 0) {
          foodList.innerHTML =
            '<div class="empty-state">Nenhum alimento adicionado ainda 🍎</div>';
          return;
        }
        foodList.innerHTML = foods
          .map(
            (food) => `
    <div class="food-item">
      <div class="food-info"><h4>${food.name}</h4></div>
      <div class="food-carbs">${food.carbs}g</div>
      <button class="btn-delete" onclick="removeFood(${food.id})">🗑️</button>
    </div>`
          )
          .join("");
      }

      function calculateInsulin() {
        const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
        const insulin = totalCarbs / RATIO;
        document.getElementById("insulinAmount").textContent =
          insulin.toFixed(2);
        if (totalCarbs > 0) {
          document.getElementById(
            "formulaText"
          ).textContent = `${totalCarbs.toFixed(
            1
          )}g ÷ ${RATIO} = ${insulin.toFixed(2)} unidades 💉`;
        } else {
          document.getElementById("formulaText").textContent =
            "Adicione alimentos para calcular, Felipe! 🩵";
        }
      }

      function searchCarbs() {
        const foodName = document.getElementById("foodName").value.trim();
        if (!foodName) {
          alert("Digite o nome de um alimento para pesquisar!");
          return;
        }
        const query = encodeURIComponent(
          `quantas gramas de carboidrato tem em ${foodName}`
        );
        const url = `https://www.google.com/search?q=${query}`;
        window.open(url, "_blank");
      }