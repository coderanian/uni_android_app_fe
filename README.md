# BuSaSh: Front-End-Application
A React Native application. Table of contents:
1. [Introduction and Features of Andoird app BUSASH](#introduction-and-features-of-andoird-app-busash)
2. [Structure](#structure)
3. [Installation](#installation)
4. [Package Usage](#package-usage)
5. [App Screenshots](#app-screenshots)

## Introduction and Features of Andoird app BUSASH
This is frontend application based on React Native for university Android development class. Backend application bootstrapped by Spring and coded in Kotlin is available in separate repository.
- Goods Exchange Platform: Facilitates the exchange, sale, or free transfer of goods using React Native technology.
- Location Integration: Utilizes map integration for accessing locations, allowing users to view nearby offers and transactions.
- Transaction Tracking: Includes counters to track successful transactions and active offers, providing users with insights into platform activity.
- Photo Capture: Enables users to take and upload photos of goods through camera access, enhancing the listing process.
- User Registration and encrypted authentication: Allows users to register on the platform, enabling them to create and manage their offers.
- Offer Creation: Users can create detailed offers, including descriptions, images, and other relevant information about the goods they are offering.
- Geolocation Search: Facilitates searching for goods within a specified geographic radius, helping users find offers near their location.
- Detailed Offer View: Provides a detailed view of each offer and its provider, allowing users to make informed decisions.
- Reservation System: Includes a reservation feature with a timer (1 hour), enabling users to reserve items temporarily while they make a decision or complete a transaction.

## Structure
- App.jsx:  root file and starting point of the application
- /assets:
  - /fonts:  Custom fonts to be used in the project
  - /images: Local images to be used in the project (e.g. stock images, icons, diff. formats)
  - /styles: React Native stylesheets for screens and components
- /context: Storage file defining API communication and token caching with Axios library
- /components: Reusable React / React Native components to be used in screens
- /navigation: Configurations for app navigation bootstrapped by react-navigation
- /screens: individual screens / views
- /services: utility functions, modules, or services that provide specific functionality (API integrations, data handling, etc.)
- /utils: helper modules / functions to reuse across the application


## Installation
a). For APK:
1. Allow APK installation on your Android device and proceed with installation.
   
b). For local app emulation via Expo Go app:
1. You require IDE which can install packages via npm.
2. Application is using Expo for its build and testing, so you have to install Expo CLI.
3. Run npm i to install all the dependencies.
4. Once installed run npx expo to start the application, you may need to do it via default CMD if your IDE portray's QR-code wrong (cd to directory and run npx start).
5. Install Expo app on your smartphone and scan the QR code.
6. Now you can run app on your smartphone directly, no need to scan QR code each time as it should be saved in your app. Simply npx expo each time you work on the project.

c). For local app emulation via Expo Go app:
1. You require IDE which can install packages via npm and installed and configured Android emulator.
2. Application is using Expo for its build and testing, so you have to install Expo CLI.
3. Run npm i to install all the dependencies.
4. Once installed run npx expo start to start the application.
5. Now you can run app on your local Android emulator directly.

## Package Usage
This frontend application was bootstrapped with:
- [expo](https://docs.expo.dev/)
- [react](https://react.dev/learn)
- [react-native](https://reactnative.dev/docs/getting-started)
- [react-navigation](https://reactnavigation.org/docs/getting-started)
- [react-native-screens](https://reactnavigation.org/docs/getting-started)
- [react-native-vector-icons](https://reactnavigation.org/docs/getting-started)
- [axios](https://github.com/axios/axios)
- [expo-checkbox](https://docs.expo.dev/versions/latest/sdk/checkbox/)
- [expo-constants](https://docs.expo.dev/versions/latest/sdk/constants/)
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [expo-image-manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)
- [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [base64-js](https://www.npmjs.com/package/base64-js)
- [react-native-picker](https://docs.expo.dev/versions/latest/sdk/picker/)
- [react-native-popup-menu](https://github.com/instea/react-native-popup-menu)

1. Expo: 
- Expo is a set of tools and services for building and deploying React Native applications. It provides an easy way to start a React Native project and simplifies the development process by offering a variety of pre-built components and APIs. Expo also provides a convenient way to preview and publish your app without the need for native development tools.
- Expo Go app is used for app preview to access native smartphone features
2. React: 
- React is a JavaScript library for building user interfaces. In a React Native application, React is used for creating the user interface and defining the structure and behavior of components.
3. React Native:
- React Native is a framework for building mobile applications using React. It allows you to write code in JavaScript or TypeScript, and then use it to create native components for both iOS and Android platforms.
4. React Navigation:
- React Navigation is a popular library for handling navigation and routing in React Native applications. It provides a flexible and customizable way to manage the navigation flow between different screens and components in your app.
- Used for regular stack and bottom tap navigators
5. React Native Screens:
- Provides optimized native components for screen rendering in React Native apps, helping to enhance performance.
- Used in combination with React Navigation for screen rendering
6. React Native Vector Icons:
- Provides a wide range of customizable icons
- Used for various app UI components
7. Axios:
- Popular JavaScript library for making HTTP requests. 
- In a React Native application, Axios is commonly used for handling API calls and fetching data from external sources
8. Expo Checkbox:
- Allows you to create interactive checkboxes in your application since React Native checkbox component is depreciated
9. Expo Constants:
- Provides information about the device and environment your app is running on
- Used to access Expo host IP address for API-url building
10. Expo Secure Store:
- Secure storage API that allows you to store sensitive data, such as authentication tokens, securely on the device
11. Expo File System:
- Used for readAsStringAsync to convert b64 to string
- Seems to use some functions of base64-js
12. Expo Image Manipulator:
- Used for compressing and resizing images taken with camera
13. Expo Image Picker:
- Used to access native camera functions
- Can also be used for gallery access, but not implemented here
14. Expo Location:
- Used to access native location functions and retrieving geodata of user position
15. React-Native-Picker:
- Dropdown selection input box
16. React-Native-Popup-Menu:
- Custom popup menu in offers
17. EAS Build:
- Hosted service for building apps for Expo / React-Native projects

## App Screenshots

![busash_screenshot_offer_sortfilter](https://github.com/wrigglingmoray/uni_android_app_fe/assets/89016793/83bd859b-27e5-40be-966d-17515d4ce6e0)
![busash_screenshot_offer_sortfilter](https://github.com/wrigglingmoray/uni_android_app_fe/assets/89016793/83bd859b-27e5-40be-966d-17515d4ce6e0)
![busash_screenshot_offer_reserved](https://github.com/wrigglingmoray/uni_android_app_fe/assets/89016793/667ad961-ebe3-4294-98f1-0f115a436192)
![busash_screenshot_offer_search](https://github.com/wrigglingmoray/uni_android_app_fe/assets/89016793/7109fc5f-c06c-4b54-8613-a447cb340008)
![busash_screenshot_offer_new](https://github.com/wrigglingmoray/uni_android_app_fe/assets/89016793/9abdd7d5-65c9-437f-a89c-493018001c8f)
![busash_screenshot_user](https://github.com/wrigglingmoray/uni_android_app_fe/assets/89016793/c19a87e2-2191-4f1f-b749-67569379e940)
