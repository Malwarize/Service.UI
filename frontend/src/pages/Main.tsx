import '../output.css';
import BaseLayout from '../layouts/BaseLayout';
import MainTableService from '../components/MainTableService';
import Header from "../components/Header";
import React from "react";
function Main(){
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
    <BaseLayout>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <MainTableService searchQuery={searchQuery}/>
    </BaseLayout>
  );
}

export default Main;