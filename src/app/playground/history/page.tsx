import Header from "@/src/components/backdrop/header";
import History from "@/src/components/playground/history";

const breadcrumbs = {
  title: "History",
  links: [
    { title: "Home", url: "/" },
    { title: "Playground", url: "/playground" },
  ],
};

const history = () => {
  return (
    <>
      <Header page={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-2 pt-1">
        <History />
      </div>
    </>
  );
};

export default history;
