// Interfaces TypeScript précises basées sur les spécifications FFTT Smartping 2.0

/**
 * Interface pour les épreuves selon xml_epreuve.php
 */
export interface Epreuve {
  id: number;
  organismeId: number;
  libelle: string;
}

/**
 * Interface pour les résultats individuels selon xml_result_indiv.php
 */
export interface ResultatIndividuel {
  libelle: string;
  lien: string;
}

export interface ClassementIndividuel {
  rang: number;
  nom: string;
  classement: string;
  club: string;
  points: number;
}

export interface PartieIndividuelle {
  libelle: string;
  vain: string;
  perd: string;
  forfait: string;
}

/**
 * Interface pour les classements critérium selon xml_res_cla.php
 */
export interface ClassementCriterium {
  rang: number;
  nom: string;
  classement: string;
  club: string;
  points: number;
}

/**
 * Interface pour les réponses d'initialisation selon xml_initialisation.php
 */
export interface InitialisationResponse {
  initialisation: {
    appli: string;
    superviseur: string;
    resultat: string;
    classement: string;
    operateur: string;
    premium: string;
    message: string;
  };
}

/**
 * Interface pour les réponses de clubs selon xml_club_dep2.php et xml_club_b.php
 */
export interface ClubResponse {
  club: ClubItem[];
}

export interface ClubItem {
  idclub: string;
  numero: string;
  nom: string;
  validation: string;
}

/**
 * Interface pour les réponses de joueurs selon xml_joueur.php
 */
export interface JoueurResponse {
  joueur: {
    licence: string;
    nom: string;
    prenom: string;
    club: string;
    nclub: string;
    natio: string;
    clglob: string;
    point: string;
    aclglob: string;
    apoint: string;
    clast: string;
    categ: string;
    rangreg: string;
    rangdep: string;
    valcla: string;
    clpro: string;
    valinit: string;
  };
}

/**
 * Interface pour les réponses de licences selon xml_licence.php et xml_licence_b.php
 */
export interface LicenceResponse {
  licence: {
    idlicence: string;
    nom: string;
    prenom: string;
    licence: string;
    numclub: string;
    nomclub: string;
    sexe: string;
    type: string;
    certif: string;
    validation: string;
    echelon: string;
    place: string;
    point: string;
    cat: string;
    pointm?: string;
    apointm?: string;
    initm?: string;
  };
}

/**
 * Interface pour les réponses d'organismes selon xml_organisme.php
 */
export interface OrganismeResponse {
  organisme: {
    libelle: string;
    id: string;
    code: string;
  }[];
}

/**
 * Interface pour les réponses de divisions selon xml_division.php
 */
export interface DivisionResponse {
  division: {
    iddivision: string;
    libelle: string;
  }[];
}

/**
 * Interface pour les réponses d'équipes selon xml_equipe.php
 */
export interface EquipeResponse {
  equipe: {
    libequipe: string;
    libdivision: string;
    idepr: string;
    libepr: string;
    liendivision: string;
  }[];
}

/**
 * Interface pour les réponses de résultats équipes selon xml_result_equ.php
 */
export interface ResultatEquipeResponse {
  tour?: {
    libelle: string;
    equa: string;
    equb: string;
    scorea: string;
    scoreb: string;
    lien: string;
  }[];
  poule?: {
    lien: string;
    libelle: string;
  }[];
  classement?: {
    poule: string;
    clt: string;
    equipe: string;
    joue: string;
    pts: string;
    numero: string;
  }[];
}

/**
 * Interface pour les réponses de rencontres selon xml_chp_renc.php
 */
export interface RencontreResponse {
  resultat: {
    equa: string;
    equb: string;
    resa: string;
    resb: string;
  };
  joueur: {
    xja: string;
    xca: string;
    xjb: string;
    xcb: string;
  }[];
  partie: {
    ja: string;
    scorea: string;
    jb: string;
    scoreb: string;
  }[];
}

/**
 * Interface pour les réponses de parties selon xml_partie.php et xml_partie_mysql.php
 */
export interface PartieResponse {
  partie: {
    licence?: string;
    advlic?: string;
    vd?: string;
    numjourn?: string;
    codechamp?: string;
    date?: string;
    advsexe?: string;
    advnompre?: string;
    pointres?: string;
    coefchamp?: string;
    advclaof?: string;
    nom?: string;
    classement?: string;
    epreuve?: string;
    victoire?: string;
    forfait?: string;
  }[];
}

/**
 * Interface pour les réponses d'actualités selon xml_new_actu.php
 */
export interface ActualiteResponse {
  news: {
    date: string;
    titre: string;
    description: string;
    url: string;
    photo: string;
  }[];
}

/**
 * Interface pour les réponses d'historique selon xml_histo_classement.php
 */
export interface HistoriqueResponse {
  histo: {
    echelon: string;
    place: string;
    point: string;
    saison: string;
    phase: string;
  }[];
}
