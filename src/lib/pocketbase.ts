import PocketBase, { type RecordModel } from "pocketbase";

export const pb = new PocketBase(import.meta.env.PUBLIC_PB_URL);

/** Un enregistrement de la collection "Projets" */
export interface Projet extends RecordModel {
  Titre: string;
  Sous_titres: string;
  Categorie: string[];
  Logiciels: string[];
  Date: string;
  Miniature: string;
}
