# BuSaSh: Front-End-Application
A React Native application. Table of contents:
1. [Structure](#structure)
2. [Installation](#installation)

This wrapper package was bootstrapped with:
- [expo](https://docs.expo.dev/)
- [react](https://react.dev/learn)
- [react-native](https://reactnative.dev/docs/getting-started)
- [react-navigation](https://reactnavigation.org/docs/getting-started)
- [react-native-screens](https://reactnavigation.org/docs/getting-started)
- [react-native-vector-icons](https://reactnavigation.org/docs/getting-started)

## Structure
- /assets:
  - /fonts:  Custom fonts to be used in the project
  - /images: Local images to be used in the project (e.g. stock images, icons, diff. formats)
  - /styles: React Native stylesheets for screens and componets
- /components: Reusable React / React Native components to be used in screens
- /navigation: Configurations for app navigation bootstrapped by react-navigation
- /screens: individual screens / views
- /services: utility functions, modules, or services that provide specific functionality (API integrations, data handling, etc.)
- /utils: helper modules / functions to reuse accross the application

## Installation
1. Application is using Expo for its build and testing, so you have to install Expo CLI
2. Run npm i to install all the dependencies.
3. Once installed run npx expo to start the application, you may need to do it via default CMD if your IDE portray's QR-code wrong (cd to directory and run npx start)
4. Install Expo app on your smartphone and scan the QR code
5. Now you can run app on your smartphone directly, no need to scan QR code each time as it should be saved in your app. Simply npx expo each time you work on the project

