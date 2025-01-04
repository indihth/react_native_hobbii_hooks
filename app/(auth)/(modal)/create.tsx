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
    status: "",
    craft_type: "",
    pattern: "",
    yarns_used: {
      yarn: "",
      colorway_name: [""],
    },
    made_for: "",
    project_notes: "",
    needle_size: "",
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

  return <ProjectForm initialFormData={initialFormData} handleSubmit={handleSubmit} />;
};

export default CreateProject;
