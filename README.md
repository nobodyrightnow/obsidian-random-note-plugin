# Obsidian "Random Note from Folder" Plugin
This is a simple plugin that allows the user to input a path to have a note chosen from.
This is a plugin for Obsidian (https://obsidian.md).

This project was customized from the Obsidian sample plugin repo at https://github.com/obsidianmd/obsidian-sample-plugin?utm_source=chatgpt.com, which uses TypeScript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in TypeScript Definition format, which contains TSDoc comments describing what it does.

This plugin:

- Adds a ribbon icon, which opens a Modal for text input when clicked.
- Checks for a folder at the specified path from the user.
- Recursively searches the folder and subfolders for MD files.
- Picks a random MD file and opens it in a new tab.
- Updates the user on its progress and any errors during runtime.

## How to use

- Click the dice icon on the ribbon.
- Type in the path of the folder you wish to choose from, relative to the root of the vault.
- Press the dice button or "Enter"
- If the folder cannot be found, ensure you formatted it correctly. Top level folders will just be their name, while subfolders' paths will be "TopLevel/SubFolder".

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/random-file-from-folder-plugin/`.
