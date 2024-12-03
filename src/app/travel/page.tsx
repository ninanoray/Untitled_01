import Header from "@/src/components/backdrop/header";

const breadcrumbs = {
  title: "Travel",
  links: [{ title: "Home", url: "/" }],
};

const travel = () => {
  return (
    <>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <div>travel</div>
      </div>
    </>
  );
};

export default travel;
