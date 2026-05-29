import LegalPage from './LegalPage'

const sections = [
  {
    heading: '1. Titolare del trattamento',
    body: [
      'Il titolare del trattamento dei dati è EFFE2 SAS di Fuso Davide & C., con sede in Viale Cadore 56/G, 32014 Ponte nelle Alpi (BL). Per qualsiasi richiesta è possibile scrivere a effe2snc@gmail.com.',
    ],
  },
  {
    heading: '2. Dati raccolti',
    body: [
      'Raccogliamo i dati di contatto (nome, email, telefono) che ci fornisci volontariamente per richiedere preventivi o gestire ordini, oltre ai file tecnici (scansioni, immagini) necessari alla lavorazione.',
      'Non raccogliamo dati superflui rispetto alle finalità dichiarate.',
    ],
  },
  {
    heading: '3. Finalità e base giuridica',
    body: [
      'I dati sono trattati per dare seguito alle tue richieste, gestire la lavorazione e la consegna, e adempiere agli obblighi di legge. La base giuridica è l’esecuzione di un contratto o di misure precontrattuali e gli obblighi normativi.',
    ],
  },
  {
    heading: '4. Conservazione e luogo',
    body: [
      'I dati sono conservati per il tempo necessario alle finalità indicate e agli obblighi fiscali. Le informazioni sono ospitate su infrastruttura europea, senza trasferimenti extra-UE.',
    ],
  },
  {
    heading: '5. I tuoi diritti',
    body: [
      'Puoi esercitare in qualsiasi momento i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati, secondo gli articoli 15-22 del Regolamento UE 2016/679, scrivendo al titolare.',
    ],
  },
  {
    heading: '6. Cookie',
    body: [
      'Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento. Non vengono impiegati cookie di profilazione né strumenti di tracciamento a fini pubblicitari.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalPage
      badge="Privacy"
      title="Privacy Policy"
      subtitle="Lavoriamo con informazioni sensibili e le trattiamo con la massima serietà. Conformità GDPR e trasparenza totale."
      updated="29 maggio 2026"
      sections={sections}
    />
  )
}
