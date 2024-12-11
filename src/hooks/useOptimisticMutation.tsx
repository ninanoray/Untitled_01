import { AxiosError, AxiosResponse } from "axios";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const queryKeys = {
  emailController: {
    email: () => ["email"],
  },
  signinController: {
    signin: () => ["signin"],
  },
};

export type APIResponse = {
  code?: string;
  data?: any;
  message?: string;
  status?: number;
};

export default function useOptimisticMutation(
  apiAxios: (body: z.infer<z.Schema>) => Promise<any>,
  queryKeys: string[]
) {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, z.infer<z.Schema>>({
    mutationFn: apiAxios,
    onMutate: async (variable) => {
      // onMutate에서 수행되는 것들을 덮어쓰지 않기 위해 요청한 쿼리를 취소
      await queryClient.cancelQueries({ queryKey: queryKeys, exact: true });
      // 기존 Query를 가져오기(존재하지 않으면 undefinde 반환)
      const previous = queryClient.getQueryData(queryKeys);
      if (previous) {
        // previous가 있으면 새 데이터로 업데이트
        queryClient.setQueryData(queryKeys, (oldData: any) => [
          ...oldData,
          variable,
        ]);
      }
      return { previous: previous };
    },
    onError: (error, variables, context) => {
      const errorContext = context as { previous: any };
      if (errorContext.previous) {
        // onMutate에서 반환된 값으로 다시 롤백
        queryClient.setQueryData(queryKeys, errorContext.previous);
      }
    },
    onSettled: () => {
      // mutation이 끝나면 (성공유무 상관없이) 쿼리를 무효화 처리하고 새로 가져온다.
      queryClient.invalidateQueries({
        queryKey: queryKeys,
        exact: true,
        refetchType: "active",
      });
    },
  });
}
