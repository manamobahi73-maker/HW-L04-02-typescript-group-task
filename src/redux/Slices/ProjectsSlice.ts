import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectType } from "../../components/types/projectType";

const loadProjectsFromLocalStorage = (): ProjectType[] => {
  const savedProjects = localStorage.getItem("projects");
  if (
    !savedProjects ||
    savedProjects === "undefined" ||
    savedProjects === "null"
  ) {
    return [];
  }
  try {
    return JSON.parse(savedProjects);
  } catch {
    return [];
  }
};

const initialState: ProjectType[] = loadProjectsFromLocalStorage();

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectType>) => {
      state.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      return state.filter((project) => project.id !== action.payload);
    },
    updateProject: (state, action: PayloadAction<ProjectType>) => {
      const index = state.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addProject, deleteProject, updateProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
