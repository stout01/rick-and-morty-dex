import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterSearch from './character-search';

describe('CharacterSearch', () => {
  it('should contain text box', () => {
    render(<CharacterSearch onChange={() => {}}></CharacterSearch>);

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should output search text onChange', async () => {
    const onChange = jest.fn();
    render(<CharacterSearch onChange={onChange}></CharacterSearch>);

    userEvent.type(screen.getByRole('textbox'), 'Rick');
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('Rick');
    });
  });
});
