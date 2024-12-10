import { AxiosError, AxiosResponse } from "axios";
import { QueryKey, setLogger, useMutation, useQueryClient } from "react-query";
import { z } from "zod";

export const queryKeys = {
  userController: {
    user: () => ["user"],
  },
  emailController: {
    email: () => ["email"],
  },
};

type APIResponse = {
  code?: string;
  data?: any;
  message?: string;
  status?: number;
};

export default function useOptimisticMutation(
  apiAxios: (body: z.infer<z.Schema>) => Promise<any>,
  queryKeys: QueryKey,
  successCallback?: (code: APIResponse["code"]) => void,
  errorCallback?: (code: APIResponse["code"]) => void
) {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, z.infer<z.Schema>>(
    (body) => {
      // console log 출력 관리
      setLogger({
        log: () => {},
        warn: () => {},
        error: () => {},
      });
      return apiAxios(body);
    },
    {
      onMutate: async (variable) => {
        await queryClient.cancelQueries(queryKeys); // 쿼리를 취소하고
        const previous = queryClient.getQueryData(queryKeys); // 이전 값 스냅샷
        if (previous) {
          // previous가 있으면 새 데이터로 업데이트
          queryClient.setQueryData(queryKeys, variable);
        }
        return { previous: previous };
      },
      onSuccess: (data: AxiosResponse) => {
        const responseData = data as APIResponse;
        // queryClient.invalidateQueries(queryKeys);
        if (successCallback) successCallback(responseData.code);
      },
      onError: (error: AxiosError, _, context) => {
        const errorResponse = error.response?.data as APIResponse;
        const errorContext = context as { previous: any };
        if (errorContext.previous) {
          // onMutate에서 반환된 값으로 다시 롤백
          queryClient.setQueryData(queryKeys, errorContext.previous);
        }
        if (errorCallback) errorCallback(errorResponse.code);
      },
      onSettled: () => {
        // mutation이 끝나면 (성공유무 상관없이) 쿼리를 무효화 처리하고 새로 가져온다.
        queryClient.invalidateQueries(queryKeys);
      },
    }
  );
}
