# Real-Time Collaboration Note App

A simple note-taking application with real-time collaboration using React JS and Firebase.

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Styling](#styling)

## Overview

This project is a real-time collaboration note app built with React JS and Firebase. It allows multiple users to simultaneously edit the same note, with changes reflected in real-time. The app uses Firebase for real-time database and version history tracking.

## Features

-   Single note board for real-time collaboration
-   Real-time updates using Firebase Firestore
-   Rich text editing capabilities using React Quill
-   Version history to track changes made to each note

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Neh-Jain-21/mi-demo.git
    ```

2. Install dependencies:

    ```bash
    cd mi-demo
    npm install
    ```

3. Create a Firebase project and update `src/Helpers/Firebase.ts` with your Firebase configuration.

4. Start the development server:

    ```bash
    npm start
    ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Enter your name in the input box.
2. Click "Edit Note" to start editing the note board.
3. Collaborate in real-time with other users on the same note.
4. Changes are automatically saved and reflected in real-time.

## Styling

The styling for this app is provided using styled-components and CSS. You can customize the styles according to your preferences by modifying the file.
