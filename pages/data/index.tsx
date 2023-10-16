import { GetServerSideProps } from 'next'

const index = () => {
  return <div>Enter</div>
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {},
  }
}

export default index
