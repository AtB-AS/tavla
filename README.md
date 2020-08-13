# AtB Tavla

![Build and Deploy](https://github.com/AtB-AS/tavla/workflows/Build%20and%20Deploy/badge.svg)


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

## Licenses and Terms

* The source code is licensed under EUPL-1.2.
* The Nationale fonts are licensed separately. You can get a license at https://playtype.com/typefaces/nationale/.
* All Entur trademark assets are to be used only by Entur (logo, illustrations and images).
* Attribution must be given to Entur Tavla when hosting your own fork/clone, and it must be visible from the dashboard pages. A link to https://tavla.entur.no must be included.
