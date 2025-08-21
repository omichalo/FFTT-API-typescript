import crypto from "crypto";
import axios, { AxiosResponse } from "axios";
import { decode } from "html-entities";
import { ResponseData } from "./Model/ResponseData.interface";
import xml2js from "xml2js";
import { InvalidURIParametersException } from "./Exception/InvalidURIParametersException";
import { NoFFTTResponseException } from "./Exception/NoFFTTResponseException";
import { URIPartNotValidException } from "./Exception/URIPartNotValidException";
import { UnauthorizedCredentials } from "./Exception/UnauthorizedCredentials";
import iconv from "iconv-lite";
import { Utils } from "./Service/Utils.service";

export class ApiRequest {
  private password: string;
  private id: string;

  // URL officielle de l'API FFTT v2 selon les spécifications
  private readonly FFTTURL = "https://apiv2.fftt.com/mobile/pxml/";

  private xml2jsOptions: {
    mergeAttrs: boolean;
    trim: boolean;
    explicitRoot: boolean;
    explicitArray: boolean;
  } = {
    mergeAttrs: true,
    trim: true,
    explicitRoot: false,
    explicitArray: false,
  };

  constructor(password: string, id: string) {
    this.password = password;
    this.id = id;
  }

  private prepare(
    request: string,
    params: Record<string, string | number | null | undefined> = {},
    queryParameter: string | null = null
  ): string {
    // Utilisation du format timestamp FFTT conforme aux spécifications
    const time = Utils.getFFTTTimestamp();
    const timeCrypted = crypto.createHmac("sha1", this.password).update(time).digest("hex");

    let uri = `${this.FFTTURL}${request}.php?serie=${this.id}&tm=${time}&tmc=${timeCrypted}&id=${this.id}`;

    if (queryParameter) uri += `&${queryParameter}`;
    Object.keys(params).forEach((key: any) => (uri += `&${key}=${params[key]}`));

    return uri;
  }

  public send = async (uri: string): Promise<ResponseData> => {
    let response: AxiosResponse = await axios.get(uri, {
      responseType: "arraybuffer",
    });
    let content: any = response.data;
    content = iconv.decode(Buffer.from(content), "ISO-8859-1");
    //content = content.replace(/&(?!#?[a-z0-9]+;)/, "&amp;"); // TODO Régler 'n�7'
    // content = decodeURIComponent(escape(content));
    content = decode(content);
    content = await xml2js.parseStringPromise(content, this.xml2jsOptions);
    return content;
  };

  public async get(
    request: string,
    params: Record<string, string | number | null | undefined> = {},
    queryParameter: string | null = null
  ): Promise<ResponseData> {
    try {
      let chaine = this.prepare(request, params, queryParameter);
      const result = await this.send(chaine);

      // Validation des résultats selon les spécifications FFTT
      if (!result || typeof result !== "object") {
        throw new InvalidURIParametersException(request, params);
      }

      // Vérification de la présence d'une erreur FFTT (propriété '0' indique une erreur)
      if (result.hasOwnProperty("0")) {
        throw new NoFFTTResponseException(chaine);
      }

      // Vérification de la structure de base selon les specs
      this.validateFFTTResponse(result, request);

      return result;
    } catch (e: any) {
      // Gestion des erreurs HTTP spécifiques
      if (e.response?.status === 401) {
        try {
          const result = await xml2js.parseStringPromise(e.response.data, this.xml2jsOptions);
          throw new UnauthorizedCredentials(request, result.erreur || "Non autorisé");
        } catch (parseError) {
          throw new UnauthorizedCredentials(request, "Erreur d'authentification");
        }
      }

      if (e.response?.status === 404) {
        throw new URIPartNotValidException(request);
      }

      // Gestion des erreurs 400 (Bad Request) - paramètres invalides
      if (e.response?.status === 400) {
        const errorMessage = e.response.data?.toString() || "Paramètres invalides";
        if (errorMessage.includes("n'a pas eu tous les arguments nécessaires")) {
          throw new InvalidURIParametersException(request, params);
        }
        throw new Error(`Erreur API 400: ${errorMessage}`);
      }

      // Gestion des erreurs 500 (Internal Server Error) - problème côté serveur
      if (e.response?.status === 500) {
        throw new NoFFTTResponseException(`Erreur serveur FFTT pour ${request}`);
      }

      // Si c'est déjà une exception personnalisée, la relancer
      if (
        e instanceof InvalidURIParametersException ||
        e instanceof NoFFTTResponseException ||
        e instanceof UnauthorizedCredentials ||
        e instanceof URIPartNotValidException
      ) {
        throw e;
      }

      // Gestion générique des erreurs avec plus de contexte
      const errorMessage = e.message || "Erreur inconnue";
      const paramsStr = Object.keys(params)
        .map(k => `${k}=${params[k]}`)
        .join(", ");
      throw new Error(`Erreur API: ${errorMessage} (${request} avec paramètres: ${paramsStr})`);
    }
  }

  /**
   * Valide la structure de la réponse selon les spécifications FFTT
   * @param result - Résultat de l'API
   * @param request - Nom de la requête
   */
  private validateFFTTResponse(result: any, request: string): void {
    // Validation de base : vérifier que la réponse n'est pas vide
    if (!result || Object.keys(result).length === 0) {
      throw new NoFFTTResponseException(`Réponse vide pour ${request}`);
    }

    // Validation spécifique selon le type de requête (seulement pour les cas critiques)
    switch (request) {
      case "xml_initialisation":
        // Pour l'initialisation, on accepte toute réponse valide
        // La validation se fait au niveau de l'application
        break;
      case "xml_club_detail":
        // Pour les détails de club, accepter toute réponse non vide
        // La validation se fait au niveau de l'application
        break;
      case "xml_division":
        // Pour les divisions, accepter toute réponse non vide
        // La validation se fait au niveau de l'application
        break;
      case "xml_res_cla":
        // Pour les classements critérium, accepter toute réponse non vide
        // La validation se fait au niveau de l'application
        break;
      case "xml_club_dep2":
      case "xml_club_b":
        // Pour les clubs, vérifier que la réponse contient des données
        if (!result.club && Object.keys(result).length === 1) {
          throw new NoFFTTResponseException(`Réponse invalide pour ${request}`);
        }
        break;
      case "xml_joueur":
      case "xml_licence_b":
        // Pour les joueurs, vérifier que la réponse contient des données
        if (!result.joueur && !result.licence && Object.keys(result).length === 1) {
          throw new NoFFTTResponseException(`Réponse invalide pour ${request}`);
        }
        break;
      // Pour les autres endpoints, on fait confiance à la réponse
      // La validation se fait au niveau de l'application
    }
  }
}
