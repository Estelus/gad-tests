import { randomUserData } from '../src/factories/user.factory';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify registration', () => {
  test(
    'register with correct credentials and login',
    { tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03'] },
    async ({ page }) => {
      //Arrange
      const registerUserData = randomUserData();
      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();
      await registerPage.register(registerUserData);
      const expectedAlertPopupText = 'User created';

      // Assert
      await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);

      const loginPage = new LoginPage(page);
      await loginPage.waitForPageToLoadURL();
      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain('Login');

      // Assert
      await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      const welcomePage = new WelcomePage(page);
      const titleWelcomePage = await welcomePage.title();
      expect(titleWelcomePage).toContain('Welcome');
    },
  );
  test(
    'register with incorrect data - invalid email',
    { tag: ['@GAD-R03-04'] },
    async ({ page }) => {
      //Arrange
      const registerUserData = randomUserData();
      registerUserData.userEmail = '1nvalidEmail';

      const expectedErrorText = 'Please provide a valid email address';
      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();
      await registerPage.register(registerUserData);

      // Assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
  test(
    'register with incorrect data -  email not provided',
    { tag: ['@GAD-R03-04'] },
    async ({ page }) => {
      //Arrange
      const expectedErrorText = 'This field is required';
      const registerUserData = randomUserData();
      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();
      await registerPage.userFirstNameInput.fill(
        registerUserData.userFirstName,
      );
      await registerPage.userLastNameInput.fill(registerUserData.userLastName);
      await registerPage.userPasswordInput.fill(registerUserData.userPassword);
      await registerPage.registerButton.click();

      // Assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
});
