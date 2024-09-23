import React, {useEffect,useState} from 'react'
import SearchResult from '../../components/User/SearchResult';
import NewNavBar from '../../components/User/NewNavBar';

const SearchResultPage = () => {
  return (
    <div>
      <NewNavBar />
      < SearchResult />  
    </div>
  );
};

export default SearchResultPage;