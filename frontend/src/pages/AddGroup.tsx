import '../output.css';
import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/Header";
import AddGroupForm from "../components/AddGroupForm";
function AddGroup(){
    return (
        <BaseLayout>
            <Header  searchQuery={""} setSearchQuery={()=>{}}/>
            <AddGroupForm/>
        </BaseLayout>
    );
}

export default AddGroup;