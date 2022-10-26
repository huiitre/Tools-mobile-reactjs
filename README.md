# Tools REACTJS - ANDROID

## Installation des dépendances
```console
yarn
```

## Build 
```console
yarn build
```

## Mise en place de cordova
```console
cordova create src-cordova fr.huiitre.tools Tools.huiitre.fr
cd src-cordova
cordova platform add android
```
**Retour à la racine du projet afin d'exécuter le build react + cordova**

On déplace le contenu du build dans le dossier `src-cordova/www` en venant modifier le fichier `/config/paths.js`

```javascript
build: path.resolve(__dirname, '../src-cordova/www'),
// production build files
```
Puis on lance le build node + cordova
```console
cd ../
runperso
```
ou
```console
yarn build
cordova run android
```

## Versioning
1. Noter le numéro de version dans la variable d'environnement du fichier `.env`
2. Changer le numéro de version dans le fichier `src-cordova/config.xml`

## Notes de versions
### 2.0 développement en cours
