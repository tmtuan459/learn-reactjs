# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

src
| -- components (shared components between features)
| ---|--Loading
| ------|-- index.jsx
| ------|-- styles.scss
| -- features
| ---|--Todo
| ------|-- components (componenst of feature Todo)
| ------|-- pages (pages of feature Todo)
| ------|-- index.jsx (entry point of feature Todo)
| -- App.js

<!-- Install  -->

- npm install sass : S??? d???ng sass

  - n???u g???p l???i: g??? v?? c??i l???i ver 4 npm uninstall node-sass
    npm install node-sass@^4

- npm install query-string: s??? d???ng ????? chuy???n object sang string
  - ex: const paramsString = queryString.stringify(filters);(ex:\_limit=10&\_page=1)
- npm install classnames: M???t ti???n ??ch JavaScript ????n gi???n ????? n???i c??c t??n l???p v???i nhau m???t c??ch c?? ??i???u ki???n.

  - ex: import classNames from "classnames";  
     className={classNames({
    // install npm npm i --save classnames // d??ng c??i n??y th?? r???t g???n
    "todo-item": true, // v?? d??? c?? nhi???u class th?? r???t ti???n
    completedClassStyle: todo.status === "completed", //completedClassStyle l?? class s??? ??c add v??o n???u ??i???u ki???n b??n ph???i true
    })}

- install hook: npm install --save react-hook-form yup @hookform/resolvers @hookform/error-message
- T???o ra file jsconfig.json // file n??y ???????c t???o ra ????? gi???m thi???u th???i gian import, coppy // https://code.visualstudio.com/docs/languages/jsconfig
  ========================== HOOK =============================
