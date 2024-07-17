document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const form = document.getElementById("contact-form");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close-button");
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");
    const modalData = document.getElementById("modal-data");

    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            const url = `https://jsonplaceholder.typicode.com/users?name=${encodeURIComponent(name)}&username=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
            
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    modalTitle.textContent = "Suscripción Exitosa";
                    modalMessage.textContent = "La suscripción al newsletter fue exitosa.";
                    modalData.textContent = JSON.stringify(data, null, 2);
                    localStorage.setItem("formData", JSON.stringify(data));
                    showModal();
                })
                .catch(error => {
                    modalTitle.textContent = "Error en la Suscripción";
                    modalMessage.textContent = error.message;
                    modalData.textContent = "";
                    showModal();
                });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

    closeButton.addEventListener("click", function() {
        closeModal();
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    function showModal() {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    // Load data from localStorage if available
    const savedData = localStorage.getItem("formData");
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById("name").value = formData.name;
        document.getElementById("email").value = formData.email;
        document.getElementById("message").value = formData.message || "";
    }
});
