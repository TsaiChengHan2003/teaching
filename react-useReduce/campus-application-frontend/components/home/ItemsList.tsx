import Image from 'next/image';

import styles from '@/styles/components/home/ItemsList.module.scss';
import data from '@/lib/data/homeItems.json';
import { ItemType } from '@/lib/types/itemListType';
import { useChildConnection } from '@/lib/hooks/useChildConnection';

/**
 *
 * 首頁校園網站選單
 * @returns 項目列表
 *
 * @since 1.0.0
 */

export default function ItemsList() {
  const childEntry = useChildConnection();

  const Item = ({ data }: { data: ItemType }) => (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.cover}>
          <Image src={data.cover} alt={data.name} width={500} height={500}/>
        </div>
        <p className={styles.title}>{data.name}</p>
        <p className={styles.description}>{data.description}</p>
        <a>
          <button
            onClick={() => {
              childEntry(data.url);
            }}
          >
            進入網站
          </button>
        </a>
      </div>
    </div>
  );

  return (
    <section className={styles.container}>
      {data.system.map((data, index) => <Item key={index} data={data} />)}
    </section>
  );
}