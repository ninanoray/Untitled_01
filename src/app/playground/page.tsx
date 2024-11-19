import Header from "@/src/components/backdrop/header";

const breadcrumbs = {
  title: "Playground",
  links: [{ title: "Home", url: "/" }],
};

const playground = () => {
  return (
    <>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <div>playground</div>
      </div>
    </>
  );
};

export default playground;
