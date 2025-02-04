import TextField from '@mui/material/TextField/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './SearchTextField.scss';
import InputAdornment from '@mui/material/InputAdornment';

interface SearchTextFieldProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({ handleSearch }) => {
  return (
    <TextField
      fullWidth
      id='outlined-basic'
      label='Search'
      variant='outlined'
      onChange={handleSearch}
      className='search-textfield'
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end' className='search-adornment'>
              <SearchIcon className='search-icon' />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchTextField;
