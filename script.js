class FormValidator {
  constructor(firstName, lastName, mobileInput, passwordInput, retypePasswordInput, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileInput = mobileInput;
    this.passwordInput = passwordInput;
    this.retypePasswordInput = retypePasswordInput;
    this.email = email;
  }

  validateName(nameField) {
    if (nameField.value === "") {
      nameField.setCustomValidity("Please enter a value");
      return false;
    }
    nameField.setCustomValidity("");
    return true;
  }

  validatePhoneNumber(phoneField) {
    const phoneNo = phoneField.value;
    if (phoneNo === "" || phoneNo.match(/[^0-9]/)) {
      phoneField.setCustomValidity("Please enter a valid value");
      return false;
    } else if (phoneNo.length > 15 || phoneNo.length < 7) {
      phoneField.setCustomValidity("Phone number should be between 7-15 digits!");
      return false;
    } else {
      phoneField.setCustomValidity("");
    }
    return true;
  }

  validatePassword(pass1, pass2) {
    const password = pass1.value;
    const password2 = pass2.value;

    if (password === password2) {
      pass2.setCustomValidity("");
      return true;
    } else {
      pass2.setCustomValidity("Passwords don't match!");
      return false;
    }
  }

  validateEmail(email) {
    if (email.value === "") {
      email.setCustomValidity("Please enter your email!");
      return false;
    }
    email.setCustomValidity("");
    return true;
  }

  validateForm() {
    const isFirstNameValid = this.validateName(this.firstName);
    const isLastNameValid = this.validateName(this.lastName);
    const isMobileValid = this.validatePhoneNumber(this.mobileInput);
    const arePasswordsValid = this.validatePassword(this.passwordInput, this.retypePasswordInput);
    const isEmailValid = this.validateEmail(this.email);

    if (isFirstNameValid && isLastNameValid && isMobileValid && arePasswordsValid && isEmailValid) {

      return true;
    }
    return false;
  }
}

// Set up DOMContentLoaded listeners
document.addEventListener("DOMContentLoaded", function () {



  // Initialize phone input plugin
  const mobileInput = document.querySelector("#mobile_code");
  window.intlTelInput(mobileInput, {
    initialCountry: "pk",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  // Initialize the form validator
  const firstName = document.getElementById("fname");
  const lastName = document.getElementById("lname");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const email = document.getElementById("email");
  const formValidator = new FormValidator(firstName, lastName, mobileInput, password, password2, email);

  // Event listener for the sign-up button
  const signUpButton = document.getElementById("signUpButton");
  signUpButton.addEventListener("click", function () {
    const success = formValidator.validateForm();
     
    if (success === true) {
      const signupData = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        username: document.getElementById("Username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phoneNumber: document.getElementsByClassName("iti__selected-dial-code")[0].textContent + document.getElementById("mobile_code").value
      };
      fetch("https://672ddcb2fd8979715644034c.mockapi.io/products/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to sign up");
          }
          return response.json();
        })
        .then((data) => {
          alert("Signup successful: " + data.message); // Success message
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
  
      window.location.href = 'index.html';
      alert("Sign Up Successful!");
    }
  });



});


