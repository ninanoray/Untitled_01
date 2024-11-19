import Header from "@/src/components/backdrop/header";
import Playground from "@/src/components/playground";

const breadcrumbs = {
  title: "Playground",
  links: [{ title: "Home", url: "/" }],
};

const playground = () => {
  return (
    <>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <Playground />
      </div>
    </>
  );
};

export default playground;
