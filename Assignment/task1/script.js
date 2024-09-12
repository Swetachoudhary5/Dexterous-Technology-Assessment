
// Common function to show/hide error messages
function showError(inputId, errorMessageId, isValid) {
    const errorElement = document.getElementById(errorMessageId);
    if (isValid) {
        errorElement.classList.add('hidden');
    } else {
        errorElement.classList.remove('hidden');
    }
}

// Validation functions
function validateName(inputId) {
    const nameValue = document.getElementById(inputId).value.trim();
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(nameValue);
}

function validateEmail() {
    const emailValue = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
}

function validateContactNumber() {
    const contactNumberValue = document.getElementById('contactNumber').value.trim();
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(contactNumberValue);
}

function validateDateOfBirth() {
    const dateofbirthValue = document.getElementById('contactNumber').value.trim();
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(dateofbirthValue);
}

function validatePassword() {
    const passwordValue = document.getElementById('password').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,})/;
    return passwordRegex.test(passwordValue) && !passwordValue.includes(firstName) && !passwordValue.includes(lastName);
}

function validateConfirmPassword() {
    const passwordValue = document.getElementById('password').value.trim();
    const confirmPasswordValue = document.getElementById('confirmPassword').value.trim();
    return passwordValue === confirmPasswordValue;
}


// Add blur event listeners for onBlur validation
document.getElementById('firstName').addEventListener('blur', function() {
    const isValid = validateName('firstName');
    showError('firstName', 'firstNameError', isValid);
});

document.getElementById('lastName').addEventListener('blur', function() {
    const isValid = validateName('lastName');
    showError('lastName', 'lastNameError', isValid);
});

document.getElementById('email').addEventListener('blur', function() {
    const isValid = validateEmail();
    showError('email', 'emailError', isValid);
});

document.getElementById('contactNumber').addEventListener('blur', function() {
    const isValid = validateContactNumber();
    showError('contactNumber', 'contactError', isValid);
});


document.getElementById('dob').addEventListener('keydown', function(event) {
    event.preventDefault();
});
document.getElementById('dob').addEventListener('blur', function() {
    const isValid = validateDateOfBirth();
    showError('dob', 'dobError', isValid);
});

document.getElementById('password').addEventListener('blur', function() {
    const isValid = validatePassword();
    showError('password', 'passwordError', isValid);
});

document.getElementById('confirmPassword').addEventListener('blur', function() {
    const isValid = validateConfirmPassword();
    showError('confirmPassword', 'confirmPasswordError', isValid);
});

document.querySelector('.show-more').addEventListener('click', function () {
    document.querySelector('.more-text').style.display = 'inline';
    this.style.display = 'none';
});


// Form Submission Handler
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    const isFirstNameValid = validateName('firstName');
    const isLastNameValid = validateName('lastName');
    const isEmailValid = validateEmail();
    const isContactValid = validateContactNumber();
    const isDateOfBirth = validateDateOfBirth();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsChecked = document.getElementById('termsCheck').checked;

    // Show error messages
    showError('firstName', 'firstNameError', isFirstNameValid);
    showError('lastName', 'lastNameError', isLastNameValid);
    showError('email', 'emailError', isEmailValid);
    showError('contactNumber', 'contactError', isContactValid);
    showError('dob', 'dobError', isDateOfBirth);
    showError('password', 'passwordError', isPasswordValid);
    showError('confirmPassword', 'confirmPasswordError', isConfirmPasswordValid);
    showError('termsCheck', 'termsError', isTermsChecked);

    if (isFirstNameValid && isLastNameValid && isEmailValid && isContactValid && isPasswordValid && isConfirmPasswordValid && isTermsChecked) {
        alert('Form submitted successfully! Redirecting to exam page.');
        // window.open("file:///C:/Users/Administrator/Desktop/Assignment/task2/exam.html"); 
        console.log("Working redirection");
        window.location.href = '../task2/exam.html';
    }

});

