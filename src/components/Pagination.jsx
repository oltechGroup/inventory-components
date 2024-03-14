import { Pagination } from "keep-react";
import { CaretLeft, CaretRight, DotsThree } from "phosphor-react";

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination shape="circle" className="flex justify-center my-5">
      <Pagination.Navigator
        shape="circle"
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <CaretLeft size={18} />
      </Pagination.Navigator>
      <Pagination.List>
        {Array.from({ length: Math.min(totalPages, 3) }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        {totalPages > 5 && (
          <>
            <Pagination.Item>
              <DotsThree size={20} />
            </Pagination.Item>
            <Pagination.Item
              active={totalPages === currentPage}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Pagination.Item>
          </>
        )}
      </Pagination.List>
      <Pagination.Navigator
        shape="circle"
        onClick={() => {
          if (currentPage < totalPages) {
            window.scrollTo(0, 0);
            onPageChange(currentPage + 1);
          }
        }}
      >
        <CaretRight size={18} />
      </Pagination.Navigator>
    </Pagination>
  );
}

export default PaginationComponent;
