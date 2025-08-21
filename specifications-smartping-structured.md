# Spécifications techniques de l'API Smartping 2.0

------------------------------------------------------------------------

## Page 1

F.F.T.T. - API Smartping 2.0 Page 1 Edition du 26 janvier 2016

Spécifications techniques de l'API Smartping 2.0

Propriétaire : F.F.T.T.\
Auteur : Eric Caugant

------------------------------------------------------------------------

## Page 2

F.F.T.T. - API Smartping 2.0 Page 2

Version Date Modifications\
1.0 03/06/2015 Création\
1.1 01/07/2015 Ajout nouvelle interface xml_histo_classement\
1.2 26/08/2015 Correction paramètres sortie xml_liste_joueur_o\
Ajout paramètre en entrée xml_licence_b : club\
1.3 08/10/2015 Correction de xml_equipe.php (paramè tres d'entrée plus
complets)

Correction du paramètre sortie de xml\_ liste_joueur_o lors des
paramètres fournis en entrée nom prénom licence

1.4 16/12/2015 Ajout 1 paramètre sortie xml \_club_dep2\
Ajout d'une nouvelle interface xml_club_b\
1.5 19/01/2016 Ajout 2 paramètres sortie xml \_equipe : identifiant et
libellé de l'épreuve

1.6 21/01/2016 Ajout 1 paramètre en entrée xml_liste_joueur_o

1.7 26/01/2016 Ajout 1 paramètre en sortie xml_result_equ sur la méthode
classement

------------------------------------------------------------------------

## Page 3

F.F.T.T. - API Smartping 2.0 Page 3 Conventions

A chaque signataire de la convention, il sera attribué : - Un
identifiant d'application ( A001 etc...), passée en paramètre comme « id
» - Un mot de passe servant à crypter les paramètres d'identification.
Le timestamp crypté sera passé en paramètre comme « tmc » Cryptage du
timestamp : - Récupérer le timestamp ( « tm » dateheuresys() ) au format
année (4)+mois (2)+jour (2)+heure (2)+minutes (2)+secondes (2)+millièmes
(3) (YYYYMMDDHHMMSSmmm) .\
- Exemple en PHP\
- Crypter le mot de passe fourni par la FFTT (Méthode Hash MD5) :\
o $ccle =md5 ($motdepasse ); (code php)\
- Puis Crypter le Timestamp (Méthode Sha1) :\
o $tmc = hash_hmac("sha1",$ timestamp ,\$ccle); (code php. Chaine en
Hexa)\
- Exemple en Windev\
- dhParis est un DateHeure = DateHeureSys () - chMotdePasse = "FFTT" -
// Calcul de la cle de hash à partir du mot de passe\
- bufCleHash est un Buffer = Remplace (Minuscule (BufferVersHexa
(HashChaîne (HA_MD5_128 , ChaîneVersUTF8 (chMotDePasse )))), " ","") -\
- // Hash du Time Stamp - TmHash est un Buffer = HashChaîne
(HA_HMAC_SHA_160 , ChaîneVersUTF8 (dhParis) , bufCleHash) - //
Transformation du Timestamp ha shé en caractères hexa minuscules sans
espaces - TmHashHexa est un Buffer ="" - POUR I = 1 *A* Taille(TmHash) -
TmHashHexa += NumériqueVersChaîne (Asc(TmHash\[\[I\]\]), "02x") - FIN\
- Exemple :\
o Timestamp = 20150611140022081\
o Mot de passe = FFTT\
o Timestamp crypté = 517b27013dd619db47f2bf4c50ae504acbb33980

Le signataire devra affecter à chaque utilisateur de façon perma nente
un numéro de série unique en générant une chaine de 15 caractères
aléatoires \[A..Z\]\[0..9\] en appelant xml_initialisation.php\
Pour chaque connex ion à un script, il sera passé systématiquement :

------------------------------------------------------------------------

## Page 4

F.F.T.T. - API Smartping 2.0 Page 4 - serie : numéro de série de
l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande

------------------------------------------------------------------------

## Page 5

F.F.T.T. - API Smartping 2.0 Page 5

Liste des scripts de l'API

-   xml_initialisation : Vérifie et initialise un utilisateur\
-   xml_club_dep2 : Liste des clubs pour un département\
-   xml_club_detail : Détail des informations pour un club\
-   xml_organisme : Liste des organismes\
-   xml_epreuve : Liste des épreuves\
-   xml_division : Liste des divisions\
-   xml\_ result_equ : Résultats d'une poule de championnat par équipes\
-   xml_chp_renc : Détail d'une rencontre\
-   xml_equipe : Liste des équipes d'un club\
-   xml_result_indiv : Résultats d'une division d'une épreuve
    individuelle\
-   xml_res_cla : Classement général d'un division du critérium\
-   xml_liste_joueur : liste des joueurs de la base classement\
-   xml_liste_joueur_o : liste des licenciés de la base SPID\
-   xml_joueur : détail d'un joueur de la base classement\
-   xml_licence : détail d'un licencié\
-   xml_li cence_b : détail d'un l icencié + informations classement\
-   xml_partie_mysql : liste des parties d'un joueur dans la base
    classement\
-   xml_partie : liste des parties d'un joueur dans la base SPID\
-   xml_histo_classement : historique des classements du joueur\
-   xml_club_b : recherche d'un club par son N°, sa ville, son nom, son
    code postal ou son département

------------------------------------------------------------------------

## Page 6

F.F.T.T. - API Smartping 2.0 Page 6
http://www.fftt.com/mobile/pxml/xml\_ initialisation .php\
Fonction :\
Vérifie et initialise un nouvel utilisateur.\
Paramètres d'entrée :\
- serie : numéro de série de l'ut ilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- serie : numéro de série attribué par l'application (15 caractères :
\[A..Z\] \[0..9\]). Ce numéro de série doit être initialisé 1 seule f
ois par utilisateur (application installée) et fait partie de toutes les
requêtes ultérieures.\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<initialisation >`{=html} `<appli >`{=html}xxx`</appli >`{=html} : 1 si
accès autorisé, 0 sinon\
`<superviseur>`{=html}xxx `</superviseur >`{=html} : inutilisé\
`<resultat>`{=html}xxx`</resultat>`{=html} : inutilisé\
`<classement>`{=html}xxx`</classement>`{=html} : inutilisé\
`<operateur>`{=html}xxx`</operateur>`{=html} : inutilisé\
`<premium>`{=html}xxx`</premium>`{=html} : inutilisé\
`<message>`{=html}xxx`</message>`{=html} : inutilisé\
`</initialisation >`{=html}

http://www.fftt.com/mobile/pxml/xml_clu b_dep2.php\
Fonction :\
Renvoie une liste de clubs pour un département\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- dep : numéro du département recherché selon la codification de la
table organisme\
En sortie : Format : Xml\
Pour chaque réponse trouvée :

------------------------------------------------------------------------

## Page 7

F.F.T.T. - API Smartping 2.0 Page 7 `<club>`{=html}\
`<idclub>`{=html} xxx`</idclub>`{=html} : id unique\
`<numero>`{=html} xxx`</numero>`{=html} : numéro du club\
`<nom>`{=html}xxx `</nom>`{=html} : nom du club\
`<validation>`{=html} xxx`</validation>`{=html} : date de validation du
club\
`</club>`{=html}\
http://www.fftt.com/mobile/pxml/xml_club\_ b.php\
Fonction :\
Renvoie une liste de clubs pour soit\
 un département\
 un code postal\
 un nom de ville ou un nom de club\
 un N° de club\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- dep : numéro du département recherché selon la codification de la
table organisme\
- code : code postal\
- ville : nom de la commune du club ou nom du club\
- numero : N° du club\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<club>`{=html}\
`<idclub>`{=html}xxx`</idclub>`{=html} : id unique\
`<numero>`{=html}xxx`</numero>`{=html} : numéro du club\
`<nom>`{=html}xxx`</nom>`{=html} : nom du club\
`<validation>`{=html}xxx`</validati on>`{=html} : date de validation du
club\
`</club>`{=html}

------------------------------------------------------------------------

## Page 8

F.F.T.T. - API Smartping 2.0 Page 8

http://www.fftt.com/mobile/pxml/xml_club_detail.php

Fonction :\
Renvoie le détail pour un club\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- club : numéro du club\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<club>`{=html}\
`<idclub>`{=html} xxx`</idclub>`{=html} : id unique\
`<numero>`{=html} xxx`</numero>`{=html} : numéro du club\
`<nomsalle>`{=html} xxx`</nomsalle>`{=html} : nom de la salle\
`<adressesalle1>`{=html}x xx`</adressesalle1>`{=html} : ligne adresse 1
de la salle\
`<adressesalle2>`{=html}xx x`</adressesalle2>`{=html} : ligne adresse 2
de la salle\
`<adressesalle3>`{=html}xx x`</adressesalle3>`{=html} : ligne adresse 3
de la salle\
`<codepsalle>`{=html}x xx`</codepsalle>`{=html} : code postal de la
salle\
`<villesalle>`{=html}x xx`</villesalle>`{=html} : ville de la salle\
`<web>`{=html}xxx`</web>`{=html} : Site web du club\
`<nomcor>`{=html}xxx`</nomcor>`{=html} : nom du correspondant\
`<prenomcor>`{=html}xxx`</prenomcor>`{=html} : prénom du correspondant\
`<mailcor>`{=html}xxx`</mailcor>`{=html} : mail du correspondant\
`<telcor>`{=html}xxx`</telcor>`{=html} : Téléph one du correspondant\
`<latitude>`{=html}xxx`</latitude>`{=html} : latitude GPS si indiqué par
le club\
`<longitude>`{=html}xxx`</longitude>`{=html} : longitude GPS si indiqué
par le club\
`</club>`{=html}

------------------------------------------------------------------------

## Page 9

F.F.T.T. - API Smartping 2.0 Page 9

http://www.fftt.com/mobile/pxml/xml\_ organisme .php\
Fonction :\
Renvoie une liste des organismes\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- type : Type d'organisme (F = Fédération, Z = Zone, L=Ligue,
D=Département)\
En s ortie : Format : Xml\
Pour chaque réponse trouvée :\
`<organisme>`{=html}\
`<libelle>`{=html}xxx`</libelle>`{=html} : Libellé de l'organisme\
`<id>`{=html}xxx\</ id\> : Id unique de l'organisme\
`<code>`{=html}xxx `</code >`{=html} : Code de l'organisme (L12, D63
etc..)\
`</organisme >`{=html}

http://www.fftt.com/mobile/pxml/xml \_epreuve .php\
Fonction :\
Renvoie une liste de s épreuves pour un organisme\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- organ isme : id unique de l'organisme\
- type : type d'épreuve (E = Equipes, I = Individuelles)\
En sortie : Format : Xml\
Pour chaque réponse trouvée :

------------------------------------------------------------------------

## Page 10

F.F.T.T. - API Smartping 2.0 Page 10 `<epreuve>`{=html}\
`<idepreuve>`{=html}xxx `</idepreuve >`{=html} : id unique de l'épreuve\
`<idorga>`{=html}xxx `</idorga >`{=html} : id unique de l'organisme\
`<libelle >`{=html}xxx`</libelle>`{=html} : Libelle de l'épreuve\
`</epreuve >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ division .php\
Fonction :\
Renvoie une liste des divisions pour une épreuve donnée\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la deman de\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- organisme : id de l'organisme\
- epreuve : id de l'épreuve\
- type :2 type d'épreuve (E = Equipe, I = Individuelle)\
En sortie : Format : Xml\
Pour chaque réponse trouv ée : `<division>`{=html}\
`<iddivision>`{=html}xxx`</iddivision>`{=html} : id unique\
`<libelle>`{=html}xxx `</libelle >`{=html} : libellé de la division\
`</division>`{=html}

http://www.fftt.com/mobile/pxml/xml\_ result_equ .php\
Fonction :\
Renvoie les résultats ou classement d'une poule de championnat par
équipes\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
Si épreuve par équipes

------------------------------------------------------------------------

## Page 11

F.F.T.T. - API Smartping 2.0 Page 11 - action : « poule » = récupérer
les différentes poules , « classement » = récupérer le classement ,
action vide = récupérer les rencontres\
- auto : 1 - D1 : id de la division\
- cx_poule : id de la poule demandée (optionnel. Si omis, positionné sur
la première poule)\
En sortie : Format : Xml\
Pour action = « » (vide)\
Pour chaque réponse trouvée : `<tour>`{=html}\
`<libelle>`{=html}xxx`</libelle>`{=html} : Libellé de la Poule, tour et
date\
`<equa>`{=html}xxx`</equa>`{=html} : Libellé de l'équipe A\
`<equb>`{=html}xxx\>`</equb>`{=html} : Libellé de l'équipe B\
`<scorea>`{=html}xxx`</scorea>`{=html} : Score de l'équipe A\
`<scoreb>`{=html}xxx`</scoreb>`{=html} : Score de l'éq uipe B\
`<lien>`{=html}xxx`</lien>`{=html} : chaine de paramètres à passer pour
accéder au détail de la rencontre\
`</tour>`{=html}\
Pour action = « poule » Pour chaque réponse trouvée :\
`<poule>`{=html}\
`<lien >`{=html}xxx `</lien>`{=html} : contient id de poule et id
division\
`<libelle >`{=html}xxx`</libelle >`{=html} : libellé de la poule\
`</poule >`{=html} Pour action = « classement » Pour chaque réponse
trouvée : `<classement>`{=html}\
`<poule>`{=html}xxx`</poule>`{=html} : Nom de la poule\
`<clt>`{=html}xxx`</clt>`{=html} : Classement de l'équipe\
`<equipe>`{=html}xxx`</equipe>`{=html} : Libellé de l'équipe\
`<joue>`{=html}xxx`</joue>`{=html} : Nombre de rencontre s jouées\
`<pts>`{=html}xxx`</pts>`{=html} : nombre de points rencontre\
`<numero>`{=html}xxxxxxx`</numero>`{=html} : numéro du club

`</classement>`{=html}

------------------------------------------------------------------------

## Page 12

F.F.T.T. - API Smartping 2.0 Page 12
http://www.fftt.com/mobile/pxml/xml\_ chp_renc .php\
Fonction :\
Renvoie les informations détaillées d'une rencontre\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- is_retour\
- phase\
- res_1\
- res_2\
- renc_id\
- equip_1\
- equip_2\
- equip_id1\
- equip_id2\
ces paramètres en surbrillance sont donnés par l'info « lien » renvoyé
par xml_result_equ.php définis ci -dessus.\
En sortie : Format : Xml\
Pour chaque rencontre : `<resultat >`{=html} `<equa >`{=html}xxx\</ equa
\> : libelle equipe A\
`<equb>`{=html}xxx`</equb>`{=html} : libelle equipe B\
`<resa>`{=html}xxx`</resa>`{=html} : resultat equipe A\
`<resb>`{=html}xxx`</resb>`{=html} : resultat equipe B\
`</resultat >`{=html} Puis :\
Pour chaque paire de joueur :\
`<joueur>`{=html}\
`<xja>`{=html}xxx`</xja>`{=html} : Libelle Joueur A\
`<xca>`{=html}xxx`</xca>`{=html} : Classement joueur A\
`<xjb>`{=html}xxx`</xjb>`{=html} : Libelle Joueur B\
`<xcb>`{=html}xxx`</xcb>`{=html} : Classement joueur B\
`</joueur>`{=html}\
Puis : Pour chaque partie :

------------------------------------------------------------------------

## Page 13

F.F.T.T. - API Smartping 2.0 Page 13 `<partie>`{=html}\
`<ja>`{=html}xxx`</ja>`{=html} : Nom prénom joueur A\
`<scorea>`{=html}xxx`</scorea>`{=html} : Score du joueur A\
`<jb>`{=html}xxx `</jb>`{=html} : Nom prénom joueur B\
`<scoreb >`{=html}xxx `</scoreb >`{=html} : Score du joueur B\
`</partie>`{=html}

http://www.fftt.com/mobile/pxml/xml\_ equipe .php\
Fonction :\
Renvoie une liste des équipes d'un club\
Paramètres d' entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- numclu : numéro du club\
- type :\
o M pour les équipes du championnat de France masculin,\
o F po ur les équipes du championnat de France Féminin,\
o A pour les équipes Masculines et Féminines du championnat de France,\
o rien pour toutes les autres équipes.\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<equipe >`{=html} `<libequipe >`{=html}xxx\</ libequipe \> : Libell é
de l'équipe\
`<libdivision>`{=html}xxx `</libdivision >`{=html} : libellé de la
division\
`<idepr>`{=html}xxx`</idepr>`{=html} : Id de l'épreuve\
`<libepr>`{=html}xxx`</libepr>`{=html} : libellé de l'épreuve

`<liendivision>`{=html}xxx`</liendivision>`{=html} : lien contenant l'id
de la poule (cx_poule) et l'id (D1) de la divisio n (voir
xml_result_equ.php)\
`</equipe >`{=html}

------------------------------------------------------------------------

## Page 14

F.F.T.T. - API Smartping 2.0 Page 14
http://www.fftt.com/mobile/pxml/xml\_ result_indiv .php\
Fonction :\
Renvoie les résultats d'une épreuve individuelle\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- action : si action = « poule » on renvoie la liste des différents
groupes . Si action= « classement » on renvoie le classement du groupe,
si action = « partie » on renvoie toutes les parties disputées (finale,
demi -finales etc...)\
- epr : id de l'épreuve\
- res_division : id de la division\
- cx_tableau : id du groupe (optionnel)\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
Pour action = « poule » `<tour >`{=html} `<libelle >`{=html}xxx\</
libelle \> : Libell é du groupe\
`<lien>`{=html}xxx `</lien>`{=html} : lien du groupe (epr = id de
l'épreuve, res_division =id de la division, cx_tableau = id du groupe)\
`</tour >`{=html} Pour action = « classement » `<classement>`{=html}\
`<rang>`{=html}xxx`</rang>`{=html} : rang du joueur\
`<nom>`{=html}xxx`</nom>`{=html} : nom prénom du joueur\
`<clt>`{=html}xxx`</clt>`{=html} : classement du joueur\
`<club>`{=html}xxx`</club>`{=html} : club du joueur\
`<points>`{=html}xxx`</points>`{=html} : points obtenus dans la
compétition\
`</classement>`{=html}\
Pour action = « partie » `<partie>`{=html}\
`<libelle>`{=html}xxx`</libelle>`{=html} : Libelle de la partie\
`<vain>`{=html}xxx`</vain>`{=html} : libelle du joueur vainqueur\
`<perd>`{=html}xxx`</perd>`{=html} : libelle du joueur perdant\
`<forfait>`{=html}xxx`</forfait>`{=html} : indicateur si partie gagnée
par forfait\
`</partie>`{=html}

------------------------------------------------------------------------

## Page 15

F.F.T.T. - API Smartping 2.0 Page 15
http://www.fftt.com/mobile/pxml/xml\_ res_cla .php\
Fonction :\
Renvoie le classement général d'une division du critérium\
Paramè tres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- res_division : Id de la division\
En sortie : Format : Xml\
Pour chaque réponse trouvée : `<classement >`{=html}
`<rang >`{=html}xxx\</ rang \> : rang dans le classement\
`<nom>`{=html}xxx `</nom >`{=html} : nom prenom du joueur\
`<clt>`{=html}xxx`</clt>`{=html} : classement du joueur\
`<club>`{=html}xxx`</club>`{=html} : club du joueur\
`<points>`{=html}xxx`</points>`{=html} : total points\
`</classement >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ liste_joueur .php\
Fonction :\
Renvoie une liste des joueurs provenant de la base classement\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp cryp té - id : ID de l'application qui émet la
demande\
- club : numéro du club (optionnel)\
- nom : nom du joueur (optionnel)\
- prenom : (optionnel)\
NB : il faut passer en paramètre club ou nom (plus prénom
éventuellement)\
En sortie : Format : Xml\
Pour chaque réponse trouvée :

------------------------------------------------------------------------

## Page 16

F.F.T.T. - API Smartping 2.0 Page 16 `<joueur >`{=html}
`<licence >`{=html}xxx\</ licence \> : numéro de licence\
`<nom>`{=html}xxx `</nom >`{=html} : nom du joueur\
`<prenom>`{=html}xxx`</prenom>`{=html} : prénom du joueur\
`<club>`{=html}xxx`</club>`{=html} : nom du club\
`<nclub>`{=html}xxx`</nclub>`{=html} : numero du club\
`<clast>`{=html}xxx`</clast>`{=html} : classement du joueur\
`</jou eur>`{=html}

http://www.fftt.com/mobile/pxml/xml\_ liste_joueur_o .php\
Fonction :\
Renvoie une liste des joueurs provenant de la base des licencies spid .
NB : Renvoie par défaut les joueurs ayant validé leur licence pour la
saison en cours ou la saison précédente.\
Pour limiter la liste des joueurs à ceux ayant leur licence valide pour
la saison en cours, forcer le paramètre d'entrée « valid » à la valeur
1.\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- club : numéro du club (optionnel)\
- licence : numero de licence (optionnel)\
- nom : nom du joueur (optionnel)\
- prenom : (optionnel)\
- valid : (optionnel par défaut valid = 0)\
NB : il faut passer e n paramètre club ou licence ou nom (plus prénom
éventuellement)\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<joueur >`{=html} `<licence >`{=html}xxx\</ licence \> : numéro de
licence\
`<nom>`{=html}xxx `</nom >`{=html} : nom du joueur\
`<prenom>`{=html}xxx`</prenom>`{=html} : prénom du joueur\
`<club>`{=html}xxx`</club>`{=html} : numero du club
`<nclub>`{=html}xxx`</nclub>`{=html} : nom du club\
`</joueur >`{=html}

------------------------------------------------------------------------

## Page 17

F.F.T.T. - API Smartping 2.0 Page 17

http://www.fftt.com/mobile/pxml/xml\_ joueur .php\
Fonction :\
Renvoie un joueur provenant de la base classement\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- licence : numero de licence\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<joueur >`{=html} `<licence >`{=html}xxx\</ licence \> : numéro de
licence\
`<nom>`{=html}xxx `</nom >`{=html} : nom du joueur\
`<prenom>`{=html}xxx`</prenom>`{=html} : prénom du joueur\
`<club>`{=html}xxx`</club>`{=html} : nom du club\
`<nclub>`{=html}xxx`</nclub>`{=html} : numero du club\
`<natio>`{=html}xxx`</natio>`{=html} : nationalité (E = etranger)\
`<clglob>`{=html}xxx`</clglob>`{=html} : classement gl obal\
`<point>`{=html}xxx`</point>`{=html} : points de la situation mensuelle\
`<aclglob>`{=html}xxx`<aclglob>`{=html} ancien classement global\
`<apoint>`{=html}xxx`</apoint>`{=html} anciens points\
`<clast>`{=html}xxx`</clast>`{=html} classement officiel\
`<categ>`{=html}xxx`</categ>`{=html} catégorie d'âge\
`<rangreg>`{=html}xxx`</rangreg>`{=html} rang régional\
`<rangdep>`{=html}xxx`<rangdep>`{=html} rang départemental\
`<valcla>`{=html}xxx`</valcla>`{=html} points officiels\
`<clpro>`{=html}xxx`</clpro>`{=html} proposition de classement\
`<valinit>`{=html}xxx`</valinit>`{=html} valeur en début de saison\
`</joueur >`{=html} http://www.fftt.com/mobile/pxml/xml\_ licence .php\
Fonction :\
Renvoie un joueur provenant de la base des licencies SPID

------------------------------------------------------------------------

## Page 18

F.F.T.T. - API Smartping 2.0 Page 18 Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l 'application qui émet la demande\
- licence : numéro de licence\
En sort ie : Format : Xml\
Pour chaque réponse trouvée :\
`<licence >`{=html} `<idlicence >`{=html}xxx\</ idlicence \> : id unique
du licencié\
`<nom>`{=html}xxx `</nom >`{=html} : nom du joueur\
`<prenom>`{=html}xxx\</ prenom\> : prénom du joueur\
`<licence>`{=html}xxx`</licence >`{=html} : numéro de licence\
`<numclub>`{=html}xxx`</n umclub>`{=html} : numero du club\
`<nomclub>`{=html}xxx`</nomclub>`{=html} : nom du club\
`<sexe >`{=html}xxx\</ sexe \> : sexe du joueur (M, F)\
`<type>`{=html}xxx`</type>`{=html} : type de licence (T ou P)\
`<certif>`{=html}xxx`</certif>`{=html} : certificat médical (Certificat,
Ni entrainement ni compétition, Quadruple)\
`<validation>`{=html}xxx`</validation>`{=html} : date de validation\
`<echelon>`{=html}xxx`</echelon>`{=html} : N ou rien\
`<place>`{=html}xxx`</place>`{=html} : sa place si numéroté\
`<point>`{=html}xxx`</point>`{=html} : points classement\
`<cat>`{=html}xxx`</cat>`{=html} : catégorie d'âge\
`</licence >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ licence_b .php\
Fonction :\
Renvoie un joueur ou une liste de joueurs provenant de la base des
licencies SPID + informations base classement Mysql\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'app lication qui émet la demande\
- licence : numéro de licence ou club : numéro du club\
En sortie : Format : Xml

------------------------------------------------------------------------

## Page 19

F.F.T.T. - API Smartping 2.0 Page 19 Pour chaque réponse trouvée :\
`<licence >`{=html} `<idlicence >`{=html}xxx\</ idlicence \> : id unique
du licencié\
`<nom>`{=html}xxx `</nom >`{=html} : nom du joueur\
`<prenom>`{=html}xxx`</prenom>`{=html} : prén om du joueur\
`<licence>`{=html}xxx`</licence>`{=html} : numéro de licence\
`<numclub>`{=html}xxx`</numclub>`{=html} : numero du club\
`<nomclub>`{=html}xxx`</nomclub>`{=html} : nom du club\
`<sexe>`{=html}xxx`</sexe>`{=html} : sexe du joueur (M, F)\
`<type>`{=html}xxx`</type>`{=html} : type de licence (T ou P)\
`<certif>`{=html}xxx`</certif>`{=html} : certificat méd ical
(Certificat, Ni entrainement ni compétition, Quadruple)\
`<validation>`{=html}xxx`</validation>`{=html} : date de validation\
`<echelon>`{=html}xxx`</echelon>`{=html} : N ou rien\
`<place>`{=html}xxx`</place>`{=html} : sa place si numéroté\
`<point>`{=html}xxx`</point>`{=html} : points classement\
`<cat>`{=html}xxx`</cat>`{=html} : catégorie d' âge
`<pointm>`{=html}xxx`</pointm>`{=html} : Points mensuels\
`<apointm>`{=html}xxx`</apointm>`{=html} : Anciens points mensuels\
`<initm>`{=html}xxx`</initm>`{=html} : Valeur initiale\
`</licence >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ partie_mysql .php\
Fonction :\
Renvoie une liste des parties d'un joueur de la base des classements
mysql\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- licence : numero de licence\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<partie >`{=html} `<licence >`{=html}xxx\</ licence \> : numéro de
licence\
`<advlic>`{=html}xxx `</advlic >`{=html} : numero de licence de
l'adversaire\
`<vd>`{=html}xxx`</vd>`{=html} : Victoire ou Défaire\
`<numjourn >`{=html}xxx\</ numjourn \> : numéro de journée de la partie

------------------------------------------------------------------------

## Page 20

F.F.T.T. - API Smartping 2.0 Page 20 `<codechamp >`{=html}xxx\</ codech
amp \> : code championnat\
`<date >`{=html}xxx\</ date \> : date de la partie\
`<advsexe>`{=html}xxx`</advsexe>`{=html} : Sexe de l'adversaire\
`<advnompre>`{=html}xxx`</advnompre>`{=html} : Nom et prénom de
l'adversaire\
`<pointres>`{=html}xxx`</pointres>`{=html} : Points résultat obtenue
pour cette partie\
`<coefchamp>`{=html}xxx`</coefc hamp>`{=html} : Coefficient de
l'epreuve\
`<advclaof>`{=html}xxx`</advclaof>`{=html} : classement officiel de
l'adversaire\
`</partie >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ partie .php\
Fonction :\
Renvoie une liste des parties d'un joueur de la base SPID\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- numlic : numero de licence\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<resultat >`{=html} `<date >`{=html}xxx\</ date \> : date de la partie\
`<nom>`{=html}xxx `</nom >`{=html} : nom prenom de l'adversaire\
`<classement>`{=html}xxx`</classement>`{=html} : Classement de
l'adversaire\
`<epreuve>`{=html}xxx`</epreuve>`{=html} : libelle épreuve\
`<victoire>`{=html}xxx`</victoire>`{=html} : V ou D\
`<forfait>`{=html}xxx`</forfait>`{=html} : indicateur forfait\
`</resultat >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ new_actu .php\
Fonction :\
Renvoie le flux d'actualités de la FFTT

------------------------------------------------------------------------

## Page 21

F.F.T.T. - API Smartping 2.0 Page 21 Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'applicatio n qui émet la demande\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<news >`{=html} `<date >`{=html}xxx\</ date \> : date de l'actu\
`<titre >`{=html}xxx `</titre >`{=html} : titre de l'actu\
`<description >`{=html}xxx\</ description \> : Description sommaire\
`<url>`{=html}xxx\</ url\> : url de la news\
`<photo >`{=html}xxx\</ photo\> : url de la photo\
`</news >`{=html}

http://www.fftt.com/mobile/pxml/xml\_ histo_classement .php\
Fonction :\
Renvoie l'historique classement d'un joueur\
Paramètres d'entrée :\
- serie : numéro de série de l'utilisateur qui émet la demande\
- tm : Timestamp en clair\
- tmc : Timestamp crypté\
- id : ID de l'application qui émet la demande\
- numlic : numéro de licence\
En sortie : Format : Xml\
Pour chaque réponse trouvée :\
`<histo >`{=html} `<echelon >`{=html}xxx\</ echelon \> : N si classé
national ou rien\
`<place>`{=html}xxx `</place >`{=html} : numéro du joueur si classé
national\
`<point>`{=html}xxx`</point>`{=html} : nombre de points\
`<saison>`{=html}xxx`</saison>`{=html} : libellé de la saison\
`<phase>`{=html}xxx`</phase>`{=html} : indicateur de phase (1 ou 2)\
`</histo >`{=html}
