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
    <div class="w-9/12 md:w-3/12 mt-8 lg:ml-8 h-fit md:h-4/8 relative md:absolute md:top-24 md:left-6 flex-nowrap container py-6 overflow-hidden flex flex-col gap-6 lg:gap-10 lg:py-10 rounded-md border-2 border-neon-red border-solid animation-neon-red-border">
      <h2 class="animation-neon-red-text-infinite neon-red-text text-2xl text-center py-2">Últimas Unidades</h2>
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 hover:pl-2 hover:overflow-auto hover:scrollbar-hide overflow-hidden scrollbar-hide hover:cursor-pointer"
      >
          <Slider class="gap-3 lg:gap-6 col-start-1 col-end-5 col-span-full max-h-96 py-2">
          {lastUnits?.map((product, index) => (
            <Slider.Item
              index={index}
              class="py-2 sm:first:pl-0 last:pr-6 sm:last:pr-0 text-center"
            >
              <img class="rounded-md mx-auto md:w-6/12" src={product.thumbnail} />  
              <h2 class="hidden text-sm">{ product.title }</h2>
              <div class="hidden text-sm">{ product.original_price }</div>
              <div class="hidden text-sm">{ product.price }</div>
              <div class="text-sm">Unidades Disponíveis: { product.available_quantity }</div>
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
