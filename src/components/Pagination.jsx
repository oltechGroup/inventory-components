import "./Pagination.css";

function Pagination({ pages = 1, currentPage, onChange }) {

  if (pages <= 1) {
    return null;
  }

  const renderItems = () => {
    const paginationItems = [];

    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) {
        paginationItems.push(
          <li
            key={i}
            className={`fasdasales-pagination__item ${
              i === currentPage ? "bg-primary-500 text-white" : ""
            }`}
            onClick={() => onChange(i)}
          >
            {i}
          </li>
        );
      }
    } else {
      paginationItems.push(
        <li
          key={1}
          className={`fasdasales-pagination__item ${
            1 === currentPage ? "bg-primary-500 text-white" : ""
          }`}
          onClick={() => onChange(1)}
        >
          1
        </li>
      );

      if (currentPage > 4) {
        paginationItems.push(
          <span key={"ellipsis"} className="fasdasales-pagination__ellipsis">
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 2);
        i <= Math.min(pages - 1, currentPage + 2);
        i++
      ) {
        paginationItems.push(
          <li
            key={i}
            className={`fasdasales-pagination__item ${
              i === currentPage ? "bg-primary-500 text-white" : ""
            }`}
            onClick={() => onChange(i)}
          >
            {i}
          </li>
        );
      }

      if (currentPage < pages - 3) {
        paginationItems.push(
          <span key={"ellipsis"} className="fasdasales-pagination__ellipsis">
            ...
          </span>
        );
      }

      paginationItems.push(
        <li
          className={`fasdasales-pagination__item ${
            pages === currentPage ? "bg-primary-500 text-white" : ""
          }`}
          key={pages}
          onClick={() => onChange(pages)}
        >
          {pages}
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <nav className="fasdasales-pagination">
      <ul className="fasdasales-pagination__container">
        <button
          className="fasdasales-pagination__item"
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {renderItems()}

        <button
          className="fasdasales-pagination__item"
          disabled={currentPage === pages}
          onClick={() => onChange(currentPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </ul>
    </nav>
  );
}

export default Pagination;
