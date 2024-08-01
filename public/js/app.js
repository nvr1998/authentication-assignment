document.addEventListener('DOMContentLoaded', () => {
    // Sign In Form
    document.getElementById('sign-in-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Add logic to send data to the backend for sign-in
        // Example: Make an AJAX request to your backend

        fetch('/api/signin', { // Replace with your actual endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to the home page after successful sign-in
                window.location.href = 'index.html';
            } else {
                // Display an error message
                document.getElementById('sign-in-message').innerText = data.message || 'Incorrect email or password!';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('sign-in-message').innerText = 'An error occurred. Please try again.';
        });
    });

    // Forgot Password Form
    document.getElementById('forgot-password-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;

        // Add logic to send data to the backend for forgot password
        fetch('/api/forgot-password', { // Replace with your actual endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('forgot-password-message').innerText = data.message || 'Reset link sent!';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('forgot-password-message').innerText = 'An error occurred. Please try again.';
        });
    });

    // Reset Password Form
    document.getElementById('reset-password-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('new-password').value;

        // Add logic to send data to the backend for resetting password
        fetch('/api/reset-password', { // Replace with your actual endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('reset-password-message').innerText = data.message || 'Password reset successful!';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('reset-password-message').innerText = 'An error occurred. Please try again.';
        });
    });

    // Sign Out
    document.getElementById('sign-out')?.addEventListener('click', () => {
        // Add logic to sign out
        fetch('/api/signout', { // Replace with your actual endpoint
            method: 'POST'
        })
        .then(() => {
            window.location.href = 'sign-in.html'; // Redirect to sign-in page
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while signing out.');
        });
    });

    // Reset Password Button
    document.getElementById('reset-password')?.addEventListener('click', () => {
        window.location.href = 'reset-password.html';
    });
});
