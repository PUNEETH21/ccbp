In this practice let's build a **Layout Builder App** by applying the concepts we have learned till now.

### Refer to the image below:

<br/>
<div style="text-align: center;">
    <img src="https://assets.ccbp.in/frontend/content/react-js/layout-builder-output.gif" alt="Layout Builder Output" style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

#### Design Files

<details>
<summary>Click to view the Design Files</summary>

- [Extra Small (Size < 576px) and Small (Size >= 576px)](https://assets.ccbp.in/frontend/content/react-js/layout-builder-sm-output.png)
- [Medium (Size >= 768px), Large (Size >= 992px) and Extra Large (Size >= 1200px)](https://assets.ccbp.in/frontend/content/react-js/layout-builder-lg-output.png)

</details>

### Project Set Up Instructions

<details>
<summary>Click to view the Set Up Instructions</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Project Completion Instructions

<details>
<summary>Click to view the Functionality to be added</summary>

#### Add Functionality

The app must have the following functionalities

- Initially, the app consists of 3 HTML checkbox input elements with label text as Content, Left Navbar, Right Navbar respectively.
- Initially, every checkbox should be checked and all the elements in the layout should be displayed.
- When the Content checkbox is unchecked then the content element should not be displayed.
- When the Left Navbar checkbox is unchecked then the Left Navbar element should not be displayed.
- When the Right Navbar checkbox is unchecked then the Right Navbar element should not be displayed.
- The following are the keys used in the context
  - `showContent` - this variable is used to display the Content Element
  - `showLeftNavbar` - this variable is used to display the Left Navbar Element
  - `showRightNavbar` - this variable is used to display the Right Navbar Element
  - `onToggleShowContent` - this function is used to update the value of the `showContent`
  - `onToggleShowLeftNavbar` - this function is used to update the value of the `showLeftNavbar`
  - `onToggleShowRightNavbar` - this function is used to update the value of the `showRightNavbar`
- When the checkbox is checked, then the respective element should be displayed accordingly.

</details>

<details>
<summary>Click to view the Implementation Files</summary>

- Your task is to complete the implementation of
  - `src/App.js`
  - `src/App.css`
  - `src/components/ConfigurationController/index.js`
  - `src/components/ConfigurationController/index.css`
  - `src/components/Layout/index.js`
  - `src/components/Layout/index.css`
  - `src/components/Header/index.js`
  - `src/components/Header/index.css`
  - `src/components/Body/index.js`
  - `src/components/Body/index.css`
  - `src/components/Footer/index.js`
  - `src/components/Footer/index.css`
  </details>

<details>
<summary>Click to view the Components Structure</summary>

#### Components Structure

<br/>
<div style="text-align: center;">
    <img src="https://assets.ccbp.in/frontend/content/react-js/layout-builder-component-breakdown-structure.png" alt="layout builder component structure breakdown" style="max-width:100%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

</details>

### Resources

<details>
<summary>Colors</summary>

#### Colors

<div style="background-color: #475569; width: 150px; padding: 10px; color: white">Hex: #475569</div>
<div style="background-color: #e2e8f0; width: 150px; padding: 10px; color: black">Hex: #e2e8f0</div>
<div style="background-color: #f1f5f9; width: 150px; padding: 10px; color: black">Hex: #f1f5f9</div>
<div style="background-color: #64748b; width: 150px; padding: 10px; color: white">Hex: #64748b</div>
<div style="background-color: #cbd5e1; width: 150px; padding: 10px; color: black">Hex: #cbd5e1</div>

<br/>
</details>

#### Font-families

- Roboto

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - Don't change the component folder names as those are the files being imported into the tests.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
