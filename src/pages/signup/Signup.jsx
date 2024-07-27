import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // State variables for error messages
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          first_name: firstname,
          last_name: lastname,
          phone_number: phoneNumber,
          password,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.status === 201 | 200 | 202) {
        setSuccess(
          data.message ||
            "Registration successful. Redirecting to verify email..."
        );
        setTimeout(() => navigate("/verify-email"), 5000); // Redirect after 5 seconds
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Registration error:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Check for errors in input fields
    let isValid = true;

    // Username validation
    if (username.trim() === "") {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long.");
      isValid = false;
    } else if (username.length > 24) {
      setUsernameError("Username must not exceed 24 characters.");
      isValid = false;
    }

    // Email validation
    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is not valid.");
      isValid = false;
    }

    // Password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else if (password.length > 24) {
      setPasswordError("Password must not exceed 24 characters.");
      isValid = false;
    }
    if (!password.match(/[a-z]/)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      isValid = false;
    }
    if (!password.match(/[A-Z]/)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      isValid = false;
    }
    if (!password.match(/[0-9]/)) {
      setPasswordError("Password must contain at least one digit.");
      isValid = false;
    }
    if (!password.match(/[!@#$%^&*]/)) {
      setPasswordError(
        "Password must contain at least one special character (!@#$%^&*)."
      );
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      registerUser();
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div className="flex gap-3">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="First Name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Last Name"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter @username"
                />{" "}
                {usernameError && (
                  <div className="text-destructive">{usernameError}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="johndoe@gmail.com"
                />
                {emailError && (
                  <div className="text-destructive">{emailError}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="07XXXXXXXX or +2547XXXXXXXXX"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />{" "}
                {passwordError && (
                  <div className="text-destructive">{passwordError}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />{" "}
                {confirmPasswordError && (
                  <div className="text-destructive">{confirmPasswordError}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>{" "}
              {error && <div className="error">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}
              <p className="text-sm font-light">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
