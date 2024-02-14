// manage sidebar menu

const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".closebtn");
const toggleSidebar = document.querySelector(".toggle-sidebar-icon");

toggleSidebar.addEventListener("click", () => {
    // console.log("is it working?");
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        console.log("opened");
        sidebar.style.display = "flex";
        sidebar.style.width = "200px";
        // toggleSidebar.style.display = "none";
        toggleSidebar.innerHTML = "<i class='fas fa-times'></i>";
    } else {
        console.log("closed");
        sidebar.style.display = "none";
        toggleSidebar.style.display = "flex";
        toggleSidebar.style.fontSize = "6px";
        toggleSidebar.innerHTML = "<i class='fas fa-bars'></i>";
    }
});