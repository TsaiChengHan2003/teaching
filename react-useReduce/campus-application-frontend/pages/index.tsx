import AIChatButton from '@/components/common/AIbot';
import Banner from '@/components/home/Banner';
import ItemsList from '@/components/home/ItemsList';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Banner />
      <ItemsList />
      <AIChatButton />
    </Layout>
  );
}