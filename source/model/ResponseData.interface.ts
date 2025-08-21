import { Actualite } from "./Actualite";
import { DivisionRaw } from "./Raw/DivisionRaw.interface";
import { ClassementResultEquipeRaw } from "./Raw/ClassementResultEquipeRaw.interface";
import { EquipeRaw } from "./Raw/EquipeRaw.interface";
import { HistoriqueRaw } from "./Raw/HistoriqueRaw.interface";
import { OrganismeRaw } from "./Raw/OrganismeRaw.interface";
import { PartieRaw } from "./Raw/PartieRaw.interface";
import { PouleResultEquipeRaw } from "./Raw/PouleResultEquipeRaw.interface";
import { ClubRaw } from "./Raw/ClubRaw.interface";
import { ClubDetailsRaw } from "./Raw/ClubDetailsRaw.interface";
import { JoueurRaw } from "./Raw/JoueurRaw.interface";
import { ClassementRaw } from "./Raw/ClassementRaw.interface";
import { RencontreRaw } from "./Raw/RencontreRaw.interface";
import { TourResultEquipeRaw } from "./Raw/TourResultEquipeRaw.interface";

export interface ResponseData {
  organisme?: OrganismeRaw[];
  club?: ClubRaw[] | ClubDetailsRaw;
  joueur?: JoueurRaw[] | ClassementRaw;
  histo?: HistoriqueRaw[];
  partie?: PartieRaw[];
  equipe?: EquipeRaw[];
  classement?: ClassementResultEquipeRaw[];
  tour?: RencontreRaw[] | TourResultEquipeRaw[];
  news?: Actualite[];
  division?: DivisionRaw[];
  resultat?: unknown; // TODO: Créer une interface spécifique
  poule?: PouleResultEquipeRaw;
}
