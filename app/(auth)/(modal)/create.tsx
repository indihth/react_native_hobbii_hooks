import React from "react";
import { router } from "expo-router";
import { axiosPost } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import ProjectForm from "@/components/ProjectForm";
import { FormType } from "@/types/index";


const CreateProject = () => {
  const { session } = useSession();

  const initialFormData = {
    title: "",
    status: undefined, // expecting enum option, empty string is not valid
    craft_type: "",
    pattern: undefined, // expecting ObjectId, empty string is not valid
    yarns_used: {
      yarn: undefined, 
      colorway_name: [""],
    },
    made_for: "",
    project_notes: "",
    needle_size: undefined, // expecting enum option, empty string is not valid
    yarn_weight: "",
    started_date: "",
    completed_date: "",
  };

  const handleSubmit = async (form: FormType) => {
    try {
      const response = await axiosPost("/projects", form, session);
      router.replace(`(auth)/(tabs)/profile/projects/${response.data.data._id}` as any);
      console.log("Project created successfully", response.data.data);
    } catch (error) {
      console.error("Error creating project", error);
    }
  };

  // passing the initial form and submit function for create
  return <ProjectForm initialFormData={initialFormData} handleSubmit={handleSubmit} />;
};

export default CreateProject;
