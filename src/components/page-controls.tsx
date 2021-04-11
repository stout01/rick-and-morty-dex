import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

type PageControlsProps = {
  onChange: (page: number) => void;
  pageCount?: number;
  currentPage?: number;
};

export default function PageControls({
  onChange,
  pageCount = 1,
  currentPage = 1,
}: PageControlsProps) {
  return (
    <Pagination
      color="primary"
      variant="outlined"
      count={pageCount}
      onChange={(_, value: number) => onChange(value)}
      page={currentPage}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/characters${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}
