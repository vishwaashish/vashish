import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import Carousel from '@/components/projects/css-loaders/Carousel';
import { LOADER } from "@/common/constants";

export default function Loader(props:any){

    console.log(props,'props')

    const router = useRouter();
  const { loader } = router.query;
  let index = Number(loader)
  console.log(index,'photoId')
    return ( <>
    <main className="mx-auto max-w-[1960px] p-4">
    {/* <Carousel  index={index} /> */}
  </main>
  </>)
}

// export const getStaticProps:GetStaticProps = async (context) => {
    

//     const response =  LOADER

//     const currentLoader = LOADER.find(item=> item.id === Number(context.params.loader))

//     return {
//         props: {
//           loader: currentLoader,
//         },
//       }
// }

// export async function getStaticPaths() {

// const fullPaths = LOADER.map(item=> ({ params: { loader: item.id.toString() } }))



//     return {
//         paths: fullPaths,
//         fallback: false,
//       }
// }