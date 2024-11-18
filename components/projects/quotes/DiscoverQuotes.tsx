"use client";
import { HeadPara } from "@/components/shared/Heading";
import { type IQuoteItem } from "@/types/quotes.model";
import { type FC } from "react";
import { QuoteCard, QuoteCards } from "./StyledComponent";
interface IDiscoverQuotes {
  quotes: IQuoteItem[]
}
const DiscoverQuotes: FC<IDiscoverQuotes> = ({ quotes }) => {
    return (
        <div>
            <HeadPara title="Discover Quotes" titleDelay={0.19} />
            <br />
            <QuoteCards delay={0.29}>
                {quotes.map(({ content, path }, index) => (
                    <QuoteCard
                        key={`${content[0].content} ${index}`}
                        path={`/quotes/${path}/${content[0].path}`}
                        content={content[0].content}
                        author={content[0].author}
                    />
                ))}
            </QuoteCards>
        </div>
    );
};

export default DiscoverQuotes;
