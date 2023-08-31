import '../output.css';
import React from "react";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/Header";
import AddServiceForm from "../components/AddServiceForm";

function AddGroup(){
    return (
        <BaseLayout>
            <Header  searchQuery={""} setSearchQuery={()=>{}}/>
            <AddServiceForm/>
        </BaseLayout>
    );
}

export default AddGroup;