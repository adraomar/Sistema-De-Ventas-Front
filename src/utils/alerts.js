import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    background: "rgba(3, 9, 18, 0.95)",
    color: "#ffffff",
    
    customClass: {
        popup: "custom-toast",
        title: "custom-toast-title"
    }
});

const showSuccess = (message) => {
    return Toast.fire({
        icon: "success",
        title: message,
        timer: 1800,
        iconColor: "#16ff48"
    });
}

const showError = (message) => {
    return Toast.fire({
        icon: "error",
        title: message,
        timer: 1800,
        iconColor: "#ff4d4d"
    });
}

const showInfo = (message) => {
    return Toast.fire({
        icon: "info",
        title: message,
        timer: 1800,
        iconColor: "#16d9ff"
    });
}

export { showSuccess, showError, showInfo };