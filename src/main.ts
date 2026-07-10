import {
	App,
	Modal,
	Notice,
	Plugin,
	TFolder,
	TFile,
	Setting
} from 'obsidian';

export default class RandomNoteFromFolderPlugin extends Plugin {

	async onload() {
		// This creates an icon in the left ribbon.
		this.addRibbonIcon('dice', 'Pick random file from folder', () => {
			// open modal and handle input
			new inputModal(this.app, async (path) => {
				const folder = this.findFolder(path);
				
				// handle case where a folder is not found
				if (folder === null) {
					return;
				}
				
				const chosen_file = this.chooseRandomFileInFolder(folder);

				// handle case where folder is empty
				if (chosen_file === null) {
					return;
				}

				await this.openNote(chosen_file);
			}).open();
		});
	}

	// METHODS FOR CHOOSING RANDOM MD FILE

	findFolder(path: string): TFolder | null {
		const folder = this.app.vault.getAbstractFileByPath(path);
		if (folder instanceof TFolder) {
			new Notice("Folder found!");
			return folder;
		} else {
			new Notice("Folder could not be found");
			return null;
		}
	}

	chooseRandomFileInFolder(folder: TFolder): TFile | null {
		const notes: TFile[] = [];

		const collectNotes = (currentFolder: TFolder) => {
			for (const child of currentFolder.children) {
				if (child instanceof TFile) {
					notes.push(child);
				} else if (child instanceof TFolder) {
					collectNotes(child);
				}
			}
		}

		collectNotes(folder);

		if (notes.length === 0) {
			new Notice('This folder does not have any notes!');
			return null;
		} else {
			new Notice(`${notes.length} notes found`);
		}
		
		new Notice('Choosing note...');
		const index = Math.floor(Math.random() * notes.length);
		return notes[index]!;
	}

	async openNote(note: TFile): Promise<void> {
		const leaf = this.app.workspace.getLeaf(true);
		await leaf.openFile(note);
		new Notice(`Opened note ${note.basename}`);
	}
}

class inputModal extends Modal {
	constructor(app: App, onSubmit: (path: string) => void) {
		super(app);
		
		this.setTitle('Designate folder (path is relative to root!)');
		let path = '';
		
		// Textbox
		new Setting(this.contentEl)
			.setName('Path')
			.addText((text) => {
				text.inputEl.addClass("random-note-input");
				text.onChange((value) => {
				path = value;
			});

			text.inputEl.addEventListener("keydown", (event) => {
				if (event.key === 'Enter') {
					this.close();
					onSubmit(path);
				}
			})
		});
		
		// Submit button
		new Setting(this.contentEl)
		.addButton((btn) =>
			btn
				.setIcon('dice')
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(path);
				}));
	}
}