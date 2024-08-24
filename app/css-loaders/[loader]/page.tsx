import { DEFAULT_SETTINGS } from "@/common/loaders-constants";
import ProjectLayout from "@/components/projects/ProjectLayout";
import Carousel from "@/components/projects/css-loaders/Carousel";

import { getLoader } from "@/services/loaders";
import { type PageProps } from "@/types/common.model";
import React from "react";

const page = async ({ params, searchParams }: PageProps<any, any>) => {
    const index = Number(params.loader);
    const response = await getLoader(index);
    const element = response.loader;

    const {
        size = DEFAULT_SETTINGS.size,
        border = DEFAULT_SETTINGS.border,
        speed = DEFAULT_SETTINGS.speed,
        primaryColor = "570df8",
        secondaryColor = "d8dde4",
        sourceCode = "false",
    }: any = searchParams;

    const state = {
        size,
        speed,
        border,
        primaryColor,
        secondaryColor,
        sourceCode,
    };

    return (
        <ProjectLayout className="py-0 px-1">
            <Carousel element={element} index={index} state={state} />
        </ProjectLayout>
    );
};

export default page;
