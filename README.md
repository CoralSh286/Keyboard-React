# React Keyboard & Rich Text Editor Component

## Overview
This React component provides an interactive on-screen keyboard integrated with a rich text editor. It includes user authentication, allowing different users to have their own saved fields stored in local storage.

## Features
- **On-Screen Keyboard**: A customizable virtual keyboard for text input.
- **Rich Text Editor**: Supports formatted text, bold, italic, underline, and more.
- **User Authentication**: Allows users to log in and maintain separate sessions.
- **Per-User Fields**: User-specific data is saved in local storage for persistence.
- **Local Storage Integration**: Saves user input and preferences persistently.

## Installation
```sh
npm install 
```

## How It Works
1. **Login**: Users must log in to access their saved data.
2. **Editor & Keyboard**: Users can type using the rich text editor or the on-screen keyboard.
3. **Save & Load**: Content is saved in local storage per user and automatically loaded upon login.

## Dependencies
- **React**: UI framework.
