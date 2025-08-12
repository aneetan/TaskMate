import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskProps } from "../types/Tasks";
import { AxiosError, type AxiosResponse } from "axios";
import { addTask, editTask } from "../api/taskApi";
import { showErrorToast, showSuccessToast } from "../utils/toastify";

type EditPayload = {taskId: number, formData: Partial<TaskProps>};
type AddPayload = TaskProps;

export function useTaskMutation(isEdit: boolean) {
   const queryClient = useQueryClient();
   return useMutation<AxiosResponse, AxiosError, EditPayload | AddPayload> ({
      mutationFn: (payload) => {
         if('taskId' in payload) {
            return editTask(payload.formData, payload.taskId);
         } else {
            return addTask(payload);
         }
      },
      onSuccess: () => {
         showSuccessToast(isEdit? "Task Updated Successfully" : "Task Added Successfully");
         queryClient.invalidateQueries({ queryKey: ['task'] });
      },
      onError: (err) => {
         console.log(err)
         if(err.response){
            console.log('Error response data', err.response)
         }
         showErrorToast("Something went wrong");
      }
   })
}