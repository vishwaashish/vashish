import { projectMeta } from "@/common/constants";
import { type RelatedProjectMetaType } from "@/types/common.model";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RelatedStyle1 = () => {
    const pathname = usePathname() || "";

    const relatedArray: RelatedProjectMetaType[] = Object.values(
        projectMeta,
    ).filter(val => !pathname.includes(val.path));

    return (
        <section className="bg-base-200">
            <div className=" prose prose-headings:m-0 py-12 max-w-[900px] mx-auto w-full ">
                <h3 className="text-center">More Projects</h3>
                <div className="divider max-w-sm mx-auto"></div>
                <br />
                <div className=" relative mx-auto flex lg:gap-4 flex-wrap  ">
                    {relatedArray.map(item => (
                        <Link
                            href={"/" + item.path}
                            className="transition-all group/item group/edit flex flex-col md:flex-row gap-5 flex-[1_1_350px] px-4 py-4 md:rounded hover:bg-base-100 hover:cursor-pointer no-underline"
                            key={item.title}
                            // onClick={click(item.path)}
                        >
                            <div className="">
                                {item.icon(
                                    "transition-all h-10 w-10 shrink-0 p-2 rounded-lg shadow-md shadow-indigo-500/[.12] group-hover/edit:scale-105",
                                )}
                            </div>
                            <div className="">
                                <h2 className="text-sm font-semibold leading-6 ">
                                    {item.title}
                                </h2>
                                <p className="mt-2 mb-0 text-sm leading-6 ">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedStyle1;
