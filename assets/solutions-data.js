export const solutionPackages = [
  {
    slug: 'ontbrekende-stukken',
    name: 'Opvolging',
    setupPrice: 'Vanaf €950',
    monthlyPrice: 'Vanaf €149 p/m',
    turnaround: 'Live in 10 werkdagen',
    summary: 'Laat ontbrekende stukken automatisch opvolgen zonder losse lijstjes, mailbox-chaos of handmatig najagen.',
    included: [
      '1 intakeflow voor ontbrekende stukken',
      'Herinneringslogica met vaste opvolgmomenten',
      'Statussignaal wanneer een dossier compleet is',
      'Afstemming op 1 teamproces'
    ],
    excluded: [
      'Geen maatwerkportaal voor klanten',
      'Geen onbeperkt aantal uitzonderingsroutes',
      'Geen vervanging van uw boekhoudpakket'
    ],
    integrations: ['Exact Online', 'Twinfield', 'Moneybird', 'Outlook', 'SharePoint'],
    demoLabel: 'Bekijk hoe herinneringen, statussen en dossier-signalen samenkomen in 1 flow.'
  },
  {
    slug: 'inbox-triage',
    name: 'Triage',
    setupPrice: 'Vanaf €1.250',
    monthlyPrice: 'Vanaf €199 p/m',
    turnaround: 'Live in 15 werkdagen',
    summary: 'Breng structuur in terugkerende klantmails met routering, conceptreacties en heldere opvolging.',
    included: [
      '1 inboxtriage-flow voor veelvoorkomende berichten',
      'Routering naar administratie, samenstel of klantcontact',
      'Conceptreacties voor terugkerende vragen',
      'Afstemming op uw mailboxproces'
    ],
    excluded: [
      'Geen volledig ticketsysteem',
      'Geen onbeperkte maatwerkclassificaties',
      'Geen brede helpdeskimplementatie'
    ],
    integrations: ['Outlook', 'Gmail', 'SharePoint', 'OneDrive', 'Google Drive'],
    demoLabel: 'Bekijk hoe terugkerende klantmails worden gesorteerd, voorbereid en doorgestuurd.'
  },
  {
    slug: 'klantstatus-overdracht',
    name: 'Overdracht',
    setupPrice: 'Vanaf €1.250',
    monthlyPrice: 'Vanaf €199 p/m',
    turnaround: 'Live in 15 werkdagen',
    summary: 'Houd klanten en collega’s beter op de hoogte met vaste statusmomenten en strakke overdracht.',
    included: [
      '1 status- of overdrachtsflow',
      'Vaste updates voor gekozen procesmomenten',
      'Signalen voor de volgende verantwoordelijke',
      'Afstemming op 1 bestaand teamproces'
    ],
    excluded: [
      'Geen volledig klantportaal',
      'Geen vrije workflow-editor voor klanten',
      'Geen herontwerp van uw volledige operatie'
    ],
    integrations: ['Exact Online', 'Twinfield', 'Outlook', 'Microsoft 365', 'Google Workspace'],
    demoLabel: 'Bekijk hoe een dossierstatus helder doorloopt van team naar klant en terug.'
  }
];

export const integrationGroups = [
  {
    title: 'Boekhoudpakketten',
    items: ['Exact Online', 'Twinfield', 'Moneybird', 'SnelStart', 'e-Boekhouden']
  },
  {
    title: 'E-mail en documenten',
    items: ['Outlook', 'Microsoft 365', 'Gmail', 'Google Workspace', 'SharePoint', 'OneDrive', 'Google Drive']
  },
  {
    title: 'Praktijkstack',
    items: ['Klantportalen', 'Ondertekenen', 'Documentverzoeken', 'Interne overdrachtsstappen']
  }
];
