import Header from "@/src/components/backdrop/header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const breadcrumbs = {
  title: "Home",
};

export default async function Home() {
  const queryClient = new QueryClient();
  //prefetchQuery를 통해 데이터를 비동기로 prefetch, 데이터는 QueryClient에 캐싱
  // await queryClient.prefetchQuery({
  //   queryKey: ["main"],
  //   queryFn: () => {},
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <div>home</div>
      </div>
    </HydrationBoundary>
  );
}
