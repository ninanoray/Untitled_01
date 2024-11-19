import Header from "@/src/components/backdrop/header";

const breadcrumbs = {
  title: "Documentaion",
  links: [{ title: "Home", url: "/" }],
};

const documentation = () => {
  return (
    <>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <div>documentaion</div>
      </div>
    </>
  );
};

export default documentation;
