// Interface pour les objets avec des clés dynamiques mais des valeurs typées
export interface DynamicObj<T = unknown> {
  [key: string]: T;
}

// Interface spécifique pour les dates de publication
export interface PublicationDates {
  [month: number]: number;
}

// Interface pour les paramètres génériques
export interface GenericParams {
  [key: string]: string | number | boolean;
}

// Interface spécifique pour les joueurs
export interface JoueursMap {
  [key: string]: any; // TODO: Remplacer par le bon type
}

// Interface spécifique pour les joueurs formatés
export interface JoueursFormattedMap {
  [key: string]: any; // TODO: Remplacer par JoueurRencontre
}
