import { cp, readdir, mkdir, readFile } from 'node:fs/promises';
import fs from 'fs'
import * as t from '@babel/types';
import generator from '@babel/generator';
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import prettier from 'prettier';
import kleur from 'kleur';

//capture the new version from the command line parameter
let params = process.argv
const [_, __, newVersion] = params

// Logging utilities.
const done = (...message) => console.log(kleur.bold().green('✔︎'), ...message);


/**
 * Resolve a file path relative to this script.
 * @param {string} path
 */
const resolve = (path) => new URL(path, import.meta.url);


class VersionManager {
	/**
	 * Format a code string with this project’s Prettier config.
	 * @param {string} code Code to format
	 * @param {string} filepath Filepath of code (used by Prettier to decide which parser to use)
	 * @returns {string} Formatted code string
	 */
	static format = (code, filepath) =>
		prettier.format(code, { ...VersionManager.prettierOpts, filepath });

    /** This project’s prettier config. */
	static prettierOpts = JSON.parse(
		fs.readFileSync(resolve('../.prettierrc'), { encoding: 'utf-8' })
	);


    getLastVersion() {
        /** Parse file contents to an AST using Babel. */
		const stringToAST = (code) =>
			parser.parse(code, { sourceType: 'unambiguous', plugins: ['typescript'] });

		const versionsListPath = '../src/config.ts';

		// Load and parse the current list of languages.
		const source = fs.readFileSync(resolve(versionsListPath), { encoding: 'utf-8' });
		const ast = stringToAST(source);

		let lastVersion = null;

		traverse.default(ast, {
			
			// Handle the set of RTL languages.
			ExportNamedDeclaration: (path) => {
                console.log("Checking export named declaration...")
				const namedExport = path.node.declaration;
				if (!t.isVariableDeclaration(namedExport)) return;

                console.log("Checking if it's the right one...")
				const declarator = namedExport.declarations[0];
				if (declarator.id.name !== 'VERSIONS') return;

				const versionsArray = declarator.init.elements;

                lastVersion = versionsArray[0].properties[0].value.value
			},
		});

        return lastVersion
    }


    updateVersionList() {
		/** Parse file contents to an AST using Babel. */
		const stringToAST = (code) =>
			parser.parse(code, { sourceType: 'unambiguous', plugins: ['typescript'] });
		/** Compile an AST using Babel. */
		const astToString = (ast) => generator.default(ast).code;

		const versionsListPath = '../src/config.ts';

		// Load and parse the current list of languages.
		const source = fs.readFileSync(resolve(versionsListPath), { encoding: 'utf-8' });
		const ast = stringToAST(source);

		let versionAlreadyInList = false;

		traverse.default(ast, {
			
			// Handle the set of RTL languages.
			ExportNamedDeclaration: (path) => {
                //console.log("Checking export named declaration...")
				const namedExport = path.node.declaration;
				if (!t.isVariableDeclaration(namedExport)) return;

                //console.log("Checkikng if it's the right one...")
				const declarator = namedExport.declarations[0];
				if (declarator.id.name !== 'VERSIONS') return;

				const versionsArray = declarator.init.elements;

				const versionAlreadyInList = versionsArray.find((elem) => { 
                    return elem.properties[0].value.value === newVersion
                });
				if (!versionAlreadyInList) {
                    //if the version is not already there, we have to.
                    //1. Update the url of the LAST version so it's not empty anymore
                    //2. Add the new version with an empty url
                    versionsArray[0].properties[1].value.value = "/v" + versionsArray[0].properties[0].value.value

                    versionsArray.unshift(t.objectExpression([
                        t.objectProperty(t.stringLiteral("title"), t.stringLiteral(newVersion)),
                        t.objectProperty(t.stringLiteral("url"), t.stringLiteral(""))
                    ]));
                } 
			},
		});

		if (!versionAlreadyInList) {
			VersionManager.format(astToString(ast), versionsListPath).then((newCode) => {
                console.log(newCode)
                fs.writeFileSync(resolve(versionsListPath), newCode, { encoding: 'utf-8' });
                done('Updated', kleur.bold(versionsListPath));
            });
		}
	}
}

async function getLangs() {
    let content = await readFile('./src/i18n/languages.ts')
    let __langs = null
    content = content.toString().replace("export default", "__langs = ")
    content = content.replace("export", "")
    eval(content)
    return __langs
}

const _src = "./src/pages/" 

async function duplicateLang(lang, destVersion) {
    let src = _src + lang
    let dest = "./src/pages/" + lang + "/v" + destVersion + "/"

    let fnames = await readdir(src)
    fnames = fnames.filter( n => n.match('v[0-9]+') == null)
    console.log(fnames)

    console.log("Creating destination folder....")
    try{
        await mkdir(dest)
    } catch (e)  {
        if(e.code == "EEXIST") {
            console.log("--- Folder already exists, skipping")
        } else {
            console.log(e)
        }        
    }

    console.log("Copying files into new version: ", destVersion)
    fnames.forEach ( async (f) => {
        let sourceFolder = src + "/" + f
        let destinationPath = dest + f
        try {
            await cp(sourceFolder, destinationPath, {
                filter: (source, destination) => {
                    console.log("Copying...", source, "->", destinationPath)
                    return true
                },
                recursive: true
            })
        } catch(err) {
            console.log(err)
        }
    })
    
}

/*
1. get the last version
2. create a folder for the new version
3. copy current files into new version
4. update the config file list of versions
*/
async function copyNewVersion(vnumber, basePath = "") {
    const src = _src

    let vm = new VersionManager()
    let currentVersion = vm.getLastVersion()
    let languages = await getLangs()
    vm.updateVersionList()
    const langs = Object.keys(languages)
    langs.forEach( async (lang) => {
        await duplicateLang(lang, currentVersion)
    })    

    console.log("Copying files into new version: ", vnumber)
}

function validateNewVersion(v) {
    if(!v.match(/[0-9]+\.[0-9]+\.[0-9]+/)) {
        throw new Error("Invalid new version format, it needs to be: <major>.<minor>.<patch>")
    }
}

function showHelp() {
    console.log(`
    CLI tool to add a new version to the documentation.
    
    Usage:
    
    $ node scripts/add-new-version.mjs <major>.<minor>.<patch>`)
}

(async _ => {
    try {
        if(!newVersion) return showHelp()
        validateNewVersion(newVersion)
        
        await copyNewVersion(newVersion)
    } catch (e) {
        console.log(kleur.bold().red("ERROR: "), e.message)
    }
})()