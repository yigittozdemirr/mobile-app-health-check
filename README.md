# MedGuide: Interactive Health and Medication Assistant

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An interactive patient education app that turns complex medical instructions, such as rational drug use and colonoscopy preparation, into an easy-to-follow mobile experience. The app content is in Turkish.

**Demo:** watch [`app_video.mp4`](app_video.mp4) for a full walkthrough of the interface.

> This app is an educational project and does not replace advice from a healthcare professional.

## Features

- **Step-ordering game:** put the steps of a medication preparation, such as mixing an antibiotic, into the correct order and check the result.
- **Educational modules:** readable guides on what to do before, during and after a procedure.
- **Knowledge quizzes:** multi-question quizzes with explanations that reinforce what was learned.
- **Calm, readable design:** a high-contrast palette of blues and greens.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React Native and Expo | Cross-platform mobile app |
| Expo Router | Application entry and routing |
| TypeScript | Type safety |
| NativeWind | Styling |
| React Hooks | Quiz and game state |
| Lucide | Icons |

## Getting started

You need [Node.js](https://nodejs.org/) (LTS) and the [Expo Go](https://expo.dev/go) app or an emulator.

The app lives in the `frontend/` directory:

```bash
git clone https://github.com/yigittozdemirr/mobile-app-health-check.git
cd mobile-app-health-check/frontend
npm install
npx expo start
```

Scan the QR code with Expo Go on your Android or iOS device.

## Project structure

```text
.
├── frontend/          # Expo application (screens in app/index.tsx)
├── backend/           # Minimal Hono server template, not used by the app's screens
└── app_video.mp4      # Demo video
```

## Author

**Yiğit Özdemir**: [@yigittozdemirr](https://github.com/yigittozdemirr)

## License

[MIT](LICENSE)
