import React, {useEffect,useState} from 'react'
import SearchResult from '../../components/User/SearchResult';
import NewNavBar from '../../components/User/NewNavBar';
import LoginNavBar from '../../components/User/LoginNavBar';


const SearchResultPage = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //เช็คว่า log in อยู่มั้ย ด้วยการเช็ตโทเคน
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {isLoggedIn ? <LoginNavBar /> : <NewNavBar />}
      < SearchResult />  
    </div>
  );
};

export default SearchResultPage;