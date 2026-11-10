function Pagination({ page, onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
      <button onClick={onPrev} disabled={disablePrev} style={{ padding: '8px 16px', cursor: disablePrev ? 'not-allowed' : 'pointer' }}>
        Précédent
      </button>
      <span>Page {page}</span>
      <button onClick={onNext} disabled={disableNext} style={{ padding: '8px 16px', cursor: disableNext ? 'not-allowed' : 'pointer' }}>
        Suivant
      </button>
    </div>
  )
}

export default Pagination