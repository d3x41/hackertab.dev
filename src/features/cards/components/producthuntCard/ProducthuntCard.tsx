import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import { Article, CardPropsType } from 'src/types'
import { useGeProductHuntProducts } from '../../api/getProductHuntProducts'
import ArticleItem from './ArticleItem'

export function ProductHuntCard(props: CardPropsType) {
  const { meta } = props
  const {
    data: products = [],
    isLoading,
    error,
  } = useGeProductHuntProducts({
    config: {
      staleTime: 900000, //15 minutes
      cacheTime: 3600000, // 1 Day
    },
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`ph-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card {...props}>
      <ListComponent
        items={products}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        placeholder={<ProductHuntPlaceholder />}
      />
    </Card>
  )
}
