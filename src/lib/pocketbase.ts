import PocketBase, { type RecordModel } from "pocketbase";

// Lecture publique uniquement : aucune authentification n'est faite ici.
export const pb = new PocketBase(import.meta.env.PUBLIC_PB_URL);

/** Un enregistrement de la collection "Projets" */
export interface Projet extends RecordModel {
  Titre: string;
  Sous_titres: string;
  Categorie: string[];
  Logiciels: string[];
  Date: string;
  Client: string;
  Miniature: string;
  Galerie: string[];
  a_propos: string;
  defi: string;
  solution: string;
}

/** URL d'un fichier d'un projet (miniature ou image de la galerie) */
export const urlFichier = (projet: Projet, fichier: string, thumb?: string) =>
  pb.files.getURL(projet, fichier, thumb ? { thumb } : undefined);

/** Découpe un texte PocketBase en paragraphes (lignes vides) */
export const paragraphes = (texte = "") =>
  texte
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
