import { LOADER } from "@/common/constants";
import { memo, useCallback } from "react";

const LoadersLoop = memo(({ onClick }: any) => {
  const click = useCallback(
    (item: any) => () => {
      return !!onClick && onClick(item);
    },
    []
  );

  return (
    <>
      <div
        // className="transition-all grid
        // grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]  md:grid-cols-[repeat(auto-fit,minmax(25rem,1fr))]
        //  gap-5 w-full  mx-auto"
        className="transition-all grid 
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
       gap-4 w-full  mx-auto"
      >
        {LOADER.map((item) => (
          <section
            key={`loaders${item.id}`}
            className="aspect-video w-full flex justify-center items-center card  shadow-base-200 hover:bg-base-200 border border-base-300"
            onClick={click(item)}
            style={{
              boxShadow:
                "inset rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            }}
          >
            <style type="text/css">{item.css}</style>
            <span dangerouslySetInnerHTML={{ __html: item.html }} />
          </section>
        ))}{" "}
      </div>
    </>
  );
});

LoadersLoop.displayName = "LoadersLoop"

export default LoadersLoop;
