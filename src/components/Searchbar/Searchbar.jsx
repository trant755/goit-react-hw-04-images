import * as SC from './Searchbar.styled';
import { MdOutlineImageSearch } from 'react-icons/md';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => (
  <SC.Searchbar>
    <Formik initialValues={{ search: '' }} onSubmit={onSubmit}>
      <SC.SearchForm>
        <SC.SearchFormButton type="submit">
          <MdOutlineImageSearch size={'20px'} />
          <SC.ButtonLabel>Search</SC.ButtonLabel>
        </SC.SearchFormButton>

        <SC.SearchFormInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </SC.SearchForm>
    </Formik>
  </SC.Searchbar>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
