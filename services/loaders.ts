import { LOADER } from "@/common/loaders-constants";
import {
    type ILoaderResponse,
    type ILoadersResponse,
    type LoaderType,
} from "@/types/css-loaders.model";
import _ from "lodash";

const loadersCollection = LOADER;

export async function getAllLoaders(): Promise<ILoadersResponse<LoaderType[]>> {
    return { loaders: loadersCollection };
}
export async function getLoader(
    loaderId: number,
): Promise<ILoaderResponse<LoaderType >> {
    const currentLoader = _.find(loadersCollection, { id: loaderId });
    if (currentLoader) {
        return { loader: currentLoader };
    }

    return Promise.reject("Loader not exist!");
}
