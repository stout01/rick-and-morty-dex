import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

type PageControlsProps = {
  onChange: (page: number) => void;
  pageCount?: number;
  currentPage?: number;
  className?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

export default function PageControls({
  onChange,
  pageCount = 1,
  currentPage = 1,
  className,
}: PageControlsProps) {
  const classes = useStyles();

  return (
    <Pagination
      className={`${classes.pagination} ${className}`}
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
