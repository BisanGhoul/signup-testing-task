import React from "react";
import { render } from "@testing-library/react";
import { setupServer } from "msw/node";
import SignUp from "./";
import { handlers } from "./handlers";
import { debug } from "jest-preview";
import { getButtonByName, getInputByLabel, getHeadingByText, findElementByText } from "../../test-utils/getterUtility";
import userEvent from "@testing-library/user-event";
import { get } from "http";
// Setting up the mock server
const server = setupServer(...handlers);

const getter = {
  getUsernameInput: () => getInputByLabel("User name"),
  getEmailInput: () => getInputByLabel("Email Address"),
  getPasswordInput: () => getInputByLabel("Password"),
  getNotficationCheckbox: () => getInputByLabel("I want to receive inspiration, marketing promotions and updates via email."),
  getSignUpButton: () => getButtonByName("Sign Up"),
  getEmailWarning: () => findElementByText("Enter a valid email"),
  getPasswordLengthWarning: () => findElementByText('Password should be of minimum 8 characters length'),
  getSignUpError: () => findElementByText("Error Signing Up!"),
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SignUp Component", () => {

  describe("Smmoke Tests", () => {
    it("should render sign up comonent", () => {
      render(<SignUp />);
      const usernameInput = getter.getUsernameInput();
      const emailInput = getter.getEmailInput();
      const passwordInput = getter.getPasswordInput();
      const signupButton = getter.getSignUpButton();
      const notificationCheckbox = getter.getNotficationCheckbox();

      expect(usernameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(signupButton).toBeInTheDocument();
      expect(notificationCheckbox).toBeInTheDocument();
    })
  })

  describe("Validation", () => {

    it("should display validation errors for invalid email", async () => {
      render(<SignUp />);
      const emailInput = getter.getEmailInput();

      // Invalid email + blur
      userEvent.clear(emailInput);
      userEvent.type(emailInput, "example.com");
      userEvent.tab();
      let emailWarning = await getter.getEmailWarning();
      expect(emailWarning).toBeInTheDocument();

      // Invalid email + pressing enter key
      userEvent.clear(emailInput);
      userEvent.type(emailInput, "example.com{enter}");
      emailWarning = await getter.getEmailWarning();
      expect(emailWarning).toBeInTheDocument();

      debug();
    });

    it("should display validation errors for short password", async () => {
      render(<SignUp />);
      const passwordInput = getter.getPasswordInput();

      // Short password + blur
      userEvent.clear(passwordInput);
      userEvent.type(passwordInput, "1234567{enter}");
      let passwordLengthWarning = await getter.getPasswordLengthWarning();
      expect(passwordLengthWarning).toBeInTheDocument();

      // Short password + pressing enter key
      userEvent.clear(passwordInput);
      userEvent.type(passwordInput, "12345");
      userEvent.tab();
      passwordLengthWarning = await getter.getPasswordLengthWarning();
      expect(passwordLengthWarning).toBeInTheDocument();

      debug();

    });

    //   it("should display success message on successful sign-up", async () => {
    //     render(<SignUp />);
    //   });

    it("should display error message on sign-up failure", async () => {
      render(<SignUp />);
      const usernameInput = getter.getUsernameInput();
      const emailInput = getter.getEmailInput();
      const passwordInput = getter.getPasswordInput();
      const signupButton = getter.getSignUpButton();

      userEvent.type(usernameInput, "testuser");
      userEvent.type(emailInput, "bbisann@gmail.com");
      userEvent.type(passwordInput, "12345678");
      userEvent.click(signupButton);

      const signUpError = await getter.getSignUpError();
      expect(signUpError).toBeInTheDocument();
      debug();

    });

    describe("Form Interaction", () => {
      it("should enable Sign Up button when form is valid", async () => {
        render(<SignUp />);
        const usernameInput = getter.getUsernameInput();
        const emailInput = getter.getEmailInput();
        const passwordInput = getter.getPasswordInput();

        userEvent.type(usernameInput, "testuser");
        userEvent.type(emailInput, "bbisann@gmail.com");
        userEvent.type(passwordInput, "12345678");

        const signupButton = getter.getSignUpButton();
        expect(signupButton).toBeEnabled();
        debug();
      });
    });

    //   it("should disable Sign Up button when form is invalid", async () => {
    //     render(<SignUp />);
    //   });

    //   it("should update form fields on user input", async () => {
    //     render(<SignUp />);
    //   });

    //   it("should redirect user to home page after successful signup", async () => {
    //     render(<SignUp />);
    //   });
  });
});
