# Translating the OpenReplay documentation


## How to translate a page from the documentation

To translate a page from the documentation into an already existing language (i.e. if there is a folder for it inside the `src/pages` folder), simply create the page with the exact same name it has for the English language.

You also have to reproduce the entire folder structure containing that file.

For example: 

If you want to translate the content of the file located at `src/pages/en/plugins/assist.mdx` into spanish and you already have the folder `src/pages/es` ,then simply duplicate the `assist.mdx` file and put it inside `src/pages/es/plugins/`.

## Creating a brand new language from scratch
If you're going to add a new language, there are a few things to keep in mind:

1. First of all, thank you!
2. Second, use the script `src/scripts/add-language.mjs` with the following line: `$ node src/scripts/add-language.mjs` 
3. Answer the questions asking for the language code (i.e. "es", "pr", etc), the language name and whether you write it from left to right, or the other way around.

By then, the script will have created:
- A new folder inside the `src/pages` folder using the language code  (i.e. "es").
- A new dropdown item inside the language dropdown.
- A new folder inside `src/i18n` using the language code.
- Inside this new folder, you'll find 3 files (`docsearch.ts`, `nav.ts` and `ui.ts`) where you can add translations for the rest of the interface of the website (notice messages, text for the search widget, etc).

Once this process is done, you can start adding whatever content you want to translate.
Just remember, you have to duplicate exactly the same folder structure as the original file (the english version).
 