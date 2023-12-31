import '../App.css';
import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/Header";
import GroupTableServices from "../components/GroupTableServices";
import {Link} from "react-router-dom";
import ErrorBox from '../components/ErrorBox';
function Groups(){
    const [searchQuery, setSearchQuery] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);

    function showErrorMessage(message : string){
      setErrorMessage(message)
      setErrorVisible(true)
      setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
    }
    return (
        <BaseLayout>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-deep-gray mb-5">Groups</h1>
                <Link to={"/addGroup"} className='flex'>
                    <span className='mr-4'>Create</span>
                    <svg className="w-7 h-7 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8.25V12M12 12V15.75M12 12H15.75M12 12L8.25 12M21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12Z" stroke="#564C93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </Link>
            </div>
            {errorVisible && <ErrorBox Error={errorMessage} onClose={() => setErrorVisible(false)} />}
            <GroupTableServices  showErrorMessage={showErrorMessage}/>
        </BaseLayout>
    );
}

export default Groups;