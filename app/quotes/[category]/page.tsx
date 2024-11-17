import ProjectLayout from "@/components/projects/ProjectLayout";
import CategoriesQuotes from "@/components/projects/quotes/CategoriesQuotes";
import DiscoverQuotes from "@/components/projects/quotes/DiscoverQuotes";
import { capatalize, removeHypen } from "@/components/utils/text";
import { getQuotesByCategories, randomQuotes } from "@/services/quotes";
import { type PageProps } from "@/types/common.model";
import { type Metadata } from "next";

interface IPage {
  category: string
  content: string
}

const Page = async (props: PageProps<IPage, any>) => {
    const params = await props.params;
    const { category } = params;
    const response = await getQuotesByCategories(category);
    const randomResult = await randomQuotes(6);
    const quotes = response.quotes;
    const randomCatQuote = randomResult.quotes;

    return (
        <>
            <ProjectLayout>
                <CategoriesQuotes quotes={quotes} category={category} />
                <br />
                <DiscoverQuotes quotes={randomCatQuote} />
            </ProjectLayout>
        </>
    );
};

export async function generateMetadata(props: PageProps<IPage, any>): Promise<Metadata> {
    const params = await props.params;
    const category = params.category;

    const response = await getQuotesByCategories(category);

    if (!response.quotes) {
        return {};
    }

    const title = removeHypen(capatalize(response.quotes.path));

    return {
        title,
        description: response.quotes.description,
        openGraph: {
            description: response.quotes.description,
            title: response.quotes.path,
        },
    };
}

export default Page;
