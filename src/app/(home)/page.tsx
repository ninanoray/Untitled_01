import Header from "@/src/components/backdrop/header";

const breadcrumbs = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <div>home</div>
      </div>
    </>
  );
}
