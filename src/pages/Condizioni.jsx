import LegalPage from './LegalPage'

const sections = [
  {
    heading: '1. Oggetto',
    body: [
      'Le presenti condizioni regolano gli ordini di lavorazioni odontotecniche affidati a EFFE2 SAS da parte di studi dentistici e laboratori. L’invio di un ordine implica l’accettazione delle presenti condizioni.',
    ],
  },
  {
    heading: '2. Preventivi e ordini',
    body: [
      'Ogni lavorazione è preceduta da un preventivo con prezzi e tempi indicativi. L’ordine si intende confermato al ricevimento dei file tecnici e dell’accettazione del preventivo.',
    ],
  },
  {
    heading: '3. Tempi di lavorazione',
    body: [
      'I tempi vengono concordati caso per caso in base alla tipologia di manufatto. Eventuali ritardi dovuti a file incompleti o modifiche richieste in corso d’opera non sono imputabili al laboratorio.',
    ],
  },
  {
    heading: '4. Spedizione e consegna',
    body: [
      'Le consegne avvengono tramite corriere espresso tracciabile. Il rischio del trasporto è coperto secondo le condizioni del vettore. Si consiglia di verificare il manufatto alla ricezione.',
    ],
  },
  {
    heading: '5. Garanzia e rifacimenti',
    body: [
      'Ogni manufatto è controllato prima della spedizione. Eventuali non conformità vanno segnalate tempestivamente: valuteremo insieme rifacimento o rettifica senza costi aggiuntivi quando imputabili alla lavorazione.',
    ],
  },
  {
    heading: '6. Pagamenti',
    body: [
      'Le condizioni di pagamento sono indicate nel preventivo o concordate con il cliente. La fatturazione avviene secondo la normativa vigente.',
    ],
  },
]

export default function Condizioni() {
  return (
    <LegalPage
      badge="Condizioni"
      title="Condizioni d’Ordine"
      subtitle="Le regole con cui gestiamo preventivi, lavorazioni, consegne e garanzie. Chiarezza prima di tutto."
      updated="29 maggio 2026"
      sections={sections}
    />
  )
}
