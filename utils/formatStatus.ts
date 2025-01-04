export const formatStatus = (status: string): string => {

    // formats the status of a project to styled text
  const statusMap: { [key: string]: string } = {
    in_progress: "In Progress",
    finished: "Finished",
    hibernating: "Hibernating",
  };

  return statusMap[status] || status;
};
