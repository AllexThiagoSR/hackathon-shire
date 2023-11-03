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
import categoryToId from "$store/components/product/Utils/categoryToId.ts";
import { categoryType } from "$store/components/product/Types/categoryType.ts";
import { SectionProps } from "deco/blocks/section.ts";

export interface Props {
  category: categoryType;
  discount1: number;
  discount2: number;
  discount3: number;
  quantity?: number;
}

export async function loader({ category, discount1, discount2, discount3, quantity = 10 }: Props) {
  const products = await (
    await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryToId(category)}`)
  ).json();
  return { products: products.results, discount1, discount2, discount3, quantity };
}

function DiscountShelf({
  products,
  discount1,
  discount2,
  discount3,
  quantity
}: SectionProps<typeof loader>) {
  const id = useId();
  const platform = usePlatform();
  const filteredProducts1 = products
    .filter(({price, original_price}, index) =>  1 - Number(price) / Number(original_price) >= discount1 / 100)
    .filter((_, index) => index <= quantity - 1);
  const filteredProducts2 = products
    .filter(({price, original_price}, index) =>  1 - Number(price) / Number(original_price) >= discount2 / 100)
    .filter((_, index) => index <= quantity - 1);
  const filteredProducts3 = products
    .filter(({price, original_price}, index) =>  1 - Number(price) / Number(original_price) >= discount3 / 100)
    .filter((_, index) => index <= quantity - 1);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-9/12 md:w-4/12 h-full container py-8 flex flex-col gap-6 lg:gap-10 lg:py-10 relative lg:absolute md:top-16 md:right-6">
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 rounded-md border-2 border-neon-green border-solid animation-neon-green-border h-64 lg:h-60"
      >
        <h3 class="animation-neon-green-text text-neon-green text-2xl text-center py-4 md:py-2">{ discount1 }%</h3>
        <Slider class="carousel carousel-center sm:carousel-end gap-1 col-span-full row-start-2 row-end-5 h-60">
          {filteredProducts1?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[292px] first:pl-10 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <div class="flex-row text-center h-60 lg:h-48">
                <img class="rounded-md mx-auto w-6/12 md:w-2/6" src={product.thumbnail} />  
                <h2 class="text-sm break-words">{ product.title }</h2>
                <div class="text-sm line-through">R${ product.original_price }</div>
                <div class="text-sm font-semibold">R$ { product.price }</div>
              </div>
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
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 rounded-md border-2 border-neon-blue border-solid animation-neon-blue-border h-64 lg:h-60"
      >
        <h3 class="animation-neon-blue-text text-neon-blue text-2xl text-center py-4 md:py-2">{ discount2 }%</h3>
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {filteredProducts2?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <div class="flex-row text-center h-60 lg:h-48">
                <img class="rounded-md mx-auto w-6/12 md:w-2/6" src={product.thumbnail} />  
                <h2 class="text-sm break-words">{ product.title }</h2>
                <div class="text-sm line-through">R${ product.original_price }</div>
                <div class="text-sm font-semibold">R$ { product.price }</div>
              </div>
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
      <div
        id={id}
        class="ccontainer grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 rounded-md border-2 border-neon-orange border-solid animation-neon-orange-border h-64 lg:h-60"
      >
        <h3 class="animation-neon-orange-text text-neon-orange text-2xl text-center py-4 md:py-2">{ discount3 }%</h3>
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {filteredProducts3?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <div class="flex-row text-center h-60 lg:h-48">
                <img class="rounded-md mx-auto w-6/12 md:w-2/6" src={product.thumbnail} />  
                <h2 class="text-sm break-words">{ product.title }</h2>
                <div class="text-sm line-through">R${ product.original_price }</div>
                <div class="text-sm font-semibold">R$ { product.price }</div>
              </div>
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

export default DiscountShelf;
