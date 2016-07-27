# DifiCamp 2016 Digital Citizen Project

[![Build Status](https://travis-ci.org/difi/dc16-digitalcitizen.svg?branch=master)](https://travis-ci.org/difi/dc16-digitalcitizen)
[![Codecov](https://codecov.io/gh/difi/dc16-digitalcitizen/branch/master/graph/badge.svg)](https://codecov.io/gh/difi/dc16-digitalcitizen)
[![Stories in Ready](https://badge.waffle.io/difi/dc16-digitalcitizen.png?label=ready&title=Ready)](https://waffle.io/difi/dc16-digitalcitizen)

Oppgavetekst
======
Det er i dag den enkelte kommunes ansvar å tilby en elektronisk løsning for sykehjemsplass. Dette er en søknad som i stor grad består av ustrukturert informasjon (fritekst) og er ofte «digitalisert» gjennom et PDF-skjema. 

Oppgaven bygger videre på det underliggende tankesettet i referansearkitekturen for meldingsutveksling, der ideen er å skjule hver deltaker for kompleksiteten ved varierende grad av modenhet hos de man kommuniserer med. Det som er nytt er at den ene parten er en innbygger. Forslaget er å lage en enkel web-applikasjon med et skjema for å søke om sykehjemsplass. Dette gir en søknad i form av en meldingstype med strukturert informasjon. For de kommuner som er i stand til å ta imot informasjonen denne meldingen direkte så blir den sendt gjennom dertil egnet infrastruktur. For de kommuner som ikke kan håndtere meldingen direkte så blir det laget et fysisk brev (her kan man bruke DPI sin print-tjeneste) som blir sendt til kommunen. 

Poenget er å illustrere at innbygger er digital og blir møtt med ett uniformt grensesnitt, uavhengig av digital modenhet til den kommunen vedkommende kommuniserer med.

Søknad om sykehjemsplass er valgt fordi denne illustrerer hvordan innbyggere må forholde seg til flere kommuner. Søknaden er ofte fylt ut av verger/familiemedlemmer som bur andre plasser enn den som har behovet for plass.

Tanken er å løse oppgaven med stor grad av bruk av dagens fellesløsninger – meldingsutveksling, Altinn REST API og DPI.


Getting started
-----------
1. Clone the repository

2. To run a complete install of all necessary node modules and launch the application localhost:8080:

    `mvn clean package spring-boot:run`

3. To run webpack with hot reload, for developing, run the application file, cd into src/main/frontend:

    `npm start`

This will launch the application at localhost:9090.
