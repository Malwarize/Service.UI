import '../output.css';
import BaseLayout from '../layouts/BaseLayout';
import MainTableService from '../components/MainTableService';
import Header from "../components/Header";
import React from "react";
import ErrorBox from '../components/ErrorBox';
function Main(){
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
        {errorVisible && <ErrorBox Error={errorMessage} onClose={() => setErrorVisible(false)} />}
        <MainTableService searchQuery={searchQuery} showErrorMessage={showErrorMessage} />
    </BaseLayout>
  );
}

export default Main;