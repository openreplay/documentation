/**
 * Ceci configure la barre latérale de navigation.
 * Toutes les autres langues suivent cet ordre/structure et reviendront à l'anglais pour toutes les entrées non traduites.
 */
import { NavDictionary } from '../translation-checkers';

export default NavDictionary({
	startHere: 'START-HERE-TRANSLATION',
	'getting-started': 'GETTING-STARTED-TRANSLATION',
});

export const subMenus = NavDictionary({}, "subMenus")
