import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { axiosAuthGet, axiosPut } from "@/api/axiosInstance";
import { useSession } from "@/contexts/AuthContext";
import ProjectForm from "@/components/ProjectForm";
import { FormType } from "@/types/index";

const EditProject = () => {
  const { session } = useSession();
  const router = useRouter();
  const { _id } = useLocalSearchParams<{ _id: string }>();
  const [initialFormData, setInitialFormData] = useState<FormType | null>(null);

  useEffect(() => {
    const fetchData = async (projectId: string) => {
      try {
        const response = await axiosAuthGet(`/projects/${projectId}`, session);
        const project = response.data.data;
        setInitialFormData({
          title: project.title,
          status: project.status.toLowerCase(),
          craft_type: project.craft_type,
          pattern: project.pattern?._id,
          yarns_used: {
            yarn: project.yarns_used[0]?.yarn?._id,
            colorway_name: [project.yarns_used[0]?.colorway_name[0]],
          },
          made_for: project.made_for,
          project_notes: project.project_notes,
          needle_size: project.needle_size,
          yarn_weight: project.yarn_weight,
          started_date: project.started_date,
          completed_date: project.completed_date,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData(_id);
  }, [_id, session]);

  const handleSubmit = async (form: FormType) => {
    try {
      const response = await axiosPut(`/projects/${_id}`, form, session);
      router.dismiss();
      console.log("Project updated successfully", response.data.data);
    } catch (error) {
      console.error("Error updating project", error);
    }
  };

  if (!initialFormData) {
    return null; // or a loading indicator
  }

  return <ProjectForm initialFormData={initialFormData} handleSubmit={handleSubmit} isEditMode />;
};

export default EditProject;
