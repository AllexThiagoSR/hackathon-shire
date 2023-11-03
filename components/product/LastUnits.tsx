import { SendEventOnLoad } from "$store/components/Analytics.tsx";
// import ProductCard, {
//   Layout as cardLayout,
// } from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SectionProps } from "deco/blocks/section.ts";
import categoryToId from "$store/components/product/Utils/categoryToId.ts";
import { categoryType } from "$store/components/product/Types/categoryType.ts";

export interface Props {
  category: categoryType;
  quantity?: number;
  lastUnitsQuantity: number;
}

export async function loader({ category, quantity = 10, lastUnitsQuantity }: Props) {
  const products = await (
    await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryToId(category)}`)
  ).json();
  return { products: products.results, quantity, lastUnitsQuantity };
}

function LastUnits({
  products,
  quantity,
  lastUnitsQuantity,
}: SectionProps<typeof loader>) {
  const id = useId();
  const platform = usePlatform();
  const lastUnits = products
    .sort((a, b) => Number(a.available_quantity) - Number(b.available_quantity))
    .filter((p, index) => index <= quantity - 1 && Number(p.available_quantity) <= lastUnitsQuantity);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container  py-8 flex flex-col gap-12 lg:gap-16 lg:py-10">
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
          <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {lastUnits?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <img src = {product.thumbnail} />  
              <h2>{ product.title }</h2>
              <div>{ product.original_price }</div>
              <div>{ product.price }</div>
              <div>Unidades Disponíveis: { product.available_quantity }</div>
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} />
        {/* <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        /> */}
      </div>
    </div>
  );
}

export default LastUnits;
