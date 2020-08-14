# AtB Tavla

![Build and Deploy - Prod](https://github.com/AtB-AS/tavla/workflows/Build%20and%20Deploy%20-%20Prod/badge.svg)
![Build and Deploy - Staging](https://github.com/AtB-AS/tavla/workflows/Build%20and%20Deploy%20-%20Staging/badge.svg) 

AtB Tavla ("The Board") is a customizable departure board for public transport in Trøndelag. I can be personalized from it's admin panel, which requires no technical skills.

Go to ~~tavla.atb.no~~ [tavla.dev.mittatb.no](https://tavla.dev.mittatb.no/) to set up your table today.

You can subscribe to updates to AtB Tavla by clicking "Watch".

## Installation and Setup

If you want to run the project locally, first make sure you have Node.js v10.13.0 or above installed. Check with `node -v`.

Download the source code:

```
git clone https://github.com/atb-as/tavla && cd tavla
```

Install dependencies
```
npm install
```

Run the development server with
```
npm start
```

Your browser should automatically open the app on http://localhost:9090

## Contribute

This project is a fork of Entur Tavla ([entur/tavla](https://github.com/entur/tavla)) and most of the codebase is shared and synchronized with them. If you have an issue with Tavla or want to contribute, it might be best to do so over there if it applies to both AtB Tavla and Entur Tavla.

Otherwise, don't hesitate to create an [issue](https://github.com/atb-as/tavla/issues/new) or send in a pull request if you found a bug or have an idea of something to improve on. 

Details on how to create your very own dashboard can be found in [CONTRIBUTING.md](/CONTRIBUTING.md).

### Branches

The default branch of this project is `atb/main`, which is where the latest released version of AtB Tavla lives. The `master` branch is a copy of [entur/tavla](https://github.com/entur/tavla), and kept up to date trough an Action in [.github/workflows/repo-sync.yml](.github/workflows/repo-sync.yml). _The `master` branch should not be modified manually._

To update AtB Tavla to with changes from entur/tavla, merge the `master` branch into the branch you want to update.

## CI/CD

Two versions of Tavla are hosted trough Firebase, staging at [atb-tavla-staging-4ded2.web.app](https://atb-tavla-staging-4ded2.web.app/) and prod at [tavla.dev.mittatb.no](https://tavla.dev.mittatb.no/). These are kept up to date with the `atb/dev`, and `atb/main` branches respectively. 

The build and deploy is executed by the the [Build and Deploy - Staging](.github/workflows/build-and-deploy-staging.yml) and [Build and Deploy - Prod](.github/workflows/build-and-deploy-prod.yml) GitHub Actions on every push. The status of the latest builds can be seen in the [Actions tab](https://github.com/AtB-AS/tavla/actions?query=workflow%3A%22Build+and+Deploy%22).

More details on the firebase setup can be found in [CONTRIBUTING.md](/CONTRIBUTING.md).

## Licenses and Terms

* The source code is licensed under EUPL-1.2.
* The Nationale fonts are licensed separately. You can get a license at https://playtype.com/typefaces/nationale/.
* All Entur trademark assets are to be used only by Entur (logo, illustrations and images).
* Attribution must be given to Entur Tavla when hosting your own fork/clone, and it must be visible from the dashboard pages. A link to https://tavla.entur.no must be included.
