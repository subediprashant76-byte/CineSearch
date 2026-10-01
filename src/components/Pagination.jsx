export default function Pagination({ page, totalPages, onChange }) {
  const last = Math.min(totalPages, 500) // the API stops at page 500

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {last}
      </span>
      <button disabled={page >= last} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  )
}
